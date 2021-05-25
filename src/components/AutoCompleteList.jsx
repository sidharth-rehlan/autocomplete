import React from "react";
import AutoCompleteListItem from "./AutoCompleteListItem";

function AutoCompleteList(props) {
  console.log(props.usersHints);
  return (
    <div className="auto-complete-list-wrapper">
      <ul className="list-group auto-complete-list">
        {props.usersHints.map((user) => {
          return (
            <AutoCompleteListItem
              key={user.guid}
              user={user}
              onClickHint={props.onClickHint}
            ></AutoCompleteListItem>
          );
        })}
      </ul>
    </div>
  );
}

export default AutoCompleteList;
