import LoginCard from "../../Components/Auth/LoginCard";
import toastFlasher from "../../Helpers/appHelper";
import Layout from "../../Layouts/AppLayout";

export default function Login(){
    return (
        <Layout>
            <div className="lg:mt-24 md:mt-12 mt-4">
                <LoginCard />
            </div>
        </Layout>
    );
}
