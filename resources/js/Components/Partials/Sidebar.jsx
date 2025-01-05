import { Link, usePage } from "@inertiajs/react";

export default function Sidebar({sidebarIsOpen, setSidebarIsOpen}){
    const {auth} = usePage().props;
    const isAdmin = auth?.roles?.map(role => role.name)?.includes('admin') || false;
    const isTutor = auth?.roles?.map(role => role.name)?.includes('teacher') || false;
    const isStudent = auth?.roles?.map(role => role.name)?.includes('student') || false;

    return (
        <aside className={"bg-white shadow-md w-[320px] h-screen fixed top-0 right-0 z-20 transition-all ease-in-out duration-300" + (!sidebarIsOpen ? ' opacity-0 invisible' : '')}>
            <div className="relative flex flex-col justify-between h-full w-full">
                <div className="flex items-center justify-between px-4 py-2 mb-4 border-b border-gray-200">
                    <p className="text-xl font-semibold">Hello {auth?.name || "Guest"} </p>
                    <button className="btn btn-ghost btn-sm" onClick={() => setSidebarIsOpen(false)}><i className="bx bx-x text-xl"></i></button>
                </div>
                <ul className="menu rounded-box flex-1">
                    <li><Link href="/tutors" className="text-base font-medium" ><i className='bx bx-user-voice text-lg align-middle' ></i> Tutors</Link></li>
                    <li><Link href="/posts" className="text-base font-medium" ><i className='bx bx-briefcase text-lg align-middle' ></i> Tutors jobs</Link></li>
                    {!isAdmin && <li><Link href={route('conversations')} as="button" className="text-base font-medium"><i className='bx bx-chat align-middle text-lg'></i> Chats</Link></li>}
                    {isStudent && <li><Link href="/new-post" className="text-base font-medium"><i className="bx bx-plus text-lg"></i> Post</Link></li> }
                </ul>
                {
                    auth && (
                        <div tabIndex={0} className="collapse bg-base-200">
                            <div className="collapse-title text-xl font-medium">
                                <div className="flex gap-2 items-center">
                                    { auth?.profile?.mediaLink ? <img src={auth?.profile?.mediaLink} className="w-[25px] h-[25px] rounded-full" /> : <i className="bx bx-user text-xl"></i> }
                                    <span>{auth?.name}</span>
                                </div>
                            </div>
                            <div className="collapse-content">
                                <ul tabIndex={0} className="menu">
                                    <li><Link href={isAdmin ? '/supadmin' : "/profile"} ><i className="bx bx-user text-xl"></i> Profile</Link></li>
                                    <li><Link method="post" href={route('logout')} as="button" ><i className='bx bx-log-out text-xl' ></i> Logout</Link></li>
                                </ul>
                            </div>
                        </div>
                    )
                }
            </div>
        </aside>
    );
}
