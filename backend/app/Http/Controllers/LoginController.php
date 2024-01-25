<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Login;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function login(Request $request){
        $login = new Login();
        $login->usr_nickname =  $request->input('usr_nickname');
        $login->usr_psw =  $request->input('usr_psw');

        $loginVerify = Login::where([
            'usr_nickname' => $login->usr_nickname, 
            'usr_psw' => $login->usr_psw
            ])->first();

        if($loginVerify){
            return response()->json(['status' => 'success', 'message' => 'Login realizado com sucesso', 'id'=>$loginVerify->usr_key]);
        }

        return response()->json(['status' => 'error', 'message' => 'Usuário ou senha inválidos.'], 422);
    }
}
