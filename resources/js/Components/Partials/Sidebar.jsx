export default function Sidebar({sidebarIsOpen, setSidebarIsOpen}){
    return (
        <aside className={"bg-white shadow-md w-[380px] h-screen fixed top-0 right-0 z-20 transition-all ease-in-out duration-300" + (!sidebarIsOpen ? ' opacity-0 invisible' : '')}>
            <div className="p-6 flex items-center gap-2">
                <label className="input flex items-center gap-2 bg-base-200 grow">
                    <i className='bx bx-search-alt text-lg'></i>
                    <input type="search" className="grow" name="search" id="appSearch" placeholder="Search" />
                </label>
                <button className="btn btn-ghost" onClick={() => setSidebarIsOpen(false)}><i className="bx bx-x text-xl"></i></button>
            </div>
            <hr />
            <ul className="p-2">
                <li className="relative">
                    <span className="flex md:gap-2 items-center cursor-pointer px-4 py-2">
                        <a href="#" className="text-base font-medium " >Store</a>
                    </span>
                </li>

                <li className="relative group">
                    <span className="flex gap-2 items-center cursor-pointer px-4 py-2">
                        <a href="#" className="text-base font-medium grow" >Tutors</a>
                        <i className='bx bx-chevron-down text-lg leading-4'></i>
                    </span>
                    <ul className="ps-6 p-2 hidden group-hover:block invisible group-hover:visible group-hover:opacity-100 opacity-0 transition-all ease-in-out duration-200">
                        <li className="whitespace-nowrap p-2 rounded hover:bg-primary/10 transition-all ease-in-out duration-200"><a href="#" className="text-base font-medium" >All tutors</a></li>
                        <li className="whitespace-nowrap p-2 rounded hover:bg-primary/10 transition-all ease-in-out duration-200"><a href="#" className="text-base font-medium" >Online tutors</a></li>
                        <li className="whitespace-nowrap p-2 rounded hover:bg-primary/10 transition-all ease-in-out duration-200"><a href="#" className="text-base font-medium" >Home tutors</a></li>
                        <li><hr className="my-3" /></li>
                        <li className="whitespace-nowrap p-2 rounded hover:bg-primary/10 transition-all ease-in-out duration-200"><a href="#" className="text-base font-medium" >Request a tutor</a></li>
                    </ul>
                </li>

                <li className="relative group">
                    <span className="flex gap-2 items-center cursor-pointer px-4 py-2">
                        <a href="#" className="text-base font-medium grow" >Tutors Jobs</a>
                        <i className='bx bx-chevron-down text-lg leading-4'></i>
                    </span>
                    <ul className="ps-6 p-2 hidden group-hover:block invisible group-hover:visible group-hover:opacity-100 opacity-0 transition-all ease-in-out duration-200">
                        <li className="whitespace-nowrap p-2 rounded hover:bg-primary/10 transition-all ease-in-out duration-200"><a href="#" className="text-base font-medium" >All tutors jobs</a></li>
                        <li className="whitespace-nowrap p-2 rounded hover:bg-primary/10 transition-all ease-in-out duration-200"><a href="#" className="text-base font-medium" >Online tutors jobs</a></li>
                        <li className="whitespace-nowrap p-2 rounded hover:bg-primary/10 transition-all ease-in-out duration-200"><a href="#" className="text-base font-medium" >Home tutors jobs</a></li>
                    </ul>
                </li>

                <li className="relative">
                    <span className="flex gap-2 items-center cursor-pointer px-4 py-2">
                        <a href="#" className="text-base font-medium " >Assignment Help</a>
                    </span>
                </li>
            </ul>
        </aside>
    );
}
