/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Repository from "../../Repository";
import { notify } from "../../components/tg.toast";
import { Button, Modal, RadioGroup } from "rsuite";

// const [options, setOptions] = useState([
//   { value: "-1001833170066", label: "@mybetsdot1" },
//   { value: "-1001522405529", label: "@mybetsdot2" }
// ]);

export const AddChannelModal = ({ fetchData, open, setOpen }) => {
  const popupRef = useRef();
  const [channelName, setChannelName] = useState("");
  const [channelId, setChannelId] = useState("");

  const [backdrop, setBackdrop] = React.useState("static");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const _onSave = async () => {
    try {
      const res = await Repository.getInstance().addChannel({
        value: channelId,
        label: channelName,
      });
      if (res?.statusCode === 200) {
        notify("success", "Channel added");
        fetchData();
        setChannelId("");
        setChannelName("");
        handleClose();
      }
    } catch (error) {
      notify("error", "Adding channel failed");
    }
  };

  const _onCancel = () => {
    setChannelId("");
    setChannelName("");
    handleClose();
  };

  return (
    <RadioGroup
      name="radioList"
      style={{ marginLeft: "0px" }}
      inline
      value={backdrop}
      onChange={(value) => setBackdrop(value)}
    >
      <Button onClick={handleOpen}> Add new channel</Button>
      <Modal
        backdrop={backdrop}
        keyboard={false}
        style={{ width: "400px" }}
        open={open}
        onClose={handleClose}
      >
        <Modal.Header>
          <Modal.Title style={{ fontWeight: "bold", fontSize: "20px" }}>
            Add new channel
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="form-group mt-3">
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Channel name"
                defaultValue={channelName}
                onChange={(e) => setChannelName(e.target.value)}
              />
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Channel ID"
                defaultValue={channelId}
                onChange={(e) => setChannelId(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={_onSave} appearance="primary">
            Save
          </Button>
          <Button onClick={_onCancel} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </RadioGroup>
  );
};
