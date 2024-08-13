import Layout from "../../../Layouts/AdminLayout";
import Table from "../../../Components/Partials/Table";
export default function Index({teachers}){
    return (
        <Layout>
            <div className="card bg-white">
                <div className="card-body">
                    <Table resource={teachers} />
                </div>
            </div>
        </Layout>
    )
}
