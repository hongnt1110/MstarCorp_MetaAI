<?php

namespace App\Contracts\Repositories\TenTen;

use App\Contracts\Repositories\BaseRepository;

interface MiraBotRepository extends BaseRepository
{
    public function callMiraAPI($conversationId, $token_bot, $question);
    public function createConversationId();
    public function findByDialogId($dialogId, $url);
}
