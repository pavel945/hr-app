<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Factories\Interfaces\DepartmentFactoryInterface;
use App\Repositories\Interfaces\DepartmentRepositoryInterface;
use App\Exceptions\NotFoundException;

class DepartmentController extends Controller
{
    private $departmentFactory;
    private $departmentRepository;
    
    public function __construct
        (
            DepartmentFactoryInterface $departmentFactoryInterface,
            DepartmentRepositoryInterface $departmentRepositoryInterface
        ) 
    {
        $this->middleware('jwt.verify');
        $this->departmentFactory = $departmentFactoryInterface;
        $this->departmentRepository = $departmentRepositoryInterface;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try{
            $departments = $this->departmentRepository->getAll();
            return response()->json($departments, 200);
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
        $requestData = $request->only(['name', 'info']);
        
        $rules = [
            'name' => 'required|max:255|regex:/^[a-zA-Z0-9 _.?#!,:-]*$/',
            'info' => 'nullable|max:255|regex:/^[a-zA-Z0-9 _.?#!,:-]*$/',
        ];
        
        $validator = \Validator::make($requestData, $rules);
        
        if($validator->fails()){
            return response()->json($validator->messages(), 400);
        }
        
        try{
            $this->departmentFactory->create($requestData);
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
            $department = $this->departmentRepository->get($id);
            return response()->json($department, 200);
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
        $requestData = $request->only(['name', 'info']);
        
        $rules = [
            'name' => 'required|max:255|regex:/^[a-zA-Z0-9 _.?#!,:-]*$/',
            'info' => 'nullable|max:255|regex:/^[a-zA-Z0-9 _.?#!,:-]*$/',
        ];
        
        $validator = \Validator::make($requestData, $rules);
        
        if($validator->fails()){
            return response()->json($validator->messages(), 400);
        }
        
        try{
            $this->departmentRepository->update($id, $requestData);
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
            $this->departmentRepository->delete($id);
            return response()->json(['success'], 200);
        }
        catch (\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    
    public function report($type)
    {
        try{
            switch($type){
                case 1:
                    $departments = $this->departmentRepository->showWithHighestSalary();
                    break;
                case 2:
                    $departments = $this->departmentRepository->showWithMoreThanTwoEmployees();
                    break;
                default :
                    $departments = [];
            }
            
            return response()->json($departments, 200);
        }
        catch(NotFoundException $e){
            return response()->json(['error' => ['Not Found']], 404);
        }
        catch(\Exception $e){
            return response()->json(['error' => [$e->getMessage()]], 500);
        }
    }
}
