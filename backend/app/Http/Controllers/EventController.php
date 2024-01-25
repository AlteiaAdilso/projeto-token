<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function newEvent(Request $request)
    {
        // Obtenha os valores do corpo da requisição
        $eventDesc = $request->input('evt_desc');
        $eventStart = $request->input('evt_start');
        $eventEnd = $request->input('evt_end');
        $eventUser = $request->input('evt_usr');

        // Crie uma nova instância do modelo Event e preencha os campos
        $event = new Event();
        $event->evt_desc = $eventDesc;
        $event->evt_start = $eventStart;
        $event->evt_end = $eventEnd;
        $event->evt_usr = $eventUser;

        //Função para verificar se o periodo do event vai dar conflito com algum ja existente no banco de dads
        // Verificar se há conflitos com eventos existentes
        $conflictingEvents = Event::where('evt_usr', $event->evt_usr)
            ->when($event->evt_start, function ($query) use ($event) {
                $query->where(function ($query) use ($event) {
                    $query->where('evt_end', '>=', $event->evt_start)
                        ->orWhereNull('evt_end');
                });
            })
            ->when($event->evt_end, function ($query) use ($event) {
                $query->where(function ($query) use ($event) {
                    $query->where('evt_start', '<=', $event->evt_end)
                        ->orWhereNull('evt_start');
                });
            })
            ->get();


        // Se houver eventos conflitantes, você pode tomar uma ação, como retornar uma resposta de erro
        if ($conflictingEvents->isNotEmpty()) {
            return response()->json(["status" => "error", "message" => "Houve conflito de horario para seus eventos"]);
        }

        $event->evt_start = $this->convertDataBd($eventStart);
        $event->evt_end = $this->convertDataBd($eventEnd);
        // Se não houver conflitos, salve o novo evento no banco de dados
        $event->save();

        // Retorne uma resposta de sucesso ou faça o que for necessário
        return response()->json(["status" => "success", "message" => "Evento registrado com sucesso!"]);
    }

    public function getEvents($id)
    {
        $event = new Event();
        $event->evt_usr = $id;
        $todosEvento = $event::where('evt_usr', $event->evt_usr)
            ->orderBy('evt_start')
            ->get();
        return response()->json(["status" => "success", "body" => $todosEvento]);
    }

    public function changeEvent(Request $request)
    {
        // Obtenha os valores do corpo da requisição
        $eventId = $request->input('evt_id');
        $eventDesc = $request->input('evt_desc');
        $eventStart = $request->input('evt_start');
        $eventEnd = $request->input('evt_end');
        $eventUser = $request->input('evt_usr');

        // Busque o evento no banco de dados usando o ID
        $event = Event::find($eventId);

        // Se o evento não for encontrado, retorne uma mensagem de erro
        if (!$event) {
            return response()->json(["status" => "error", "message" => "Evento não encontrado"]);
        }

        // Atualize os campos do evento
        $event->evt_desc = $eventDesc;
        $event->evt_start = $eventStart;
        $event->evt_end = $eventEnd;
        $event->evt_usr = $eventUser;
        $event->evt_id = $eventId;


        $conflictingEvents = Event::where('evt_usr', $event->evt_usr)
            ->when($event->evt_start, function ($query) use ($event) {
                $query->where(function ($query) use ($event) {
                    $query->where('evt_end', '>=', $event->evt_start)
                        ->orWhereNull('evt_end');
                });
            })
            ->when($event->evt_end, function ($query) use ($event) {
                $query->where(function ($query) use ($event) {
                    $query->where('evt_start', '<=', $event->evt_end)
                        ->orWhereNull('evt_start');
                });
            })
            ->where('evt_id', '!=', $event->evt_id)
            ->get();

        // Se houver eventos conflitantes, retorne uma mensagem de erro
        if ($conflictingEvents->isNotEmpty()) {
            return response()->json(["status" => "error", "message" => "Houve conflito de horario para seus eventos"]);
        }

        // Salve as alterações no banco de dados
        $event->save();

        // Retorne uma resposta de sucesso ou faça o que for necessário
        return response()->json(["status" => "success", "message" => "Evento alterado com sucesso"]);
    }

    public function delEvent($id)
    {
        // Busque o evento no banco de dados usando o ID
        $event = Event::find($id);
        // Se o evento não for encontrado, retorne uma mensagem de erro
        if (!$event) {
            return response()->json(["status" => "error", "mensagem" => "Evento não encontrado"]);
        }
        // Deleta o evento
        $event->delete();
        // Retorne uma resposta de sucesso ou faça o que for necessário
        return response()->json(["status" => "success", "mensagem" => "Evento excluído com sucesso!"]);
    }


    public function findEventById($id)
    {
        $event = Event::find($id);

        return response()->json(["status" => "success", "body" => $event]);
    }

    public function convertDataBd($dateTime)
    {
        return str_replace("T", " ", $dateTime) . ":00";
    }

}
