import React, { useState } from "react";

export default function UserList() {
  const [actionType, setActionType] = useState({
    type: "add",
    id: 0,
  });
  const [userList, setUserList] = useState({});
  const [currentUser, setCurrentUser] = useState({
    firstName: "",
    lastName: "",
  });

  const onSubmit = (e) => {
    const formData = new FormData(e.target);

    if (formData.get("firstName") && formData.get("lastName")) {
      let id = Date.now();
      if (actionType.type === "edit") {
        id = actionType.id;
      }
      setUserList({
        ...userList,
        [id]: {
          id,
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
        },
      });
      if (actionType.type === "edit") {
        setActionType({
          type: "add",
          id: 0,
        });
      }
      setCurrentUser({
        firstName: '',
        lastName: '',
      });
    }
    e.preventDefault();
  };

  const onEdit = (id) => {
    setCurrentUser({
      firstName: userList[id].firstName,
      lastName: userList[id].lastName,
    });
    setActionType({
      type: "edit",
      id,
    });
  };

  const onDelete = (id) => {
    // remove item form list
    delete userList[id];
    setUserList({
      ...userList,
    });
  };

  return (
    <div>
      <div>
        <form onSubmit={onSubmit}>
          <span>
            <input
              name="firstName"
              value={currentUser.firstName}
              onChange={(e) =>
                setCurrentUser({
                  ...currentUser,
                  firstName: e.target.value,
                })
              }
            />
          </span>
          <span>
            <input
              name="lastName"
              value={currentUser.lastName}
              onChange={(e) =>
                setCurrentUser({
                  ...currentUser,
                  lastName: e.target.value,
                })
              }
            />
          </span>
          {actionType.type === "add" ? (
            <button type="submit">Add</button>
          ) : (
            <button type="submit">Edit</button>
          )}
        </form>
      </div>
      <div>
        {Object.keys(userList).map((index) => (
          <div>
            <span>
              <input value={userList[index].firstName} />
            </span>
            <span>
              <input value={userList[index].lastName} />
            </span>
            <span>
              <button onClick={() => onEdit(userList[index].id)}>Edit</button>
              <button onClick={() => onDelete(userList[index].id)}>
                Delete
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
