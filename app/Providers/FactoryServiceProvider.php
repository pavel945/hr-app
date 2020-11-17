<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Factories\Interfaces\DepartmentFactoryInterface;
use App\Factories\Interfaces\EmployeeFactoryInterface;
use App\Factories\Interfaces\UserFactoryInterface;
use App\Factories\DepartmentFactory;
use App\Factories\EmployeeFactory;
use App\Factories\UserFactory;


class FactoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(DepartmentFactoryInterface::class, DepartmentFactory::class);
        $this->app->bind(EmployeeFactoryInterface::class, EmployeeFactory::class);
        $this->app->bind(UserFactoryInterface::class, UserFactory::class);
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
