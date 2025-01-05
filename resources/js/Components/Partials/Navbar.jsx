import { Link, router, usePage } from "@inertiajs/react";

export default function Navbar({sidebarIsOpen, setSidebarIsOpen}){
    const {auth} = usePage().props;
    const isAdmin = auth?.roles?.map(role => role.name)?.includes('admin') || false;
    const isTutor = auth?.roles?.map(role => role.name)?.includes('teacher') || false;
    const isStudent = auth?.roles?.map(role => role.name)?.includes('student') || false;

    return (
        <header className="w-full p-2 bg-white/15 backdrop-blur-lg shadow py-2 tracking-wide">
            <nav className="container mx-auto">
                <div className="flex justify-between items-center">
                    <div className="flex items-center" >
                        <Link href="/" className="mr-10"><img src="/assets/images/jobhub-logo.svg" alt="Logo" /></Link>
                        <ul className="md:flex items-center hidden">
                            <li>
                                <div className="dropdown dropdown-hover">
                                    <div tabIndex={0} role="button" className="btn btn-ghost m-1">Tutors <i className='bx bx-chevron-down text-lg leading-4'></i></div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                        <li><Link href="/tutors" className="text-base font-medium" >All tutors</Link></li>
                                    </ul>
                                </div>
                            </li>

                            <li className="">
                                <div className="dropdown dropdown-hover">
                                    <div tabIndex={0} role="button" className="btn btn-ghost m-1">Tutors Jobs <i className='bx bx-chevron-down text-lg leading-4'></i></div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                        <li><Link href="/posts" className="text-base font-medium" >All tutors jobs</Link></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center gap-2">
                        {
                            auth ?
                            <>
                                {!isAdmin &&<Link href={route('conversations')} as="button" className="btn btn-ghost lg:inline-flex hidden "><i className='bx bx-chat align-middle text-lg'></i> Chats</Link>}
                                {isStudent && <Link href="/new-post" className="btn btn-primary btn-sm btn-outline md:inline-flex hidden"><i className="bx bx-plus text-lg"></i> Post</Link> }
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn m-1 md:inline-flex hidden group transition-all duration-150 ease-in-out">
                                        { auth?.profile?.mediaLink ? <img src={auth?.profile?.mediaLink} className="w-[25px] h-[25px] rounded-full" /> : <i className="bx bx-user text-xl"></i> }
                                        <span>{auth.name}</span>
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                        <li><Link href={isAdmin ? '/supadmin' : "/profile"} ><i className="bx bx-user text-xl"></i> Profile</Link></li>
                                        <li><Link method="post" href={route('logout')} as="button" ><i className='bx bx-log-out text-xl' ></i> Logout</Link></li>
                                    </ul>
                                </div>
                            </> :
                            <>
                                <Link href="/sign-in" className="btn btn-ghost hidden md:inline-flex">Register</Link>
                                <Link href="/login" className="btn btn-primary">Sign in</Link>
                            </>
                        }
                        <button className="btn btn-ghost lg:hidden" onClick={() => setSidebarIsOpen(true)}><i className="bx bx-menu text-2xl"></i></button>
                    </div>
                </div>
            </nav>
        </header>
    );
}
