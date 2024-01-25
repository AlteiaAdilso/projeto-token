<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    public function addNewUser(Request $request){
        $usuario = new Usuario();
        
        //monto o usuario com o request
        $usuario->usr_name = $request->input('usr_name');
        $usuario->usr_nickname = $request->input('usr_nickname');
        $usuario->usr_psw = $request->input('usr_psw');

        $existingUser = Usuario::where('usr_nickname', $usuario->usr_nickname)->first();

        if ($existingUser) {
            return response()->json(['status' => 'error', 'message' => 'Usuário já existe.'], 422);
        }

        $usuario->save();
        return response()->json(['status' => 'success', 'message' => 'Usuário adicionado com sucesso.']);
    }

    public function getAllUser($id){
        $usuario = new Usuario();
        error_log($id);
        $todosUsuarios = $usuario::where('usr_key', '!=', $id)->where('usr_key', '>=', 0)->get();

        return response()->json(['status' => 'success', 'body' => $todosUsuarios]);
    }
}
