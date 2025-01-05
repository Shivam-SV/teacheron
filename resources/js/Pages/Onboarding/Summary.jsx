import { useEffect, useState } from "react";
import BasicForm from "../../Components/Profile/Forms/Basic";
import SubjectsForm from "../../Components/Profile/Forms/Subjects";
import OnBoardingLayout from "../../Layouts/OnBoardingLayout";
import { router } from "@inertiajs/react";

export default function Summary({user}) {
    const [isBasicCompleted, setIsBasicCompleted] = useState(false);
    const [isSubjectsCompleted, setIsSubjectsCompleted] = useState(false);

    useEffect(() => {
        if(isBasicCompleted && isSubjectsCompleted) router.visit(route('on-board', 'completed'))
    }, [isBasicCompleted, isSubjectsCompleted])

    return (
        <OnBoardingLayout activeTill={'Summary'} heading={"Just a last step and you are ready to go!"} subHeading={"Provide some minor details about yourself and you are good to go!"} >
            <div className="card bg-white">
                <div className="card-body">
                    {!isBasicCompleted && <div className="mb-6">
                        <BasicForm user={user} hideContacts={true} onComplete={() => {setIsBasicCompleted(true)}} />
                    </div>}
                    {(!isBasicCompleted && !isSubjectsCompleted) && <hr className="my-6" />}
                    {!isSubjectsCompleted && <div className="mb-6">
                        <SubjectsForm user={user} onSubmit={() => {setIsSubjectsCompleted(true)}} />
                    </div>}
                </div>
            </div>
        </OnBoardingLayout>
    );
}