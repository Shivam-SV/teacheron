import { router } from "@inertiajs/react";
import ExperienceForm from "../../Components/Profile/Forms/Experiences";
import OnBoardingLayout from "../../Layouts/OnBoardingLayout";

export default function Experience({user}) {
    console.log(route('on-board', 'documents'));
    return (
        <OnBoardingLayout activeTill={'experience'} heading={"Awesome! 😉 Let's add your experience"} subHeading={"Please fill in the details of your previous & current work experience"} >
            <div className="card bg-white">
                <div className="card-body">
                    <ExperienceForm user={user} onSuccess={() => { router.visit(route('on-board', 'documents'), {replace: true}) }} submitButtonLabel={<>Next <i className='bx bx-arrow-back bx-rotate-180 align-middle text-lg' ></i></>} />
                </div>
            </div>
        </OnBoardingLayout>
    );
}