import Post from "../Posts/Post";

export default function PostList({posts}){
    return(
        <div className="card bg-base-100 w-100 border static">
            <div className="card-body">
                <h2 className="card-title mb-3 text-2xl font-bold">Your Posts</h2>
                <div className="flex gap-4 items-center flex-wrap">
                    {posts.length > 0 ? posts.map((post, index) => (<Post content={post} key={index} readonly={true} />)) : <em className="text-neutral/40">No posts yet, hit the + post button to add one</em>}
                </div>
            </div>
        </div>
    );
}
