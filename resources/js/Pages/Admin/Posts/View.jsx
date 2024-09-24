import Layout from "../../../Layouts/AdminLayout";
import PostDetail from "../../../Components/Posts/PostDetail";

export default function ViewPost({ post }) {
    return (
        <Layout title="Post Detail">
            <div className="card bg-white">
                <div className="card-body">
                    <PostDetail post={post} readonly={true} />
                </div>
            </div>
        </Layout>
    );
}

