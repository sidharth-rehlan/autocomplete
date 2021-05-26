import React from "react";

function User(props) {
  const { user } = props;
  return (
    <tr>
      <td>
        <img src={user.picture} alt="" />
      </td>
      <td>{user.name}</td>
      <td>{user.gender}</td>
      <td>{user.email}</td>
    </tr>
  );
}

export default User;
