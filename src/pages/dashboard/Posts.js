import React, { useEffect, useState } from "react";
// STARTS HERE
import "react-toastify/dist/ReactToastify.css";
import Repository from "../../Repository";
import { notify } from "../../components/tg.toast";
import { AddPostModal } from "./AddPost";
import { Button, Input, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import CopyIcon from "../../assets/images/icons/copy.png";
import ReplyIcon from "../../assets/images/icons/reply.png";
import AttachmentIcon from "../../assets/images/icons/attachment.png";
import { TgPopover } from "../../components/tg.popover";

import moment from "moment";
import { ReplyText } from "../../components/reply_text";
export const Posts = ({ data, fetchData, channels }) => {
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [sort, setSort] = useState(-1);
  const [copiedPost, setCopiedPost] = useState(null);
  const [repliedPost, setRepliedPost] = useState(null);
  const [openPostModal, setOpenPostModal] = useState(false);
  const [relevantChannels, setRelevantChannels] = useState([]);

  useEffect(() => {
    setFilteredPosts(data);
  }, [data]);

  useEffect(() => {
    if (openPostModal === false) {
      setCopiedPost(null);
      setRepliedPost(null);
    }
  }, [openPostModal]);

  useEffect(() => {
    if (repliedPost?.channels?.length > 0) {
      let newChannels = [];
      repliedPost.channels.forEach((item) => {
        const foundItem = channels.find((channel) => channel.value === item);
        newChannels.push(foundItem);
      });

      setRelevantChannels(newChannels);
      return;
    }
    setRelevantChannels(channels ?? []);
  }, [repliedPost, channels]);

  const getReplyPostText = (postId) => {
    const post = data.find((item) => item.id === postId);
    return post?.text;
  };

  return (
    <div>
      <div
        className="d-flex flex-row my-3 mt-4 align-items-center"
        style={{ width: "100%", justifyContent: "space-between" }}
      >
        <div
          className="d-flex flex-row"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <label style={{ marginRight: "20px" }}>Posts</label>
          <AddPostModal
            fetchData={fetchData}
            channels={relevantChannels}
            open={openPostModal}
            setOpen={setOpenPostModal}
            copiedPost={copiedPost}
            repliedPost={repliedPost}
          />
        </div>

        <div className="d-flex flex-row justify-content-center align-items-center">
          <InputGroup inside style={{ width: "100%", marginRight: "5px" }}>
            <Input
              placeholder={"Search post..."}
              value={search}
              onChange={async (value) => {
                try {
                  setSearch(value);
                  const posts = await Repository.getInstance().searchPosts(
                    value
                  );
                  setFilteredPosts(posts);
                } catch (error) {
                  notify("error", "Can't search post");
                }
              }}
            />
            <InputGroup.Button>
              <SearchIcon />
            </InputGroup.Button>
          </InputGroup>
          <TgPopover
            value={sort}
            onSelect={async (value) => {
              try {
                setSort(value);
                const posts = await Repository.getInstance().sortPosts(value);
                setFilteredPosts(posts);
              } catch (error) {
                notify("error", "Can't sort posts");
              }
            }}
          />
        </div>
      </div>

      <div>
        {filteredPosts?.map((post, index) => (
          <div
            className="mb-2"
            style={{
              display: "flex",
              backgroundColor: "#f7f7f9",
              borderRadius: " 10px",
              width: "100%",
              padding: "10px",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            {post?.reply_id && (
              <ReplyText text={getReplyPostText(post?.reply_id)} />
            )}

            <div
              className="d-flex flex-row"
              style={{
                flex: 1,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "75%",
                }}
              >
                <text>{post?.text ?? ""}</text>
              </div>
              <div>
                <Button
                  onClick={() => {
                    setCopiedPost(post);
                    setRepliedPost(null);
                    setOpenPostModal(true);
                  }}
                >
                  <img
                    src={CopyIcon}
                    alt="copy"
                    style={{
                      height: "20px",
                    }}
                  />
                </Button>
                <Button
                  onClick={() => {
                    setRepliedPost(post);
                    setCopiedPost(null);
                    setOpenPostModal(true);
                  }}
                >
                  <img
                    src={ReplyIcon}
                    alt="reply"
                    style={{
                      height: "20px",
                    }}
                  />
                </Button>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                width: "100%",
                height: "25px",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                // backgroundColor: "red",
              }}
            >
              {post?.file?.name ? (
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <img
                    src={AttachmentIcon}
                    style={{
                      height: "12px",
                      width: "12px",
                      marginRight: "3px",
                    }}
                  />
                  <text
                    style={{
                      fontSize: "12px",
                      textAlign: "left",
                      whiteSpace: "nowrap",
                      color: "gray",
                      overflow: "hidden",
                    }}
                  >
                    {post.file.name}
                  </text>
                </div>
              ) : (
                <div></div>
              )}

              {post.date && (
                <text
                  style={{
                    fontSize: "12px",
                    paddingRight: "10px",
                    whiteSpace: "nowrap",
                    color: "gray",
                  }}
                >
                  {moment(post.date).format("D MMM Y, HH:mm")}
                </text>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
