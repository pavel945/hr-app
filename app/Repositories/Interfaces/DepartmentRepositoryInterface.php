<?php

namespace App\Repositories\Interfaces;

/**
 *
 * @author Pavel
 */
interface DepartmentRepositoryInterface 
{
    public function getAll();
    public function get($id);
    public function update($id, $data);
    public function delete($id);
    
    public function showWithHighestSalary();
    public function showWithMoreThanTwoEmployees();
}
