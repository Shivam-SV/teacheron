import { router } from "@inertiajs/react";
import DocumentsForm from "../../Components/Profile/Forms/Documents";
import OnBoardingLayout from "../../Layouts/OnBoardingLayout";

export default function Documents({user}) {
    return (
        <OnBoardingLayout activeTill={'documents'} heading={"Great! Your have a great experience👌, Now let's add your personal documents"} subHeading={"Don't worry, we only getting your documents to verify your identity, We will keep them secret 🤫"} >
            <div className="card bg-white">
                <div className="card-body">
                    <DocumentsForm user={user} onComplete={() => router.visit(route('on-board', 'summary'))} sumbitButtonLabel={<>Next <i className='bx bx-arrow-back bx-rotate-180 align-middle text-lg' ></i></>} />
                </div>
            </div>
        </OnBoardingLayout>
    )
}