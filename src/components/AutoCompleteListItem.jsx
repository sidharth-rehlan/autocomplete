import React from "react";

function AutoCompleteListItem(props) {
  return (
    <li
      className="list-group-item"
      onClick={(e) => props.onClickHint(e, props.user)}
    >
      {props.user.name}
    </li>
  );
}

export default AutoCompleteListItem;
