import React from "react";

function Pill(props) {
  return (
    <>
      <div className="pill badge badge-pill badge-primary m-2">
        <span>{props.user.name}</span>
        <span
          className="pill-close"
          onClick={() => props.onClickSelectedUser(props.user)}
        >
          X
        </span>
      </div>
    </>
  );
}

export default Pill;
