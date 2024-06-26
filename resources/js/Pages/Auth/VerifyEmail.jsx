import VerifyEmailCard from "../../Components/Auth/VerifyEmailCard";
import Layout from "../../Layouts/AppLayout";

export default function VerifyEmail(){
    return (
        <Layout>
            <div className="lg:mt-24 md:mt-12 mt-4">
                <VerifyEmailCard />
            </div>
        </Layout>
    );
}
