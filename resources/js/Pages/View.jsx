import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import Topbar from "@/Layouts/NavBar";

export default function View() {
    return (
        <>
            <Topbar>
                <GuestLayout>
                    <Head title="Dashboard" />

                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900 dark:text-gray-100">
                                    view
                                </div>
                            </div>
                        </div>
                    </div>
                </GuestLayout>
            </Topbar>
        </>
    );
}
