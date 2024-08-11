import Basic from "../../Components/Profile/Forms/Basic";
import Layout from "../../Layouts/AppLayout";

export default function EditBasicProfile({user}) {
    return (
        <Layout>
            <div className="flex justify-center items-center">
                <div className="card sm:w-auto w-full ">
                    <div className="card-body">
                        <h1 className="card-title mb-4 text-2xl">Edit Your Basic Info</h1>
                        <Basic user={user} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}
