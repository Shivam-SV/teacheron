import PostList from "../../Components/Profile/PostList";
import ProfileDetail from "../../Components/Profile/ProfileDetail";
import ProfileHero from "../../Components/Profile/ProfileHero";
import TutoringDetails from "../../Components/Profile/TutoringDetails";
import WalletDetails from "../../Components/Profile/WalletDetails";
import Layout from "../../Layouts/AppLayout";

export default function Profile({ user }) {

    return (
        <Layout>
            <div className="container mx-auto">
                <div className="grid grid-cols-12 flex-wrap p-4 gap-5">
                    <div className="col-span-12 lg:col-span-8">
                        <ProfileHero user={user} myprofile={true} />
                        {user?.roles[0]?.name === 'student' && <PostList />}
                        {user?.roles[0]?.name === 'teacher' && <ProfileDetail user={user} myprofile={true} />}
                    </div>
                    <div className="col-span-12 lg:col-span-4">
                        <WalletDetails user={user} />
                        <TutoringDetails user={user} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
