<?php

namespace App\Http\Controllers\Api\ChatGPT;

use App\Contracts\Repositories\Bitrix24\Bitrix24Repository;
use App\Contracts\Repositories\OpenAI\ChatGPTRepository;
use App\Contracts\Repositories\OpenAI\ChatGPTMessageLogRepository;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ChatGPTController extends Controller
{
    protected $bitrix24Repository;
    protected $chatGPTRepository;
    protected $chatGPTMessageLogRepository;

    public function __construct(
        Bitrix24Repository $bitrix24Repository,
        ChatGPTRepository $chatGPTRepository,
        ChatGPTMessageLogRepository $chatGPTMessageLogRepository
    ) {
        $this->bitrix24Repository = $bitrix24Repository;
        $this->chatGPTRepository = $chatGPTRepository;
        $this->chatGPTMessageLogRepository = $chatGPTMessageLogRepository;
    }


    public function index()
    {
        $result = $this->chatGPTRepository->getAll();
        return response()->json([$result]);
    }

    public function install(Request $request)
    {
        $clientId = env('CLIENT_ID');
        $clientSecret = env('CLIENT_SECRET');
        $eventType = $request->input('event');
        switch ($eventType) {
            case 'ONAPPINSTALL':
                return $this->handleOnAppInstallEvent($request, $clientId, $clientSecret);
            default:
                return response()->json(['status' => 'error', 'message' => 'Unknown event type'], 400);
        }
    }

    public function handleEvent(Request $request)
    {
        $clientId = env('CLIENT_ID');
        $clientSecret = env('CLIENT_SECRET');
        $eventType = $request->input('event');
        switch ($eventType) {
            case 'ONIMBOTMESSAGEADD':
                return $this->handleMessageAddEvent($request, $clientId, $clientSecret);
            case 'ONIMBOTJOINCHAT':
                return $this->handleJoinChatEvent($request, $clientId, $clientSecret);
            case 'ONIMCOMMANDADD':
                return $this->handleCommandAddEvent($request);
            case 'ONIMBOTDELETE':
                return $this->handleDeleteEvent($request);
            default:
                return response()->json(['status' => 'error', 'message' => 'Unknown event type'], 400);
        }
    }

    private function handleOnAppInstallEvent($request, $clientId, $clientSecret)
    {
        // Build URL
        $handlerBackUrl = route('ChatGPT.handleEvent');
        $result = $this->restCommand('imbot.register', [
            'CODE' => 'ChatGPT',
            'TYPE' => 'B',
            'EVENT_MESSAGE_ADD' => $handlerBackUrl,
            'EVENT_WELCOME_MESSAGE' => $handlerBackUrl,
            'EVENT_BOT_DELETE' => $handlerBackUrl,
            'OPENLINE' => 'Y', // this flag only for Open Channel mode http://bitrix24.ru/~bot-itr
            'PROPERTIES' => array(
                'NAME' => 'Chat GPT',
                'COLOR' => 'Green',
                'EMAIL' => 'dang.nguyen@mstarcorp.vn',
                'PERSONAL_BIRTHDAY' => '2022-12-04',
                'WORK_POSITION' => 'ChatGPT AI',
                'PERSONAL_WWW' => 'http://bitrix24.com',
                'PERSONAL_GENDER' => 'F',
                // 'PERSONAL_PHOTO' => base64_encode(file_get_contents(__DIR__ . '/avatar.png')),
            )
        ], $request->input('auth'), $clientId, $clientSecret);
        return $result;
        Log::info("OnAppInstall", $result);
    }

    private function handleMessageAddEvent($request, $clientId, $clientSecret)
    {
        if ($request->input('data.PARAMS.CHAT_ENTITY_TYPE') == 'LINES') {
            list($message) = explode(" ", $request->input('data.PARAMS.MESSAGE'));
            //LiveChat
            switch ($message) {
                case '1':
                    $result = $this->restCommand('imbot.message.add', [
                        "DIALOG_ID" => $request->input('data.PARAMS.DIALOG_ID'),
                        "MESSAGE" => 'Im Mstar Bot, i can repeat message after you and send menu in Open Channels!',
                    ], $request->input('auth'), $clientId, $clientSecret);
                    break;
                case '0':
                    $result = $this->restCommand('imbot.message.add', [
                        "DIALOG_ID" => $request->input('data.PARAMS.DIALOG_ID'),
                        "MESSAGE" => 'Đang chuyển tới Kỹ Thuật Viên, hãy chờ trong giây lát!',
                    ], $request->input('auth'), $clientId, $clientSecret);
                    break;
                default:
                    $response = $this->chatGPTRepository->callChatGPTApi($request->input('data.PARAMS.MESSAGE'));

                    $result = $this->restCommand('imbot.message.add', [
                        "DIALOG_ID" => $request->input('data.PARAMS.DIALOG_ID'),
                        "MESSAGE" => $response['data']['answer']
                            . '[br]'
                            . 'Chi tiết thêm:[br]'
                            . '[send=1]1. Tìm thêm thông tin về Mstar Bot[/send][br]'
                            . '[send=0]0. Chuyển tới kỹ thuật viên[/send]',

                    ], $request->input('auth'), $clientId, $clientSecret);

                    $saveData = [
                        'dialog_id' => $request->input('data.PARAMS.DIALOG_ID'),
                        'conversation_id' => $response['data']['conversation_id'],
                        'question' => $request->input('data.PARAMS.MESSAGE'),
                        'answer' => $response['data']['answer'],
                        'sources' => json_encode($response['data']['sources']),
                        'url' => $request->input('auth.domain'),
                    ];
                    $this->chatGPTMessageLogRepository->create($saveData);
                    break;
            }
        } else {
            $response = $this->chatGPTRepository->callChatGPTApi($request->input('data.PARAMS.MESSAGE'));
            $result = $this->restCommand('imbot.message.add', [
                "DIALOG_ID" => $request->input('data.PARAMS.DIALOG_ID'),
                "MESSAGE" => "Mstar Bot",
                "ATTACH" => [
                    ["MESSAGE" => $response['data']['answer']],
                ]
            ], $request->input('auth'), $clientId, $clientSecret);
            $saveData = [
                'dialog_id' => $request->input('data.PARAMS.DIALOG_ID'),
                'conversation_id' => $response['data']['conversation_id'],
                'question' => $request->input('data.PARAMS.MESSAGE'),
                'answer' => $response['data']['answer'],
                'sources' => json_encode($response['data']['sources']),
                'url' => $request->input('auth.domain'),
            ];
            $this->chatGPTMessageLogRepository->create($saveData);
        }

        Log::info('handleMessageAddEvent', [$result]);
    }

    private function handleCommandAddEvent($request)
    {
        Log::info('handleCommandAddEvent', $request->all());
    }

    private function handleJoinChatEvent($request, $clientId, $clientSecret)
    {
        if ($request->input('data.PARAMS.CHAT_ENTITY_TYPE') == 'LINES') {
            $message =
                'Mstar Bot:[br]' .
                '[send=1]1. Tìm thêm thông tin về Mstar Bot[/send][br]' .
                '[send=0]0. Chuyển tới kỹ thuật viên[/send]';
            $result = $this->restCommand('imbot.message.add', [
                "DIALOG_ID" => $request->input('data.PARAMS.DIALOG_ID'),
                "MESSAGE" => $message,
            ], $request->input("auth"), $clientId, $clientSecret);
        } else {
            $message = "Tôi là Mstar Bot! Tôi có thể giúp được gì cho bạn?";
            $attach = [
                ["MESSAGE" => ($request->input('data.PARAMS.CHAT_TYPE') == 'P' ? 'Private instructions' : 'Chat instructions')],
                ["MESSAGE" => ($request->input('data.PARAMS.CHAT_TYPE') == 'P' ? '[send=Bitrix24 là gì]Bitrix24 là gì[/send] or [put=Mstar Corp là công ty gì?]Hỏi Mstar Bot[/put]' : "[send=Bitrix24 là gì]Bitrix24 là gì[/send] or [put=Mstar Corp là công ty gì?]Hỏi Mstar Bot[/put]")]
            ];
            $keyboard = [
                ["TEXT" => "Help", "COMMAND" => "help"],
            ];
            $result = $this->restCommand('imbot.message.add', [
                "DIALOG_ID" => $request->input('data.PARAMS.DIALOG_ID'),
                "MESSAGE" => $message,
                "ATTACH" => $attach,
                "KEYBOARD" => $keyboard
            ], $request->input("auth"), $clientId, $clientSecret);
        }

        // $mstarBotConversation = [
        //     'dialog_id' => $request->input('data.PARAMS.DIALOG_ID'),
        //     'token_bot' => $token_bot,
        //     'conversation_id' => $conversation_id,
        //     'url' => $request->input('auth.domain'),
        // ];
        // $this->chatGPTRepository->create($mstarBotConversation);
        Log::info("ImBot Event join chat", $result);
    }

    public function handleDeleteEvent($request)
    {
        Log::info('Delete', $request->all());
    }

    public function restCommand($method, $params = [], $auth = [], $clientId, $clientSecret, $authRefresh = true)
    {
        try {
            $queryUrl = $auth["client_endpoint"] . $method;
            $queryData = array_merge($params, ["auth" => $auth["access_token"]]);

            Log::info($method, ['URL' => $queryUrl, 'PARAMS' => $queryData]);
            $response = Http::withOptions([
                'verify' => true
            ])->post($queryUrl, $queryData);
            $result = $response->json();

            return $result;
            if ($authRefresh && isset($result['error']) && in_array($result['error'], ['expired_token', 'invalid_token'])) {
                $auth = $this->restAuth($auth, $clientId, $clientSecret);
                if ($auth) {
                    return $this->restCommand($method, $params, $auth,  $clientId, $clientSecret, false);
                }
            }

            return $result;
        } catch (\Exception $e) {
            Log::error('Error in restCommand: ' . $e->getMessage());
            // Handle the exception or rethrow it
            throw $e;
        }
    }

    public function restAuth($auth, $clientId, $clientSecret)
    {
        if (!$clientId || !$clientSecret) {
            return false;
        }

        if (!isset($auth['refresh_token'])) {
            return false;
        }

        try {
            $queryParams = [
                'grant_type' => 'refresh_token',
                'client_id' => $clientId,
                'client_secret' => $clientSecret,
                'refresh_token' => $auth['refresh_token'],
            ];
            Log::info('ImBot request auth data', ['URL' => 'https://oauth.bitrix.info/oauth/token/', 'PARAMS' => $queryParams]);
            $response = Http::asForm()->post('https://oauth.bitrix.info/oauth/token/', $queryParams);
            $result = $response->json();

            if (!isset($result['error'])) {
                // Assuming you have a method to save these parameters
                // For instance, you could use a database, a config file, or Laravel's cache system
                $this->saveAuthParams($auth['application_token'], $result);
            } else {
                $result = false;
            }

            return $result;
            Log::info(['restAuth: ' => $result, 'queryParams' => $queryParams]);
        } catch (\Exception $e) {
            Log::error('Error in restAuth: ' . $e->getMessage());

            return false;
        }
    }

    function saveAuthParams($applicationToken, $authData)
    {
        // Implement this function to save the auth data
        // For example, you can use Laravel's Cache or a database
        // Cache::put('auth_'.$applicationToken, $authData);
    }
}
