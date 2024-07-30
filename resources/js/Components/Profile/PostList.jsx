import List from "../Posts/List";

export default function PostList(){
    return(
        <div className="card bg-base-100 w-100 border">
            <div className="card-body">
                <h2 className="card-title mb-3 text-2xl font-bold">Your Posts</h2>
                <List />
            </div>
        </div>
    );
}
