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
// ww3 schools.com search table feature --------
        function myFunction() {
          var input, filter, search, table, tr, td, i, j;
          input = document.getElementById("myInput");
          filter = input.value.toUpperCase();
          table = document.getElementById("myTable");
          tr = table.getElementsByTagName("tr");
          for (i = 1; i < tr.length; i++) { // search the rows
              td = tr[i].getElementsByTagName("td");
              for (j = 0; j < td.length; j++) { // search the columns 
                  if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                      search = true;
                  }
              }
              if (search) {
                  tr[i].style.display = "";
                  search = false;
              } else {
                  tr[i].style.display = "none";
              }
          }
      }
// -------------------------------

  return (
    <div className="table">
        <br />
        <h1 className="cursive">Hello USER Table</h1>
        <hr />
        {/* <h5>Search Table:</h5> */}
        <input type="text" id="myInput" onKeyUp={myFunction} placeholder="Search The Table" title="Table Search" />

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
    </div>
  )
};

export default Table;