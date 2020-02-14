import React, {useState, useEffect} from "react";
import axios from "axios";

const Users = () => {
    const [users, setUsers] = useState([]);
    console.log(users)

    useEffect(()=>{
        axios.get(`http://localhost:5005/api/users`)
        .then(res => {
            setUsers(res.data)
        })
        .catch(err => {
            console.log("err")
        })
    },[])

    return (
        <div>
            {users.length === 0 && (<p>No users exists!!!</p>)}
            {users.map(user => (
                <div key={user.id} style={{border: "solid black 1px", margin: "5%"}}>
                    <p>Id: {user.id}</p>
                    <p>Name: {user.name}</p>
                </div>
            ))}
        </div>
    )
}

export default Users;