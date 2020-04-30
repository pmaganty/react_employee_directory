import React, { useState } from "react";
import EmployeeCard from "../EmployeeCard"
import employees from "../../employees.json"
import "./style.css";

function EmployeeList() {

    const [employeeArr, setEmployeeArr] = useState(employees);

    const filterEmployees = value => {
        const filteredArr = [];
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].name.last.toLowerCase().startsWith(value.toLowerCase())) {
                filteredArr.push(employees[i]);
            }
        }
        return filteredArr;
    }

    function sortEmployees(value) {
        let sortedArr = employeeArr.slice();
        if (value === "Last Name") {
            sortedArr.sort((a, b) => (a.name.last > b.name.last) ? 1 : -1)
        } else if (value === "First Name") {
            sortedArr.sort((a, b) => (a.name.first > b.name.first) ? 1 : -1);
        } else if (value === "Email") {
            sortedArr.sort((a, b) => (a.email > b.email) ? 1 : -1);
        } else if (value === "Country") {
            sortedArr.sort((a, b) => (a.location.country > b.location.country) ? 1 : -1);
        } else if (value === "State") {
            sortedArr.sort((a, b) => (a.location.state > b.location.state) ? 1 : -1);
        }
        return sortedArr;
    }

    return (
    <div>
        <div>
            <form>
                <label>Search By Last Name:</label>
                <input 
                type="text"
                onChange={e => setEmployeeArr(filterEmployees(e.target.value))}
                />
            </form>
        </div>

        <table id="myTable">
            <thead>
                <tr>
                    <th className="tableTop"></th>
                    <th className="tableTop" onClick={e => setEmployeeArr(sortEmployees(e.currentTarget.textContent))}>First Name</th>
                    <th className="tableTop" onClick={e => setEmployeeArr(sortEmployees(e.currentTarget.textContent))}>Last Name</th>
                    <th className="tableTop" onClick={e => setEmployeeArr(sortEmployees(e.currentTarget.textContent))}>Email</th>
                    <th className="tableTop" onClick={e => setEmployeeArr(sortEmployees(e.currentTarget.textContent))}>Country</th>
                    <th className="tableTop" onClick={e => setEmployeeArr(sortEmployees(e.currentTarget.textContent))}>State</th>
                </tr>
            </thead>
            <tbody>
                {employeeArr.map(employee => (
                    <EmployeeCard
                        picture={employee.picture.large}
                        firstName={employee.name.first}
                        lastName={employee.name.last}
                        email={employee.email}
                        country={employee.location.country}
                        state={employee.location.state}
                        key={employee.name.last + employee.name.first}
                    />
                ))}
            </tbody>
        </table>
    </div>
    );
}

export default EmployeeList;