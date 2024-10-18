import React, { useEffect, useState } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
function Employees() {
    const [employees, setEmployees] = useState([]);
    const [update, setUpdate] = useState(false)
    let [msg, setMsg] = useState("")
    let [empToBeUpdated, setEmpToBeUpdated] = useState({ id: 0, name: "", designation: "" })
    useEffect(() => {
        axios.get("http://localhost:4000/employees")
            .then((response) => { setEmployees(response.data) })
            .catch((error) => { console.log(error) })
    }, [])
    const findEmployee = (id) => {
        let emp = employees.find(
            function (el) {
                return el.id == id
            }
        )
        console.log(emp)
        setEmpToBeUpdated(emp)
    }
    const updateEmpl = (e) => {
        e.preventDefault()
        axios.put("http://localhost:4000/employees/" + empToBeUpdated.id, empToBeUpdated).
        then( (response) => {
                let index = employees.findIndex((employee) => employee.id == empToBeUpdated.id)
                let temp = [...employees];
                temp[index] = response.data
                setEmployees(temp)
                setMsg("Employee updated successfully! ")
            }
        ).catch(() => {
                setMsg("Something went wrong!")
            }
        )
    }
    return (
        <>
            {(employees.length != 0) && (<table  style={{ width: "60%" }} className="table table-bordered">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Name</th>
                        <th>Designation</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (employees).map((employee) => {
                            return (
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.designation}</td>
                                </tr>
                            )
                        }
                        )
                    }
                </tbody>
            </table>)}
           <p> <button onClick={() => { setUpdate(true) }}>Update Employee</button></p>
 
            {
                update ?
                    <form>
                        <p>Employee ID<br/> 
                       <select onChange={(e) => { findEmployee(e.target.value) }}>
                            <option value="">Select</option>
                            {
                                employees.map(
                                    (employee) => {
                                        return <option key={employee.id} value={employee.id} >{employee.id}</option>
                                    }
                                )
                            }
                        </select> </p>
                     
                        <p>Name <br/>
                        <input value={empToBeUpdated.name} onChange={(e) => { setEmpToBeUpdated({ ...empToBeUpdated, name: e.target.value }) }} /></p>
                        <p>Designation<br/>
                         <input value={empToBeUpdated.designation} onChange={(e) => { setEmpToBeUpdated({ ...empToBeUpdated, designation: e.target.value }) }} /></p>
                       <p> <button onClick={(e) => { updateEmpl(e) }}>Update</button></p>
                    </form>
                    : null
            }
            <p>{msg}</p>
        </>
    );
}
export default Employees;
