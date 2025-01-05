import { router } from "@inertiajs/react";
import EducationForm from "../../Components/Profile/Forms/Educations";
import OnBoardingLayout from "../../Layouts/OnBoardingLayout";

export default function Education({user}) {

    return (
        <OnBoardingLayout activeTill="education" heading={"Let's start your journey with us😊, Heads on with your education"} subHeading={"Provide your educational details from highest to lowest degree."} >
            <div className="card bg-white">
                <div className="card-body">
                    <EducationForm user={user} onSuccess={() => { router.visit(route('on-board', 'experience'), {replace: true}) }} submitButtonLabel={<>Next <i className='bx bx-arrow-back bx-rotate-180 align-middle text-lg' ></i></>}  />
                </div>
            </div>
        </OnBoardingLayout>
    )
}