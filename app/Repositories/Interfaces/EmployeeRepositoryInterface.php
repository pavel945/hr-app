<?php

namespace App\Repositories\Interfaces;

/**
 *
 * @author Pavel
 */
interface EmployeeRepositoryInterface 
{
    public function getAll();
    public function get($id);
    public function update($id, $data);
    public function delete($id);
}
