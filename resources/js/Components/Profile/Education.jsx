import { useForm } from "@inertiajs/react";
import { useRef } from "react"
import EducationForm from "./Forms/Educations";
import { DateTime } from "luxon";

export default function Education({ user, myprofile }) {
    const formModalRef = useRef(null);

    return (
        <>
            <div className="card bg-base-100 w-100 border static">
                <div className="card-body">
                    <div className="flex items-center mb-3">
                        <h2 className="card-title flex-1 text-2xl font-bold">Education</h2>
                        {!myprofile || <button className="btn btn-sm btn-ghost" onClick={e => formModalRef.current.showModal()}>Update Education</button>}
                    </div>
                    <div className="p-4 md:p-2">
                        <ul className="timeline timeline-vertical timeline-compact">
                            {user?.qualifications?.length > 0 ? user.qualifications.map((q, i) => {
                                return (
                                    <li key={i}>
                                        {i == 0 && <hr />}
                                        <div className="timeline-start">{DateTime.fromISO(q.ended_at).toFormat('LLL yyyy')}</div>
                                        <div className="timeline-middle">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="timeline-end timeline-box">
                                            <h3 className="text-base font-semibold">{q.name}</h3>
                                            <p><em>{q.institute_name}</em> <span className="badge badge-primary">{q.avg_percentage}%</span></p>
                                        </div>
                                        <hr />
                                    </li>
                                );
                            }) : <i className="text-center text-neutral/50">No education details found.</i>}
                        </ul>
                    </div>
                </div>
            </div>

            <dialog id="education-form" className="modal" ref={formModalRef}>
                <div className="modal-box w-11/12 max-w-full">
                    <div className="flex items-center mb-4 gap-2">
                        <h3 className="font-bold flex-1">Update Your Education</h3>
                        <button className="btn btn-sm btn-ghost" onClick={e => formModalRef.current.close()}>✕</button>
                    </div>
                    <EducationForm user={user} onSuccess={() => formModalRef.current.close()} />
                </div>
            </dialog>
        </>
    )
}
