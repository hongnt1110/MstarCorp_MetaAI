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
        Schema::create('zalo_oas', function (Blueprint $table) {
            $table->id();
            $table->string('domain');
            $table->string('app_id');
            $table->string('secret_key');
            $table->string('oa_secret_key');
            $table->text('access_token');
            $table->text('refresh_token');
            $table->bigInteger('expired');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('zalo_oas');
    }
};
