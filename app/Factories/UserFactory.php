<?php

namespace App\Factories;

use App\Factories\Interfaces\UserFactoryInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

/**
 * Description of UserFactory
 *
 * @author Pavel
 */
class UserFactory implements UserFactoryInterface {
    //put your code here
    public function create($data) {
        DB::insert(
            'INSERT INTO `users`'
            . ' (name, email, password) '
            . 'values (?, ?, ?)',
            [$data['name'], $data['email'], Hash::make($data['password'])]
        );
    }

}
