<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Contracts\Repositories\Bitrix24\Bitrix24Repository;
use App\Contracts\Repositories\MstarCorp\CategoriesRepository;
use App\Contracts\Repositories\MstarCorp\ModelsRepository;
use App\Contracts\Repositories\MstarCorp\PromptsRepository;
use App\Contracts\Repositories\MstarCorp\UserRepository;
use App\Contracts\Repositories\OpenAI\ChatGPTMessageLogRepository;
use App\Contracts\Repositories\OpenAI\ChatGPTRepository;
use App\Contracts\Repositories\TenTen\MiraBotRepository;
use App\Contracts\Repositories\TenTen\MstarBotMessageLogRepository;
use App\Contracts\Repositories\Zalo\ZaloRepository;
use App\Repositories\Eloquents\Bitrix24\EloquentBitrix24Repository;
use App\Repositories\Eloquents\MstarCorp\EloquentCategoriesRepository;
use App\Repositories\Eloquents\MstarCorp\EloquentModelsRepository;
use App\Repositories\Eloquents\MstarCorp\EloquentPromptsRepository;
use App\Repositories\Eloquents\MstarCorp\EloquentUserRepository;
use App\Repositories\Eloquents\OpenAI\EloquentChatGPTRepository;
use App\Repositories\Eloquents\ChatGPT\EloquentChatGPTMessageLogRepository;
use App\Repositories\Eloquents\TenTen\EloquentMiraBotRepository;
use App\Repositories\Eloquents\TenTen\EloquentMstarBotMessageLogRepository;
use App\Repositories\Eloquents\Zalo\EloquentZaloRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(Bitrix24Repository::class, EloquentBitrix24Repository::class);
        $this->app->bind(MiraBotRepository::class, EloquentMiraBotRepository::class);
        $this->app->bind(MstarBotMessageLogRepository::class, EloquentMstarBotMessageLogRepository::class);
        $this->app->bind(UserRepository::class, EloquentUserRepository::class);
        $this->app->bind(CategoriesRepository::class, EloquentCategoriesRepository::class);
        $this->app->bind(ModelsRepository::class, EloquentModelsRepository::class);
        $this->app->bind(PromptsRepository::class, EloquentPromptsRepository::class);
        $this->app->bind(ZaloRepository::class, EloquentZaloRepository::class);
        $this->app->bind(ChatGPTRepository::class, EloquentChatGPTRepository::class);
        $this->app->bind(ChatGPTMessageLogRepository::class, EloquentChatGPTMessageLogRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
