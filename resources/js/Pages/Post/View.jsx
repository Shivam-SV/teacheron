import Layout from "../../Layouts/AppLayout";
import PostDetail from "../../Components/Posts/PostDetail";
import { usePage } from "@inertiajs/react";


export default function ViewPost({ post }) {
    const { auth } = usePage().props;
    console.log(auth);
    return (
        <Layout>
            <PostDetail post={post} readonly={auth.id !== post.user_id} />
        </Layout>
    );
}
