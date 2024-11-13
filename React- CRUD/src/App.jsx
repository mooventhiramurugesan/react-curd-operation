import React, { useState } from 'react';
import './App.css'; 
import { v4 as uuid } from 'uuid';

const App = () => {
  const [users, setUsers] = useState([]);

  const [buttonState, setButtonState] = useState("Submit");

  const [userInfo, setUserInfo] = useState({
    id: uuid(),
    name: "",
    age: "",
    email: "",
    phone: "",
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((currValue) => ({
      ...currValue,
      [name]: value,
    }));
  };


  const addData = () => {
    setUsers((currUsers) => [...currUsers, userInfo]);
    setUserInfo({
      id: uuid(),
      name: "",
      age: "",
      email: "",
      phone: "",
    });
  };


  const deleteData = (id) => {
    setUsers((currUsers) => currUsers.filter((user) => user.id !== id));
  };

  
  const startingEdit = (user) => {
    setUserInfo(user);
    setButtonState("Edit");
  };


  const cancelEditing = () => {
    setUserInfo({
      id: uuid(),
      name: "",
      age: "",
      email: "",
      phone: "",
    });
    setButtonState("Submit");
  };


  const updateData = () => {
    setUsers((currUsers) => {
      return currUsers.map((user) => {
        if (user.id === userInfo.id) {
          return userInfo;
        }
        return user;
      });
    });
    cancelEditing();
  };


  return (
    <>
      <div className="form-container">
        <h1>React CRUD Operation</h1>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            value={userInfo.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            placeholder="Enter your age"
            name="age"
            value={userInfo.age}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input
            type="number"
            placeholder="Enter your phone"
            name="phone"
            value={userInfo.phone}
            onChange={handleChange}
          />
        </div>

        {buttonState === "Submit" ? (
          <button className="submit-button" onClick={addData}>Submit</button>
        ) : (
          <div>
            <button className="submit-button" onClick={updateData}>Update</button>
            <button className="submit-button" onClick={cancelEditing}>Cancel</button>
          </div>
        )}

        <div className="datatable">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button className="edit-button" onClick={() => startingEdit(user)}>Edit</button>
                    <button className="delete-button" onClick={() => deleteData(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default App;
