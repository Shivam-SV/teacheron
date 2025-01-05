import PostList from "../../Components/Profile/PostList";
import ProfileDetail from "../../Components/Profile/ProfileDetail";
import ProfileHero from "../../Components/Profile/ProfileHero";
import PersonalDetails from "../../Components/Profile/PersonalDetails";
import WalletDetails from "../../Components/Profile/WalletDetails";
import Layout from "../../Layouts/AppLayout";

export default function Profile({ user }) {
    console.log(user);
    const isStudent = user?.roles.map(role => role.name).includes('student');
    const isTeacher = user?.roles.map(role => role.name).includes('teacher');

    return (
        <Layout>
            <div className="container mx-auto">
                <div className="grid grid-cols-12 flex-wrap p-4 gap-5">
                    <div className="col-span-12 lg:col-span-8">
                        <ProfileHero user={user} myprofile={true} buyable={false} />
                        {isStudent && <PostList posts={user.posts} />}
                        {isTeacher && <ProfileDetail user={user} myprofile={true} />}
                    </div>
                    <div className="col-span-12 lg:col-span-4">
                        {isTeacher && <WalletDetails user={user} />}
                        <PersonalDetails user={user} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
