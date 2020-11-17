import React from 'react';
import { Table } from 'react-bootstrap';

const moreThanTwoEmployees = (props) => {
    return (
        <Table striped bordered hover className="table-sm">
            <thead>
                <tr>
                    <th>Department</th>
                    <th>{'Employees with > 50k'}</th>
                </tr>
            </thead>
            <tbody>
                {props.departments.map((department, index) => (
                    <tr key={index}>
                        <td>{department.name}</td>
                        <td>{department.sum}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default moreThanTwoEmployees;