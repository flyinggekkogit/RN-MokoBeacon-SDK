/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Repository from "../../Repository";
import { notify, TgToast } from "../../components/tg.toast";
import { AddChannelModal } from "./AddChannel";
import { Posts } from "./Posts";
import { UpdateTokenModal } from "./UpdateToken";

function parseAndCompareTwoDates(date1, date2) {
  if (!date1 && !date2) return 0;
  if (!date1) return -1;
  if (!date2) return 1;

  const d1 = new Date(Date.parse(date1));
  const d2 = new Date(Date.parse(date2));
  if (d1 > d2) return 1;
  if (d1 < d2) return -1;
  return 0;
}

export default function (props) {
  const [data, setData] = useState(Repository.initialData);
  const [openChannelModal, setOpenChannelModal] = useState(false);
  const [openTokenModal, setOpenTokenModal] = useState(false);

  const navigate = useNavigate();

  const fetchData = () => {
    Repository.getInstance()
      .getData()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        notify("error", "Can't get data from server");
      });
  };

  useEffect(() => {
    if (!Repository.getInstance().isInitialized()) {
      navigate("/auth");
    } else {
      fetchData();
    }
  }, []);

  return (
    <div className="Dashboard-form-container">
      <TgToast />
      <div className="Dashboard-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Dashboard</h3>
          <div className="d-grid gap-2 mt-3">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                localStorage.removeItem("key");
                Repository.getInstance().destroy();
                navigate("/auth");
                // Repository.getInstance().updateData({
                //   ...data,
                //   posts: [],
                //   all_posts: [],
                // });
              }}
            >
              Logout
            </button>
          </div>
          <div className="d-flex flex-row my-2">
            <div style={{ marginRight: "8px" }}>
              <UpdateTokenModal
                fetchData={fetchData}
                lastToken={data?.token ?? ""}
                open={openTokenModal}
                setOpen={setOpenTokenModal}
              />
            </div>
            <div>
              <AddChannelModal
                fetchData={fetchData}
                open={openChannelModal}
                setOpen={setOpenChannelModal}
              />
            </div>
          </div>

          <Posts
            data={data.all_posts}
            channels={data.channels}
            fetchData={fetchData}
          />
        </div>
      </div>
    </div>
  );
}
