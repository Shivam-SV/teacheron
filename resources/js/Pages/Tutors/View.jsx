import ProfileDetail from "../../Components/Profile/ProfileDetail";
import ProfileHero from "../../Components/Profile/ProfileHero";
import Layout from "../../Layouts/AppLayout";

export default function ViewTutor({tutor}){
    return (
        <Layout>
            <div className="max-w-4xl mx-auto my-6">
                <ProfileHero user={tutor} buyable={true} myprofile={false} />
                <ProfileDetail user={tutor} myprofile={false} />
            </div>
        </Layout>
    );
}
