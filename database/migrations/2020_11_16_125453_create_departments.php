<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDepartments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement(
            "CREATE TABLE IF NOT EXISTS `departments` (
                `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
                `name` VARCHAR(255) NOT NULL,
                `info` TEXT(65535) DEFAULT NULL,
                `created_at` DATETIME NOT NULL DEFAULT current_timestamp(),
                `updated_at` DATETIME NULL DEFAULT NULL,
            PRIMARY KEY (`id`))"
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
