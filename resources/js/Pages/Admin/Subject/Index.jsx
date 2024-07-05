import Layout from "../../../Layouts/AdminLayout";
import { ReactTabulator } from 'react-tabulator';
import { config } from "../../../Helpers/tabulator.config";

export default function Subjects({columns}){
    return (
        <Layout title="Subjects" cta={
            <>
                <button className="btn btn-primary text-lg"><i className="bx bx-plus"> Subject</i></button>
            </>
        }>
            <div className="card bg-white">
                <div className="card-body">
                    <ReactTabulator
                        columns={columns}
                        {...config}
                    />
                </div>
            </div>
        </Layout>
    );
}
