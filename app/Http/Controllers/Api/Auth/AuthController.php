<?php
namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;
use App\Role;
use App\Factories\Interfaces\UserFactoryInterface;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    private $userFactory;
    
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct(UserFactoryInterface $userFactoryInterface)
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'me']]);
        $this->middleware('jwt.verify', ['only' => 'me']);
        $this->userFactory = $userFactoryInterface;
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()
                ->claims(['csrf-token' => Str::random(32)])
                ->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json([
            'success' => [
                'csrf_token' => auth()->payload()->get('csrf-token'),
                ]])
                ->withCookie(cookie('token', $token, $minute = 30));
    }
    
    public function register(Request $request)
    {
        $requestData = $request->only(['email', 'password', 'confirm_password', 'name', 'lname', 'role_id']);
        
        $rules = [ 
            'email'            => 'required|unique:users|email|max:255',
            'password'         => 'required|min:8|max:255',
            'confirm_password' => 'required|same:password',
            'name'            => 'required|max:255|regex:/^[a-zA-Z0-9 _.-]*$/',
        ];
        
        $validator = \Validator::make($requestData, $rules);
        
        if($validator->fails()){
            return response()->json($validator->messages(), 400);
        }
     
        $this->userFactory->create($requestData);
        
        return $this->login();
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
