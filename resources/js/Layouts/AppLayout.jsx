import Navbar from "../Components/Partials/Navbar";
import { useState } from 'react';
import Sidebar from "../Components/Partials/Sidebar";

export default function Layout({children}){
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    return (
        <>
            <Navbar sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} />
            <main>
                <Sidebar sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} />
                {children}
            </main>
        </>
    )
}
