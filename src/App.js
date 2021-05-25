import React, { useEffect, useState } from "react";
import AutoCompleteList from "./components/AutoCompleteList";
import Pills from "./components/Pills";
import UsersList from "./components/UsersList";
import "./App.css";
import axios from "axios";

function App() {
  const [usersData, setUsersData] = useState([]);
  const [usersHints, setUsersHint] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const fetchUsersData = async () => {
    const response = await axios.get("http://localhost:3000/data/Users.json");
    if (response.status === 200) {
      return response.data;
    }
  };

  useEffect(async () => {
    const data = await fetchUsersData();
    setUsersData(data);
  }, []);

  const changeHandler = (e) => {
    const enteredText = e.target.value;
    if (enteredText === "") {
      return;
    }
    const hints = usersData.filter((user) => {
      const pattern = new RegExp(enteredText, "i");
      return pattern.test(user.name);
    });

    setUsersHint(hints);
  };

  const hintClickHandler = (e, user) => {
    const users = [...selectedUsers, user];
    setSelectedUsers(users);
  };

  const removeUserHandler = (user) => {
    console.log("remove user..........");
    const newSelectedUsers = selectedUsers.filter(
      (selectedUser) => selectedUser.guid !== user.guid
    );
    setSelectedUsers(newSelectedUsers);
  };

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
        />
      </form>
      {usersHints.length > 0 && (
        <AutoCompleteList
          usersHints={usersHints}
          onClickHint={hintClickHandler}
        ></AutoCompleteList>
      )}
      <Pills
        selectedUsers={selectedUsers}
        onClickSelectedUser={removeUserHandler}
      ></Pills>
      <UsersList selectedUsers={selectedUsers}></UsersList>
    </main>
  );
}

export default App;
