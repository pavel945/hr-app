<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployees extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement(
            "CREATE TABLE IF NOT EXISTS `employees` (
                `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
                `fname` VARCHAR(255) NOT NULL,
                `lname` VARCHAR(255) NOT NULL,
                `salary` DECIMAL(10,2) DEFAULT 0,
                `department_id` INT(11) UNSIGNED NOT NULL,
                `created_at` DATETIME NOT NULL DEFAULT current_timestamp(),
                `updated_at` DATETIME NULL DEFAULT NULL,
                PRIMARY KEY (`id`),
                INDEX FK_Departments (department_id),
                FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
            )"
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
