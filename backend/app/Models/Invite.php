<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invite extends Model
{
    use HasFactory;
    public $table = 'convite_para_eventos';
    public $timestamps = false;
    public $primaryKey = 'id';
}
