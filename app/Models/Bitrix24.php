<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bitrix24 extends Model
{
    use HasFactory;

    protected $fillable = [
        'bot_id',
        'command_echo',
        'command_help',
        'command_list',
        'language_id',
        'access_token',
        'expires',
        'expires_in',
        'scope',
        'domain',
        'server_endpoint',
        'status',
        'client_endpoint',
        'member_id',
        'user_id',
        'refresh_token',
        'application_token',
    ];
}
