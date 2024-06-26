import RegisterCard from "../../Components/Auth/RegisterCard";
import Layout from "../../Layouts/AppLayout";

export default function Register({roles}){
    return (
        <Layout>
            <div className="md:mt-12 mt-4">
                <RegisterCard roles={roles} />
            </div>
        </Layout>
    );
}
