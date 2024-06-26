import { Link } from "@inertiajs/react";

export default function Navbar({sidebarIsOpen, setSidebarIsOpen, auth}){
    return (
        <header className="w-full p-2 bg-white/15 backdrop-blur-lg shadow py-5 tracking-wide">
            <nav className="container mx-auto">
                <div className="flex justify-between items-center">
                    <div className="flex items-center" >
                        <Link href="/" className="mr-10"><img src="/assets/images/jobhub-logo.svg" alt="Logo" /></Link>
                        <ul className="md:flex items-center hidden">
                            <li className="relative">
                                <span className="inline-flex md:gap-2 items-center cursor-pointer px-4 py-2">
                                    <a href="#" className="text-base font-medium " >Store</a>
                                </span>
                            </li>

                            <li className="relative group">
                                <span className="inline-flex gap-2 items-center cursor-pointer px-4 py-2">
                                    <a href="#" className="text-base font-medium " >Tutors</a>
                                    <i className='bx bx-chevron-down text-lg leading-4'></i>
                                </span>
                                <ul className="mt-8 z-10 border rounded-lg absolute top-0 left-0 bg-white min-w-48 shadow-lg p-2 invisible group-hover:visible group-hover:opacity-100 opacity-0 transition-all ease-in-out duration-200">
                                    <li className="whitespace-nowrap p-2 rounded hover:bg-primary/10 transition-all ease-in-out duration-200"><a href="#" className="text-base font-medium" >All tutors</a></li>
                                    <li className="whitespace-nowrap p-2 rounded hover:bg-primary/10 transition-all ease-in-out duration-200"><a href="#" className="text-base font-medium" >Online tutors</a></li>
                                    <li className="whitespace-nowrap p-2 rounded hover:bg-primary/10 transition-all ease-in-out duration-200"><a href="#" className="text-base font-medium" >Home tutors</a></li>
                                    <li><hr className="my-3" /></li>
                                    <li className="whitespace-nowrap p-2 rounded hover:bg-primary/10 transition-all ease-in-out duration-200"><a href="#" className="text-base font-medium" >Request a tutor</a></li>
                                </ul>
                            </li>

                            <li className="relative group">
                                <span className="inline-flex gap-2 items-center cursor-pointer px-4 py-2">
                                    <a href="#" className="text-base font-medium " >Tutors Jobs</a>
                                    <i className='bx bx-chevron-down text-lg leading-4'></i>
                                </span>
                                <ul className="mt-8 z-10 border rounded-lg absolute top-0 left-0 bg-white min-w-48 shadow-lg p-2 invisible group-hover:visible group-hover:opacity-100 opacity-0 transition-all ease-in-out duration-200">
                                    <li className="whitespace-nowrap p-2 rounded hover:bg-primary/10 transition-all ease-in-out duration-200"><a href="#" className="text-base font-medium" >All tutors jobs</a></li>
                                    <li className="whitespace-nowrap p-2 rounded hover:bg-primary/10 transition-all ease-in-out duration-200"><a href="#" className="text-base font-medium" >Online tutors jobs</a></li>
                                    <li className="whitespace-nowrap p-2 rounded hover:bg-primary/10 transition-all ease-in-out duration-200"><a href="#" className="text-base font-medium" >Home tutors jobs</a></li>
                                </ul>
                            </li>

                            <li className="relative">
                                <span className="inline-flex gap-2 items-center cursor-pointer px-4 py-2">
                                    <a href="#" className="text-base font-medium " >Assignment Help</a>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center gap-2">
                        {
                            auth ?
                            <>
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn m-1 group transition-all duration-150 ease-in-out">
                                        <i className="bx bx-user text-xl"></i>
                                        <span>{auth.name}</span>
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                        <li><a><i className="bx bx-user text-xl"></i> Profile</a></li>
                                        <li><a><i className='bx bx-log-out text-xl' ></i> Logout</a></li>
                                    </ul>
                                </div>
                            </> :
                            <>
                                <Link href="/sign-in" className="btn btn-ghost hidden md:inline-flex">Register</Link>
                                <Link href="/login" className="btn btn-primary">Sign up</Link>
                            </>
                        }
                        <button className="btn btn-ghost md:hidden" onClick={() => setSidebarIsOpen(true)}><i className="bx bx-menu text-2xl"></i></button>
                    </div>
                </div>
            </nav>
        </header>
    );
}
