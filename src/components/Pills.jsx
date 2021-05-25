import React from "react";
import Pill from "./Pill";

function Pills(props) {
  console.log(props);
  return (
    <div>
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

export default Pills;
