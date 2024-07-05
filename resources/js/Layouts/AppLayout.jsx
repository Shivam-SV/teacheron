import Navbar from "../Components/Partials/Navbar";
import { useState } from 'react';
import Sidebar from "../Components/Partials/Sidebar";
import BaseLayout from "./BaseLayout";

export default function Layout({children}){
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    return (
        <BaseLayout>
            <Navbar sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} />
            <main>
                <Sidebar sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} />
                {children}
            </main>
        </BaseLayout>
    )
}
