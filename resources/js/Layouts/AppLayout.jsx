import Navbar from "../Components/Partials/Navbar";
import { useState, useContext } from 'react';
import Sidebar from "../Components/Partials/Sidebar";
import { GlobalPropsContext } from "../Contexts/AppContext";

export default function Layout({children}){
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    const AppProps = useContext(GlobalPropsContext);
    return (
        <>
            <Navbar sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} auth={AppProps.props?.auth} />
            <main>
                <Sidebar sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} />
                {children}
            </main>
        </>
    )
}
