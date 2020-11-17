<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'api'], function () {
    Route::post('login', 'Api\Auth\AuthController@login');
    Route::post('register', 'Api\Auth\AuthController@register');
    Route::post('logout', 'Api\Auth\AuthController@logout');
    Route::get('checkAuth', 'Api\Auth\AuthController@me');
    
    Route::get('department', 'Api\DepartmentController@index');
    Route::post('department', 'Api\DepartmentController@store');
    Route::get('department/{id}', 'Api\DepartmentController@show');
    Route::delete('department/{id}', 'Api\DepartmentController@destroy');
    Route::post('department/{id}', 'Api\DepartmentController@update');

    Route::get('employee', 'Api\EmployeeController@index');
    Route::post('employee', 'Api\EmployeeController@store');
    Route::get('employee/{id}', 'Api\EmployeeController@show');
    Route::delete('employee/{id}', 'Api\EmployeeController@destroy');
    Route::post('employee/{id}', 'Api\EmployeeController@update');
    
    Route::get('department/report/{type}', 'Api\DepartmentController@report');
});



