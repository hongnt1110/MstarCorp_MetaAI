<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bitrix24s', function (Blueprint $table) {
            $table->id();
            $table->integer('bot_id');
            $table->integer('command_echo')->nullable();
            $table->integer('command_help')->nullable();
            $table->integer('command_list')->nullable();
            $table->string('language_id');
            $table->string('access_token');
            $table->bigInteger('expires');
            $table->integer('expires_in');
            $table->string('scope');
            $table->string('domain');
            $table->string('server_endpoint');
            $table->string('status');
            $table->string('client_endpoint');
            $table->string('member_id');
            $table->integer('user_id');
            $table->string('refresh_token');
            $table->string('application_token');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bitrix24s');
    }
};
