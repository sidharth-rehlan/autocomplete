import React from "react";
import User from "./User";

function UsersList(props) {
  console.log("userlist......", props);
  return (
    <table className="table userlist">
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Sex</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {props.selectedUsers.map((user) => {
          return <User key={user.guid} user={user}></User>;
        })}
      </tbody>
    </table>
  );
}

export default UsersList;
