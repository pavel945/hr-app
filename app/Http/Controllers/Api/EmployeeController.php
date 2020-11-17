<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Factories\Interfaces\EmployeeFactoryInterface;
use App\Repositories\Interfaces\EmployeeRepositoryInterface;
use App\Exceptions\NotFoundException;

class EmployeeController extends Controller
{
    private $employeeFactory;
    private $employeeRepository;
    
    public function __construct
        (
            EmployeeFactoryInterface $employeeFactoryInterface,
            EmployeeRepositoryInterface $employeeRepositoryInterface
        ) 
    {
        $this->middleware('jwt.verify');
        $this->employeeFactory = $employeeFactoryInterface;
        $this->employeeRepository = $employeeRepositoryInterface;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try{
            $employees = $this->employeeRepository->getAll();
            return response()->json($employees, 200);
        }
        catch(NotFoundException $e){
            return response()->json(['error' => ['Not Found']], 404);
        }
        catch(\Exception $e){
            return response()->json(['error' => [$e->getMessage()]], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $requestData = $request->only(['fname', 'lname', 'salary', 'department_id']);
        
        $rules = [
            'fname' => 'required|max:255|regex:/^[a-zA-Z0-9 _.?#!,:-]*$/',
            'lname' => 'required|max:255|regex:/^[a-zA-Z0-9 _.?#!,:-]*$/',
            'salary' => 'required|numeric',
            'department_id' => 'required|numeric',
        ];
        
        $validator = \Validator::make($requestData, $rules);
        
        if($validator->fails()){
            return response()->json($validator->messages(), 400);
        }
        
        try{
            $this->employeeFactory->create($requestData);
            return response()->json(['success'], 200);
        }
        catch(\Exception $e){
            return response()->json(['error' => [$e->getMessage()]], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try{
            $employee = $this->employeeRepository->get($id);
            return response()->json($employee, 200);
        }
        catch(NotFoundException $e){
            return response()->json(['error' => ['Not Found']], 404);
        }
        catch(\Exception $e){
            return response()->json(['error' => [$e->getMessage()]], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $requestData = $request->only(['fname', 'lname', 'salary', 'department_id']);
        
        $rules = [
            'fname' => 'required|max:255|regex:/^[a-zA-Z0-9 _.?#!,:-]*$/',
            'lname' => 'required|max:255|regex:/^[a-zA-Z0-9 _.?#!,:-]*$/',
            'salary' => 'required|numeric',
            'department_id' => 'required|numeric',
        ];
        
        $validator = \Validator::make($requestData, $rules);
        
        if($validator->fails()){
            return response()->json($validator->messages(), 400);
        }
        
        try{
            $this->employeeRepository->update($id, $requestData);
        }
        catch(NotFoundException $e){
            return response()->json(['error' => ['Not Found']], 404);
        }
        catch(\Exception $e){
            return response()->json(['error' => ['Server Error']], 500);
        }
        
        return response()->json(['success'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{
            $this->employeeRepository->delete($id);
            return response()->json(['success'], 200);
        }
        catch (\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
