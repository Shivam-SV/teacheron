import Layout from "../../../Layouts/AdminLayout";
import Table from "../../../Components/Partials/Table";
export default function Index({students}){
    return (
        <Layout>
            <div className="card bg-white">
                <div className="card-body">
                    <Table
                        resource={students}
                        placeholder="No Students Found"
                     />
                </div>
            </div>
        </Layout>
    )
}
