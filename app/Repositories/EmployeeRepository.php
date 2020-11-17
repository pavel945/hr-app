<?php

namespace App\Repositories;

use App\Repositories\Interfaces\EmployeeRepositoryInterface;
use Illuminate\Support\Facades\DB;
use App\Employee;
use App\Department;
use App\Exceptions\NotFoundException;

/**
 * Description of EmployeeRepository
 *
 * @author Pavel
 */
class EmployeeRepository implements EmployeeRepositoryInterface
{
    public function delete($id) 
    {
        DB::delete('DELETE FROM '. Employee::TABLE_NAME .' WHERE id = :id', ['id' => $id]);
    }

    public function get($id) 
    {
        $employee = DB::select('SELECT * FROM '. Employee::TABLE_NAME .' WHERE id = :id', ['id' => $id]);
        
        if(empty($employee)){
            throw new NotFoundException();
        }
        
        return $employee;
    }

    public function getAll() 
    {
        $employees = DB::select(
                        'SELECT e.id, e.fname, e.lname, e.salary, d.name as department_name
                            FROM `'. Employee::TABLE_NAME.'` e JOIN '. Department::TABLE_NAME .' d ON e.department_id = d.id');
        
        if(empty($employees)){
            throw new NotFoundException();
        }
        
        return $employees;
    }

    public function update($id, $data) 
    {
        $employee = DB::select('SELECT * FROM '. Employee::TABLE_NAME .' WHERE id = :id', ['id' => $id]);
        
        if(empty($employee)){
            throw new NotFoundException();
        }
        
        DB::update(
                'UPDATE '. Employee::TABLE_NAME .' '
                . 'SET fname = ?, lname= ?, salary= ?, department_id= ?, updated_at = NOW() '
                . 'WHERE id = ?', 
                [$data['fname'], $data['lname'], $data['salary'], $data['department_id'], $id]
        );    
    }

}
