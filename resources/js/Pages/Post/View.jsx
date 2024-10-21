import Layout from "../../Layouts/AppLayout";
import PostDetail from "../../Components/Posts/PostDetail";


export default function ViewPost({ post }) {


    return (
        <Layout>
            <PostDetail post={post} />
        </Layout>
    );
}
