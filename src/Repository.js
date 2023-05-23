import * as AWS from "aws-sdk";
import { notify } from "./components/tg.toast";

const ITEM = "staging";
const REGION = "eu-central-1";

export default class Repository {
  static instance = null;

  static getInstance() {
    if (Repository.instance === null) {
      Repository.instance = new Repository();
    }

    return Repository.instance;
  }

  // eslint-disable-next-line no-useless-constructor
  constructor() {
    this._awsDocClient = null;
    this._awsS3Client = null;
    try {
      this._loadCredentialsFromLocalStorage();
      console.log("Repository initialized from local storage");
    } catch (e) {
      console.log("Failed to initialize Repository from local storage");
      console.log(e);
    }
  }

  static initialData = {
    token: "",
    all_posts: [],
    posts: [],
    channels: [],
  };

  static initialPostData = {
    text: "",
    date: "",
    channels: [],
    file: null,
    reply_id: null,
    submitted: false,
  };

  _table_name = "none";

  _awsDocClient = null;
  _awsS3Client = null;

  isInitialized = () => this._awsDocClient !== null;

  _mapAccessCodeToAwsDocClient = ({ login, password }) =>
    new AWS.DynamoDB.DocumentClient({
      region: REGION,
      secretAccessKey: password,
      accessKeyId: login,
    });

  _mapAccessCodeToAwsS3Client = ({ login, password }) =>
    new AWS.S3({
      region: REGION,
      secretAccessKey: password,
      accessKeyId: login,
    });

  async initialize(login, password) {
    const docClient = this._mapAccessCodeToAwsDocClient({ login, password });

    await docClient.scan({ TableName: login }).promise();

    this._saveCredentialsToLocalStorage({ login, password });

    this._awsDocClient = docClient;
    this._awsS3Client = this._mapAccessCodeToAwsS3Client({ login, password });

    this._table_name = login;

    const data = await this.getData();

    if (!data) {
      await this.putData(Repository.initialData);
    }

    // check keys with initial data
    /*const keys = Object.keys(Repository.initialData);
    const dataKeys = Object.keys(data);
    const missingKeys = keys.filter((key) => !dataKeys.includes(key));
    const missingKeysR = dataKeys.filter((key) => !keys.includes(key));
    if (missingKeys.length > 0 || missingKeysR.length > 0) {
      await this.putData(Repository.initialData);
    }*/

    return true;
  }

  destroy() {
    this._awsDocClient = null;
    this._awsS3Client = null;
    localStorage.removeItem("credentials");
  }

  uploadFile = (file, onComplete) => {
    // upload to s3 in js

    const key =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const params = {
      Bucket: this._table_name.toLowerCase(),
      Key: key,
      Body: file,
    };
    this._awsS3Client.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        onComplete({ error: err });
      } else {
        console.log(data);
        onComplete({ payload: { ...data, name: file.name } });
      }
    });
  };

  _loadCredentialsFromLocalStorage() {
    const credentials = localStorage.getItem("credentials");
    if (credentials) {
      this._table_name = JSON.parse(credentials).login;
      this._awsDocClient = this._mapAccessCodeToAwsDocClient(
        JSON.parse(credentials)
      );
      this._awsS3Client = this._mapAccessCodeToAwsS3Client(
        JSON.parse(credentials)
      );
    }
  }

  _saveCredentialsToLocalStorage(credentials) {
    localStorage.setItem("credentials", JSON.stringify(credentials));
  }

  async putData(data) {
    if (!this._awsDocClient) {
      throw new Error("Access code is not set");
    }

    var params = {
      TableName: this._table_name,
      Item: { id: ITEM, ...data },
    };

    return this._awsDocClient.put(params).promise();
  }

  async addChannel(channel) {
    const existingData = await this.getData();
    const channels = existingData.channels ? [...existingData.channels] : [];
    if (channels.map((item) => item.value).includes(channel.value)) {
      notify("error", "Channel already exists");
      return;
    }
    channels.push(channel);

    await this.putData({ ...existingData, channels });
    return { statusCode: 200 };
  }

  async addPost(post) {
    const existingData = await this.getData();
    const posts = existingData.posts ? [...existingData.posts, post] : [post];
    const all_posts = existingData.all_posts
      ? [...existingData.all_posts, post]
      : [post];

    return this.putData({ ...existingData, posts, all_posts });
  }

  async searchPosts(search) {
    const existingData = await this.getData();
    const posts = existingData.all_posts?.filter((item) =>
      item.text.toLowerCase().includes(search.toLowerCase())
    );
    return posts;
  }

  async sortPosts(sortType) {
    const existingData = await this.getData();
    const posts = existingData.all_posts?.sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!b.date) return sortType === 1 ? 1 : -1;
      if (!a.date) return sortType === 1 ? -1 : 1;

      if (sortType === 1) {
        return new Date(b.date) - new Date(a.date);
      } else if (sortType === 2) {
        return new Date(a.date) - new Date(b.date);
      } else return 0;
    });
    return posts;
  }

  async updateData(data) {
    const existingData = await this.getData();

    return this.putData({ ...existingData, ...data });
  }

  async updateToken(token) {
    const existingData = await this.getData();

    await this.putData({ ...existingData, token });
    return { statusCode: 200 };
  }

  async getData() {
    if (!this._awsDocClient) {
      throw new Error("Access code is not set");
    }

    var params = {
      TableName: this._table_name,
      Key: {
        id: ITEM,
      },
    };

    const data = await this._awsDocClient.get(params).promise();

    return data.Item;
  }
}
