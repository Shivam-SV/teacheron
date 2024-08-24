import Layout from "../../../Layouts/AdminLayout";
import Table from "../../../Components/Partials/Table";
export default function Index({teachers}){
    return (
        <Layout title="Teachers">
            <div className="card bg-white">
                <div className="card-body">
                    <Table
                        resource={teachers}
                        placeholder="No Teachers Found"
                    />
                </div>
            </div>
        </Layout>
    )
}
