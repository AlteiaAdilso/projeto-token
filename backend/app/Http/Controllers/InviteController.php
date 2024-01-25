<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Invite;
use Illuminate\Http\Request;

class InviteController extends Controller
{
    public function sendInvite(Request $request){
        $usuarioId = $request->input('evt_usr');
        $eventoId = $request->input('evt_id');
        $convidadoId = $request->input('invite_user_id');

        $invite = new Invite();
        $invite->id_usuario_evento = $usuarioId;
        $invite->id_evento = $eventoId;
        $invite->id_convidado = $convidadoId;

        $invite->save();

        return response()->json(["status" => "success", "message" => "Convite enviado com sucesso"]);
    }

    public function getInvites($id){

        $convites = Invite::where('id_convidado', $id)
        ->whereNull('resposta')
        ->join('eventos', 'convite_para_eventos.id_evento', '=', 'eventos.evt_id')
        ->get();
    
        return response()->json(['status' => 'success', 'body' => $convites]);
    }

    public function rejectInvite(Request $request){
        $invite = Invite::findOrFail($request->input("id"));
        $invite->resposta = 0;
        $invite->save();
        return response()->json(["status" => "success", "message" => "Evento Rejeitado com sucesso"]);
    }

    public function acceptInvite(Request $request){
        $invite = Invite::findOrFail($request->input("id"));
        $invite->resposta = 1;
        $invite->save();
        return response()->json(["status" => "success", "message" => "Evento Confirmado com sucesso"]);
    }

    public function aceptedEvents($id){
        $eventos = Invite::join('eventos', 'id_evento', '=', 'evt_id') // Substitua 'id' pela chave primária correta
            ->where('id_convidado', $id)
            ->where('resposta', '=', 1)
            ->select('*')
            ->get();

        return response()->json(["status" => "success", "body" => $eventos]);
    }
}
