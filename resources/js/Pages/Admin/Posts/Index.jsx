import Layout from "../../../Layouts/AdminLayout";
import Table from "../../../Components/Partials/Table";
export default function Posts({posts}){
    return (
        <Layout title="Student">
            <div className="card bg-white">
                <div className="card-body">
                    <Table
                        resource={posts}
                        placeholder="No Posts Found"
                     />
                </div>
            </div>
        </Layout>
    );
}

