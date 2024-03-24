import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';import AdbIcon from "@mui/icons-material/Adb";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';

const MenuList = [
    {
        element: <AccountBalanceOutlinedIcon />,
        state: "account",
        sidebarProps: {
            displayText: "Quản lý tài khoản",
            icon: <AccountBalanceOutlinedIcon />,
        },
        child: [
            {
                path: route("admin"),
                element: <ArrowRightIcon />,
                state: "account.profile",
                sidebarProps: {
                    displayText: "Xem Profile",
                    icon: <ArrowRightIcon />,
                },
            },
            {
                path: route("Admin.Users.Users"),
                element: <ArrowRightIcon />,
                state: "account.password",
                sidebarProps: {
                    displayText: "Quản lý mật khẩu",
                    icon: <ArrowRightIcon />,
                },
            },
        ],
    },
    {
        element: <AdbIcon />,
        state: "Chatbot",
        sidebarProps: {
            displayText: "Quản lý Chatbot",
            icon: <AdbIcon />,
        },
        child: [
            {
                path: route("Admin.Prompts.Prompts"),
                element: <ArrowRightIcon />,
                state: "Chatbot.prompt",
                sidebarProps: {
                    displayText: "Quản lý Prompt",
                    icon: <ArrowRightIcon />,
                },
            },
            {
                path: route("Admin.Categories.Categories"),
                element: <ArrowRightIcon />,
                state: "Chatbot.prompt",
                sidebarProps: {
                    displayText: "Quản lý Category",
                    icon: <ArrowRightIcon />,
                },
            },
            {
                path: route("Admin.Models.Models"),
                element: <ArrowRightIcon />,
                state: "Chatbot.prompt",
                sidebarProps: {
                    displayText: "Quản lý Model",
                    icon: <ArrowRightIcon />,
                },
            },
            {
                path: route("Admin.Subcription.Subcription"),
                element: <ArrowRightIcon />,
                state: "Chatbot.prompt",
                sidebarProps: {
                    displayText: "Quản lý Subcription",
                    icon: <ArrowRightIcon />,
                },
            },
        ],
    },
    {
        element: <AccountCircleOutlinedIcon />,
        state: "account",
        sidebarProps: {
            displayText: "Quản lý người dùng",
            icon: <AccountCircleOutlinedIcon />,
        },
        child: [
            {
                path: route("Admin.Users.Users"),
                element: <ArrowRightIcon />,
                state: "account.password",
                sidebarProps: {
                    displayText: "Quản lý khách hàng",
                    icon: <ArrowRightIcon />,
                },
            },
        ],
    },
];

export default MenuList;
