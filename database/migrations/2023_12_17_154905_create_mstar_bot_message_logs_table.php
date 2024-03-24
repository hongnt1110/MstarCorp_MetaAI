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
        Schema::create('mstar_bot_message_logs', function (Blueprint $table) {
            $table->id();
            $table->string('dialog_id');
            $table->string('conversation_id');
            $table->text('question');
            $table->text('answer');
            $table->json('sources');
            $table->string('url');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mstar_bot_message_logs');
    }
};
