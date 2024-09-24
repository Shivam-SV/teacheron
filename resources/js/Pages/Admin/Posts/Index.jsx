import Layout from "../../../Layouts/AdminLayout";
import Table from "../../../Components/Partials/Table";
import { Link } from "@inertiajs/react";
export default function Posts({ posts }) {
    return (
        <Layout title="Post">
            <div className="card bg-white">
                <div className="card-body">
                    <Table
                        resource={posts}
                        placeholder="No Posts Found"
                        actions={{
                            action: ({ row }) => {
                                return (
                                    <>
                                        <Link href={route('supadmin.posts.show', btoa(row.id))} className="btn btn-primary btn-sm mr-1"><i className="bx bx-info-circle"></i> View</Link>
                                    </>
                                )
                            }
                        }}
                    />
                </div>
            </div>
        </Layout>
    );
}

