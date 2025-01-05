import { useRef } from "react";
import LoginCard from "../../Components/Auth/LoginCard";
import Post from "../../Components/Posts/Post";
import Layout from "../../Layouts/AppLayout";
import { Link, router } from "@inertiajs/react";

export default function Posts({posts, query}){
    const loginRef = useRef(null);

    const onNoAuth = () => {
        loginRef.current.showModal();
    }

    const handleSearch = (event) => {
        event.preventDefault();
        router.visit(route('posts', event.target.search.value.toSlug()))
    }

    return (
        <Layout>
            <div className="container mx-auto p-4 my-8">
                {/* <section className="lg:py-20 md:py-12 py-8">
                    <form onSubmit={handleSearch }>
                        <div>
                            <label htmlFor="search" className="block text-base font-medium text-neutral/70 mx-2 mb-1">Find a perfect job for you</label>
                            <div className="relative w-full">
                                <input type="text" id="search" name="search" defaultValue={query?.unSlug() || ''} placeholder="Search for a job" className="w-full p-2 border-2 rounded-full px-4 text-lg shadow-md" />
                                <button className="absolute top-1 p-2 rounded-full right-2"><i className="bx bx-search bx-sm"></i></button>
                            </div>
                        </div>
                    </form>
                </section> */}

                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-neutral/70">Latest Jobs</h2>
                        <p className="text-sm text-neutral/40 italic">{posts?.total} {'job'.pluralize(posts?.total)} for you</p>
                    </div>
                    <div>
                        <div className="flex items-center">
                            <Link href={posts?.prev_page_url || '#'} className="px-1 rounded-full hover:bg-neutral/10 disabled:text-neutral/10 disabled:hover:bg-transparent disabled:cursor-not-allowed" as="button" disabled={posts?.prev_page_url === null} ><i className='bx bx-chevron-left bx-md'></i></Link>
                            <Link href={posts?.next_page_url || '#'} className="px-1 rounded-full hover:bg-neutral/10 disabled:text-neutral/10 disabled:hover:bg-transparent disabled:cursor-not-allowed" as="button" disabled={posts?.next_page_url === null} ><i className='bx bx-chevron-right bx-md'></i></Link>
                        </div>
                        <p className="text-sm text-neutral/40 italic">{posts?.per_page} on page</p>
                    </div>
                </div>
                <div className="flex items-stretch gap-4 flex-wrap">
                    {posts?.data?.length > 0 ? posts.data.map(p => {
                        return (
                            <Post content={p} key={p.id} onNoAuth={onNoAuth} />
                        )
                    }) : <h2 className="text-2xl font-bold text-neutral/20 text-center col-span-12">No post found, Might be all posts has been flew away</h2>}
                </div>
            </div>

            <dialog id="login-modal" className="modal" ref={loginRef}>
                <div className="modal-box p-6 w-[26rem]">
                    <LoginCard title={"🙋‍♂️ Hola User!"} message={"Work hassle free with TeacherOn. sign in to proceed further"} />
                </div>
            </dialog>
        </Layout>
    )
}
