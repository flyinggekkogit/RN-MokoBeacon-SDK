/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import PlusIcon from "@rsuite/icons/Plus";
import Repository from "../../Repository";
import { notify } from "../../components/tg.toast";
import {
  Button,
  CheckPicker,
  DatePicker,
  Modal,
  RadioGroup,
  Uploader,
} from "rsuite";
import moment from "moment";

export const AddPostModal = ({
  channels,
  fetchData,
  open,
  setOpen,
  copiedPost,
  repliedPost,
}) => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(Repository.initialPostData);
  const [backdrop, setBackdrop] = React.useState("static");
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("Create new post");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (copiedPost) {
      setPost({
        ...post,
        text: copiedPost.text,
        file: copiedPost.file,
        date: Date.parse(copiedPost.date),
        channels: copiedPost.channels ?? [],
      });
      setFiles(copiedPost.file ? [copiedPost.file] : []);
      setTitle("Send post again");
    } else {
      setFiles([]);
      setTitle("Create new post");
    }
  }, [copiedPost]);

  useEffect(() => {
    if (repliedPost) {
      setPost({ ...Repository.initialPostData, reply_id: repliedPost.id });
      setFiles([]);
      setTitle("Reply to post #" + repliedPost.id);
    } else {
      setFiles([]);
      setTitle("Create new post");
    }
  }, [repliedPost]);

  const _onSend = async () => {
    try {
      if (post.channels.length === 0) {
        notify("error", "No channel selected");
        return;
      }
      // generate random number id for post by current time
      const id = Date.now();

      await Repository.getInstance().addPost({ ...post, id: "post_" + id });
      notify("success", "Post sent");
      fetchData();
      setPost(Repository.initialPostData);
      handleClose();
    } catch (error) {
      notify("error", "Failed to save post");
    }
  };

  const _onCancel = () => {
    setPost(Repository.initialPostData);
    handleClose();
  };

  return (
    <RadioGroup
      name="radioList"
      inline
      value={backdrop}
      onChange={(value) => setBackdrop(value)}
    >
      <Button className="" onClick={handleOpen}>
        <PlusIcon color="#333" />
      </Button>
      <Modal
        backdrop={backdrop}
        keyboard={false}
        open={open}
        onClose={handleClose}
      >
        <Modal.Header>
          <Modal.Title style={{ fontWeight: "bold", fontSize: "20px" }}>
            {title}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div style={{ width: "100%" }}>
            <div id="accordionExample" style={{ maxHeight: "85vh" }}>
              <div className="form-group mt-3">
                <div className="d-flex flex-row">
                  <div className="d-flex flex-column" style={{ flex: 1 }}>
                    <label>Channels to broadcast</label>
                    <CheckPicker
                      data={channels ?? []}
                      style={{ display: "flex", flex: 1, marginTop: "5px" }}
                      value={post.channels}
                      onChange={(value) => {
                        setPost({ ...post, channels: value });
                      }}
                    />
                  </div>

                  <div
                    className="d-flex flex-column"
                    style={{ flex: 1, marginLeft: "5px" }}
                  >
                    <label>{"Date and time (Moscow time)"}</label>

                    <DatePicker
                      format="yyyy-MM-dd HH:mm"
                      style={{ marginTop: "5px" }}
                      onChange={(value) => {
                        const newDate =
                          moment(value).format("YYYY-MM-DDTHH:mm");
                        setPost({
                          ...post,
                          date: newDate,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group mt-3">
                <label>Text</label>
                <textarea
                  type="text"
                  className="form-control mt-1"
                  placeholder="Enter post..."
                  defaultValue={post.text}
                  onChange={(e) => setPost({ ...post, text: e.target.value })}
                />

                <Uploader
                  fileList={files}
                  autoUpload={false}
                  draggable
                  onRemove={() => {
                    setPost({
                      ...post,
                      file: null,
                    });
                  }}
                  onChange={(files) => {
                    if (files?.length > 0) {
                      setLoading(true);
                      Repository.getInstance().uploadFile(
                        files[files.length - 1].blobFile,
                        ({ error, payload }) => {
                          setLoading(false);
                          if (error) {
                            notify("error", "Cannot upload file");
                          } else {
                            setPost({
                              ...post,
                              file: payload,
                            });
                            setFiles([payload]);
                          }
                        }
                      );
                    }
                  }}
                >
                  <div
                    style={{
                      marginTop: "10px",
                      height: 200,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span>Click or Drag files to this area to upload</span>
                  </div>
                </Uploader>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button loading={loading} onClick={_onSend} appearance="primary">
            Send
          </Button>
          <Button onClick={_onCancel} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </RadioGroup>
  );
};
