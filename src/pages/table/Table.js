import { useState, useEffect } from "react";

const Table = (props) => {

    const [state, setState] = useState({
        users: [],
        // form 
        newUser: {
        userName: "",
        nickName: "",
        linkedIn: "",
        portfolio: "",
        employed: false,
        companyName: "",
        jobTitle: "",
        hobbies: ""
        }
      });
    
      // we need to make an HTTP request localhost:3001/api/skills
      // once we recieve the data, we will use it to set our component state with skills data
      async function getUsers() {
        const response = await fetch('http://localhost:3001/api/table/');
        const users = await response.json();
        setState((prevState) => ({
          users,
          newUser: prevState.newUser
        }));
      }
    
      useEffect(() => {
        getUsers();
      }, []);

  return (
    <div className="table">
        <br /><br /><br />
        <h1>This is the Table Component</h1>
        <hr />
        <table>
            <thead>
                    <tr>
                        <th>userName</th>
                        <th>nickName</th>
                        <th>companyName:</th>
                    </tr>
            </thead>
        {state.users.map((u) => (
            <tr>
                <td>
                    {u.userName}
                </td>
                
                <td>
                    {u.nickName}
                </td>
                
                <td>
                    {u.companyName}
                </td>
            </tr>
      ))}
      </table>
      
    </div>
  )
};

export default Table;