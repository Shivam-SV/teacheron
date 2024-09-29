import Layout from "../../Layouts/AppLayout";
import { savePost, unsavePost } from "../../_utils/apis";
import PostDetail from "../../Components/Posts/PostDetail";


export default function ViewPost({ post }) {
    const [isSaved, setIsSaved] = useState(post?.saves?.length > 0);
    const handleSavePost = (event) => {
        event.preventDefault();
        if(isSaved) unsavePost(btoa(post.id)).then(res => res.status && setIsSaved(!isSaved)).catch(res => toast.error(res.message));
        else savePost(btoa(post.id)).then(res => res.status && setIsSaved(!isSaved)).catch(res => toast.error(res.message));
    }
    return (
        <Layout>
            <PostDetail post={post} />
        </Layout>
    );
}
