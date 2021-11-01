import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Table = (props) => {
    const HEROKURL = "https://hello-user-api.herokuapp.com/"
  // console.log('this is the table page')
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
        const token = await props.user.getIdToken();
        const response = await fetch(`${HEROKURL}api/table/all`, {
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

      function myFunction() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[0]
          
          if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }       
        }
      }
      function myFunctionTwo() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput2");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[1]
          
          if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }       
        }
      }
  return (
    <div className="table">
        <br />
        <h1 className="cursive">Hello USER Table</h1>
        <hr />
        <div className="flexsearch">
          <input type="text" id="myInput" onKeyUp={myFunction} placeholder="Search for names.." title="Type in a name" />&nbsp;&nbsp;&nbsp;
          <input type="text" id="myInput2" onKeyUp={myFunctionTwo} placeholder="Search for Profession.." title="Type in a Profession" />
        </div>
        <table id="myTable" className="highlight centered responsive-table">
            <thead>
              <tr>
                  <th><u>NAME</u></th>
                  <th><u>PROFESSION</u></th>
                  <th><u>EMPLOYED</u></th>
                  <th><u>LOCATION</u></th>
                  <th><u>DETAILS</u></th>
              </tr>
            </thead>

          {state.users.map((u) => (
            <tbody key={u.userName}>
              <tr>
                <td>{u.userName}</td>
                <td>{u.jobTitle}</td>
                { u.companyName ?
                <td>{u.companyName}</td>
                :
                <td>Open to Work</td>
                }
                <td>{u.location}</td>
                <td>
                  <Link to={`/table/card/${u._id}`}>
                  <button className="buttonskel">View Card</button>
                  </Link>
                </td>
              </tr>
            </tbody>
            ))}
        </table>
        {/* <table>
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
                    {u.nickName}
                    {u.companyName}
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
      </table> */}
      
    </div>
  )
};

export default Table;