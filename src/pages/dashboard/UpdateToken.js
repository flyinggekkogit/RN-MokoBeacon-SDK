/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Repository from "../../Repository";
import { notify } from "../../components/tg.toast";
import { Button, Modal, RadioGroup } from "rsuite";

export const UpdateTokenModal = ({ fetchData, open, setOpen, lastToken }) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (open) {
      setToken(lastToken);
    }
  }, [open]);

  const [backdrop, setBackdrop] = React.useState("static");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const _onSave = async () => {
    try {
      const res = await Repository.getInstance().updateToken(token);
      if (res?.statusCode === 200) {
        notify("success", "Token updated");
        fetchData();
        setToken("");
        handleClose();
      }
    } catch (error) {
      notify("error", "Updating token failed");
    }
  };

  const _onCancel = () => {
    setToken("");
    handleClose();
  };

  return (
    <RadioGroup
      name="radioList"
      style={{
        marginLeft: "0px",
      }}
      inline
      value={backdrop}
      onChange={(value) => setBackdrop(value)}
    >
      <Button onClick={handleOpen}> Update token</Button>
      <Modal
        backdrop={backdrop}
        keyboard={false}
        style={{ width: "100%" }}
        open={open}
        onClose={handleClose}
      >
        <Modal.Header>
          <Modal.Title style={{ fontWeight: "bold", fontSize: "20px" }}>
            Update token
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="form-group mt-3">
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter new token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
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
