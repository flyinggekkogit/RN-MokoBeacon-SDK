export const ReplyText = ({ text }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: "10px",
        maxWidth: "100%",
        minHeight: "30px",
        paddingRight: "5px",
        paddingLeft: "2px",
      }}
    >
      <div
        style={{
          width: "4px",
          minWidth: "4px",
          height: "18px",
          borderRadius: "2px",
          marginRight: "5px",
          marginLeft: "5px",
          backgroundColor: "#f4af",
        }}
      />
      <text
        style={{
          fontSize: "12px",
          textAlign: "left",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        {text}
      </text>
    </div>
  );
};
