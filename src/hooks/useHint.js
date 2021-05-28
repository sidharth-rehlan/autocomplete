import React, { useState } from "react";

const useHint = () => {
  const [usersHints, setUsersHint] = useState([]);

  const createHintList = (enteredText, usersData, selectedUsers) => {
    if (enteredText.trim() === "") {
      setUsersHint([]);
    } else {
      const hints = usersData.filter((user) => {
        const pattern = new RegExp(enteredText, "i");
        if (pattern.test(user.name)) {
          //do not add user in hint list if user already exist in selected user list
          const alreadySelectedUser = selectedUsers.find((selectedUser) => {
            return selectedUser.guid === user.guid;
          });
          return !alreadySelectedUser;
        }
      });
      setUsersHint(hints);
    }
  };

  return [usersHints, createHintList];
};

export default useHint;
