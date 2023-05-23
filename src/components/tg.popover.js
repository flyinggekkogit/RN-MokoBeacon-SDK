import React from "react";
import { Popover, Whisper, Button, Dropdown } from "rsuite";
import FilterIcon from "../assets/images/icons/filter.png";
import Check from "@rsuite/icons/Check";

const TgDropdown = ({ title, isActive, id }) => (
  <Dropdown.Item eventKey={id}>
    <text style={{ marginRight: "10px" }}>{title}</text>
    {isActive && <Check />}
  </Dropdown.Item>
);

const MenuPopover = React.forwardRef(
  ({ currentKey, onSelect, ...rest }, ref) => (
    <Popover ref={ref} {...rest} full>
      <Dropdown.Menu onSelect={onSelect}>
        <TgDropdown title="Newest posts" isActive={currentKey === 1} id={1} />
        <TgDropdown title="Oldest posts" isActive={currentKey === 2} id={2} />
      </Dropdown.Menu>
    </Popover>
  )
);

export const TgPopover = ({ value, onSelect }) => {
  const ref = React.useRef();
  function handleSelectMenu(eventKey, event) {
    onSelect(eventKey === value ? null : eventKey);
    ref.current.close();
  }
  return (
    <Whisper
      placement="bottomEnd"
      controlId="control-id-with-dropdown"
      trigger="click"
      ref={ref}
      speaker={<MenuPopover onSelect={handleSelectMenu} currentKey={value} />}
    >
      <Button>
        <img src={FilterIcon} style={{ height: "12px" }} />
      </Button>
    </Whisper>
  );
};
