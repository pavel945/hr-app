<?php

namespace App\Factories;

use App\Factories\Interfaces\EmployeeFactoryInterface;
use App\Employee;
use Illuminate\Support\Facades\DB;
/**
 * Description of EmployeeFactory
 *
 * @author Pavel
 */
class EmployeeFactory implements EmployeeFactoryInterface 
{
    public function create($data) 
    {
        DB::insert(
            'INSERT INTO `'. Employee::TABLE_NAME .'`'
            . ' (fname, lname, salary, department_id) '
            . 'values (?, ?, ?, ?)',
            [$data['fname'], $data['lname'], $data['salary'], $data['department_id']]
        );
    }

}
