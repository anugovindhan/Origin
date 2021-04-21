import {Button, Table} from "react-bootstrap";
import {useEffect, useState} from "react";


export  function UserList() {
    const [user,setUser] = useState([]);
    useEffect(() => {
        fetchItems();
    });
    const fetchItems = async () => {
        const data = await fetch('http://localhost:8090/users');
        const items = await data.json();
        setUser(items);
    }
    return (
        <div>
            <h2>Users Data...</h2>
            <Table className="table table-sm offset: 8, span: 16" size="sm">
                <thead>
                <tr>
                    <th>UserId</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>

                </tr>
                </thead>
                <tbody>
                {user.map((emp: any) => (
                    <tr key={emp.userId}>
                        <td>{emp.userId}</td>
                        <td>{emp.firstName}</td>
                        <td>{emp.lastName}</td>
                        <td>{emp.email}</td>

                    </tr>
                ))},
                </tbody>
            </Table>

        </div>
    );
}
export default UserList