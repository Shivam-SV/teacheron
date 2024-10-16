import { Head, Link } from "@inertiajs/react";
import SideBar from "../Components/Partials/AdminSideBar";
import BaseLayout from "./BaseLayout";

export default function Layout({children, title, cta}){
    return (
        <BaseLayout>
            <div className="flex h-screen">
                <SideBar />
                <main className="p-4 bg-base-200 w-full">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-extrabold">{title ?? ''}</h2>
                            <div className="breadcrumbs text-sm text-neutral py-1">
                                <ul>
                                    <li><Link href="/supadmin">Home</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div>{cta}</div>
                    </div>
                    <div className="box">
                        {children}
                    </div>
                </main>
            </div>
        </BaseLayout>
    );
}
