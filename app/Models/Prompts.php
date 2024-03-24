<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prompts extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'categories', 'models', 'prompt', 'description', 'status', 'placeholder'
    ];
}
