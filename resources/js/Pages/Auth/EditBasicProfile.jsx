import Basic from "../../Components/Profile/Forms/Basic";
import Layout from "../../Layouts/AppLayout";

export default function EditBasicProfile({user, countries}) {
    return (
        <Layout>
            <div className="flex justify-center items-center">
                <div className="card sm:w-auto w-full static">
                    <div className="card-body">
                        <h1 className="card-title mb-4 text-2xl">Edit Your Basic Info</h1>
                        <BasicForm user={user} countries={countries} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}
