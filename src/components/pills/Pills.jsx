import React from "react";
import Pill from "./Pill";
import "./style.css";

function Pills(props) {
  console.log("......pillls");
  return (
    <div className="pill-wrapper">
      {props.selectedUsers.map((user) => {
        return (
          <Pill
            key={user.guid}
            user={user}
            onClickSelectedUser={props.onClickSelectedUser}
          ></Pill>
        );
      })}
    </div>
  );
}

export default React.memo(Pills);
