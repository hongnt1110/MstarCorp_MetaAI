<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ZaloOA extends Model
{
    use HasFactory;

    protected $fillable = [
        'domain',
        'app_id',
        'secret_key',
        'oa_secret_key',
        'access_token',
        'refresh_token',
        'expired'
    ];
}
