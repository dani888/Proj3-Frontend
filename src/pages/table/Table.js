import { useState, useEffect } from "react";

const Table = (props) => {
  console.log('this is the table page')
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
      console.log('part 2')
      // we need to make an HTTP request localhost:3001/api/skills
      // once we recieve the data, we will use it to set our component state with skills data
      async function getUsers() {
        console.log('part 3')
        const token = await props.user.getIdToken();
        const response = await fetch('http://localhost:3001/api/table/all', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
        // console.log('part4')
        console.log('response is : ',response)
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
          <tbody key={u.userName}>
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
          </tbody>
      ))}
      </table>
      
    </div>
  )
};

export default Table;