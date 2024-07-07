import { Link } from "@inertiajs/react";

export default function SideBar(){
    return (
        <aside className="w-[250px] bg-base-100 shadow-lg">
            <div className="branding p-4 mb-4 flex items-center justify-center">
                <img src="/assets/images/jobhub-logo.svg" alt="Logo" />
            </div>
            <ul className="menu">
                <li>
                    <h2 className="menu-title">Users</h2>
                    <ul>
                        <li>
                            <Link href="/supadmin/teachers" classID="text-base">
                                <i className='bx bxs-user text-lg align-middle'></i>
                                <span className="grow">Teachers</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/supadmin/Students" classID="text-base">
                                <i className='bx bx-user text-lg align-middle'></i>
                                <span className="grow">Students</span>
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <h2 className="menu-title">General</h2>
                    <ul>
                        <li>
                            <Link href="/supadmin/subjects" className="text-base">
                                <i className='bx bx-captions text-lg align-middle'></i>
                                <span className="grow">Subjects</span>
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </aside>
    );
}