<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MstarBot extends Model
{
    use HasFactory;

    protected $fillable = [
        'dialog_id',
        'conversation_id',
        'token_bot',
        'url'
    ];
}
