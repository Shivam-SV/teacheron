import { useRef } from "react";
import LoginCard from "../../Components/Auth/LoginCard";
import Post from "../../Components/Posts/Post";
import Layout from "../../Layouts/AppLayout";

export default function Posts({posts}){
    const loginRef = useRef(null);

    const onNoAuth = () => {
        loginRef.current.showModal();
    }

    return (
        <Layout>
            <div className="container mx-auto p-4">
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
