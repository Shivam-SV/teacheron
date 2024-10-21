import { useRef } from "react";
import ExperienceForm from "./Forms/Experiences";

export default function Experience({ user, myProfile }) {
    const formModalRef = useRef(null);
    console.log(user);

    return (
        <>
            <div className="card bg-base-100 w-100 border static">
                <div className="card-body">
                    <div className="flex items-center mb-3">
                        <h2 className="card-title text-2xl font-bold flex-1">Experience</h2>
                        {!myProfile || <button className="btn btn-ghost btn-sm" onClick={e => formModalRef.current.showModal()} >Update Experience</button>}
                    </div>

                    <div className="p-4 md:p-2">
                        <ul className="timeline timeline-vertical timeline-compact">
                            <li>
                                <div className="timeline-start">Mar 2022</div>
                                <div className="timeline-middle">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="timeline-end timeline-box">
                                    <h3 className="text-base font-semibold">Ph.D. in Aerospace Engineering</h3>
                                    <p><em>IISc, Bangalore</em> <span className="badge badge-primary">78%</span></p>
                                </div>
                                <hr />
                            </li>
                            <li>
                                <hr />
                                <div className="timeline-start">Mar 2022</div>
                                <div className="timeline-middle">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="timeline-end timeline-box">
                                    <h3 className="text-base font-semibold">Ph.D. in Aerospace Engineering</h3>
                                    <p><em>IISc, Bangalore</em> <span className="badge badge-primary">78%</span></p>
                                </div>
                                <hr />
                            </li>
                            <li>
                                <hr />
                                <div className="timeline-start">Mar 2022</div>
                                <div className="timeline-middle">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="timeline-end timeline-box">
                                    <h3 className="text-base font-semibold">Ph.D. in Aerospace Engineering</h3>
                                    <p><em>IISc, Bangalore</em> <span className="badge badge-primary">78%</span></p>
                                </div><hr />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <dialog id="experience-form" className="modal" ref={formModalRef}>
                <div className="modal-box w-11/12 max-w-full">
                    <div className="flex items-center mb-4 gap-2">
                        <h3 className="font-bold flex-1">Update Your Experience</h3>
                        <button className="btn btn-sm btn-ghost" onClick={e => formModalRef.current.close()}>✕</button>
                    </div>
                    <ExperienceForm user={user} onSuccess={() => formModalRef.current.close()} />
                </div>
            </dialog>
        </>
    )
}
