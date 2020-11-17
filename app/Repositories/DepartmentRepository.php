<?php

namespace App\Repositories;

use App\Repositories\Interfaces\DepartmentRepositoryInterface;
use Illuminate\Support\Facades\DB;
use App\Department;
use App\Employee;
use App\Exceptions\NotFoundException;

/**
 * DepartmentRepository
 *
 * @author Pavel
 */
class DepartmentRepository implements DepartmentRepositoryInterface{
    
    public function delete($id) 
    {
        DB::delete('DELETE FROM '. Department::TABLE_NAME .' WHERE id = :id', ['id' => $id]);
    }

    public function get($id) 
    {
        $department = DB::select('SELECT * FROM '. Department::TABLE_NAME .' WHERE id = :id', ['id' => $id]);
        
        if(empty($department)){
            throw new NotFoundException();
        }
        
        return $department;
    }

    public function getAll() 
    {
        $departments = DB::select('SELECT * FROM '. Department::TABLE_NAME);
        
        if(empty($departments)){
            throw new NotFoundException();
        }
        
        return $departments;
    }

    public function showWithHighestSalary() 
    {
        $deparments = DB::select(
                        'SELECT d.name,
                            COALESCE(MAX(e.salary), 0) AS max_salary
                            FROM '. Department::TABLE_NAME .' d
                            LEFT JOIN '. Employee::TABLE_NAME .' e ON d.id = e.department_id
                            GROUP BY d.id, d.name');
        
        return $deparments;
    }

    public function showWithMoreThanTwoEmployees() 
    {
        $departments = DB::select(
                        'SELECT d.name,
                            SUM(e.salary > 50000) AS sum
                            FROM '. Department::TABLE_NAME .' d
                            JOIN '. Employee::TABLE_NAME .' e ON d.id = e.department_id
                            GROUP BY d.id, d.name
                            HAVING SUM > 2');
        
        return $departments;
    }

    public function update($id, $data) 
    {
        $department = DB::select('SELECT * FROM '. Department::TABLE_NAME .' WHERE id = :id', ['id' => $id]);
        
        if(empty($department)){
            throw new NotFoundException();
        }
        
        DB::update(
                'UPDATE '. Department::TABLE_NAME .' '
                . 'SET name = ?, info= ?, updated_at = NOW() '
                . 'WHERE id = ?', 
                [$data['name'], $data['info'], $id]
        );
    }

}
