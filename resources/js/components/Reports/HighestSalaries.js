import React from 'react';
import { Table } from 'react-bootstrap';

const highestSalaries = (props) => {
    return (
        <Table striped bordered hover className="table-sm">
            <thead>
                <tr>
                    <th>Department</th>
                    <th>Highest Salary</th>
                </tr>
            </thead>
            <tbody>
                {props.departments.map((department, index) => (
                    <tr key={index}>
                        <td>{department.name}</td>
                        <td>{department.max_salary}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default highestSalaries;