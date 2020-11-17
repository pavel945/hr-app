<?php

namespace App\Factories;

use App\Factories\Interfaces\DepartmentFactoryInterface;
use App\Department;
use Illuminate\Support\Facades\DB;

/**
 * Description of DepartmentFactory
 *
 * @author Pavel
 */
class DepartmentFactory implements DepartmentFactoryInterface {

    public function create($data) 
    {
        DB::insert(
                'INSERT INTO `'. Department::TABLE_NAME .'`'
                . ' (name, info) '
                . 'values (?, ?)',
                [$data['name'], $data['info']]
        );
    }

}
