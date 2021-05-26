import React, { useEffect, useState, useRef, useCallback } from "react";
import AutoCompleteList from "./components/autoCompleteField";
import Pills from "./components/pills";
import UsersList from "./components/userList";
import config from "./config";
import "./App.css";
import axios from "axios";

function App() {
  const [usersData, setUsersData] = useState([]);
  const [usersHints, setUsersHint] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [hintsDispay, setHintsDisplay] = useState(true);
  const inputRef = useRef();

  const fetchUsersData = async () => {
    const response = await axios.get(
      `${config.baseUrl}/${config.userDataPath}`
    );
    if (response.status === 200) {
      return response.data;
    }
  };

  useEffect(async () => {
    const data = await fetchUsersData();
    setUsersData(data);
  }, []);

  /**
   * Change event handler to handle any change in search field
   * @param {*} e
   */
  const changeHandler = (e) => {
    const enteredText = e.target.value;
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

      setHintsDisplay(true);
      setUsersHint(hints);
    }
  };

  /**
   * Click handler triggered by selecting user from auto complete hints
   * @param {*} user
   */
  const hintClickHandler = (user) => {
    const users = [...selectedUsers, user];
    setSelectedUsers(users);
    setHintsDisplay(false);
    inputRef.current.value = "";
  };

  /**
   * Remove User from selected users on click of pill cross icon
   */
  const removeFromListHandler = useCallback(
    (user) => {
      const newSelectedUsers = selectedUsers.filter(
        (selectedUser) => selectedUser.guid !== user.guid
      );
      setSelectedUsers(newSelectedUsers);
    },
    [selectedUsers]
  );

  return (
    <main>
      <form className="form-inline">
        <input
          className="form-control"
          type="text"
          name=""
          placeholder="Search Users"
          id=""
          onChange={changeHandler}
          ref={inputRef}
        />
      </form>
      {usersHints.length > 0 && hintsDispay && (
        <AutoCompleteList
          usersHints={usersHints}
          onClickHint={hintClickHandler}
        ></AutoCompleteList>
      )}
      {selectedUsers.length > 0 && (
        <Pills
          selectedUsers={selectedUsers}
          onClickSelectedUser={removeFromListHandler}
        ></Pills>
      )}
      {selectedUsers.length > 0 && (
        <UsersList selectedUsers={selectedUsers}></UsersList>
      )}
    </main>
  );
}

export default App;
