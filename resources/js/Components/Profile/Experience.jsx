import { useRef } from "react";
import ExperienceForm from "./Forms/Experiences";
import { DateTime } from "luxon";
import ModalClose from "../Elements/ModalClose";

export default function Experience({ user, myprofile }) {
    const formModalRef = useRef(null);
    return (
        <>
            <div className="card bg-base-100 w-100 border static">
                <div className="card-body">
                    <div className="flex items-center mb-3">
                        <h2 className="card-title text-2xl font-bold flex-1">Experience</h2>
                        {!myprofile || <button className="btn btn-ghost btn-sm" onClick={e => formModalRef.current.showModal()} >Update Experience</button>}
                    </div>

                    <div className="p-4 md:p-2">
                        <ul className="timeline timeline-vertical timeline-compact">
                            {user?.user_experience?.length > 0 ? user.user_experience.map((exp, i) => {
                                return (
                                    <li key={i}>
                                        {i == 0 && <hr />}
                                        <div className="timeline-start">{exp.ended_at ? DateTime.fromISO(exp.ended_at).toFormat('LLL yyyy') : <em className="text-neutral/60">Present</em>}</div>
                                        <div className="timeline-middle">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="timeline-end timeline-box">
                                            <h3 className="text-base font-semibold">{exp.designation}</h3>
                                            <p className="italic">{exp.organisation_name}</p>
                                        </div>
                                        <hr />
                                    </li>
                                )
                            }) : <p className="text-center italic text-neutral/60">No Experience Yet</p>}
                        </ul>
                    </div>
                </div>
            </div>

            <dialog id="experience-form" className="modal" ref={formModalRef}>
                <div className="modal-box w-11/12 max-w-full">
                    <ModalClose onPress={e => formModalRef.current.close()} />
                    <div className="flex items-center mb-4 gap-2">
                        <h3 className="font-bold flex-1">Update Your Experience</h3>
                    </div>
                    <ExperienceForm user={user} onSuccess={() => formModalRef.current.close()} />
                </div>
            </dialog>
        </>
    )
}
