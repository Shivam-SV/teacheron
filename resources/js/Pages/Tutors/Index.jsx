import Tutor from "../../Components/Tutors/Tutor";
import Layout from "../../Layouts/AppLayout";

export default function Tutors({tutors}){
    return (
        <Layout>
            <div className="flex flex-wrap gap-2 my-6 mx-10">
                {tutors.length > 0 && tutors.map(t => <Tutor tutor={t} key={t.id} />)}
            </div>
        </Layout>
    );
}
