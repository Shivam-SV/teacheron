import ProfileHero from "../../Components/Auth/ProfileHero";
import Layout from "../../Layouts/AppLayout";

export default function Profile({user}){
    return (
        <Layout>
            <div className="container mx-auto">
                <div className="grid grid-cols-12 flex-wrap p-4">
                    <div className="col-span-9">
                        <ProfileHero user={user} />
                    </div>
                    <div className="col-span-3"></div>
                </div>
                <div>

                </div>
            </div>
        </Layout>
    );
}
