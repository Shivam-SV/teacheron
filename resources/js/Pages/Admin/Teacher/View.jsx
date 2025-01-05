import { useRef } from "react";
import Coin from "../../../Components/Elements/Coin";
import ModalClose from "../../../Components/Elements/ModalClose";
import Table from "../../../Components/Partials/Table";
import Layout from "../../../Layouts/AdminLayout";
import ChangePrice from "../../../Components/Admin/Teacher/ChangePrice";
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { avatarImage, reloadPageData } from "../../../_utils/commons";
import { DateTime } from "luxon";
import { router } from "@inertiajs/react";
import { toast } from "react-toastify";

export default function ViewTeacher({ teacher, payments }) {    
    const accountStatus = {
        deactive: <span className="flex items-center"><span className="bg-red-500 mr-2 h-2 w-2 rounded-full flex justify-center items-center"></span> <span>Deactivated</span></span>,
        active: <span className="flex items-center"><span className="bg-green-500 mr-2 h-2 w-2 rounded-full flex justify-center items-center"></span> <span>Active</span></span>,
        suspended: <span className="flex items-center"><span className="bg-yellow-500 mr-2 h-2 w-2 rounded-full flex justify-center items-center"></span> <span>Suspended</span></span>,
        banned: <span className="flex items-center"><span className="bg-red-500 mr-2 h-2 w-2 rounded-full flex justify-center items-center"></span> <span>Banned</span></span>,
    }
    const ChnagePriceModalRef = useRef(null);

    const verifyDocumentStatus = (documentId, status) => {
        router.post(route('supadmin.teacher.verify-document', [btoa(teacher.id)]), { document_id: documentId, document_status: status }, {
            onSuccess: (res) => {
                reloadPageData(['teacher']);
            }
        })
    }

    return (
        <Layout title={teacher.name}>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-4">
                    <div className="card bg-base-100 mb-4">
                        <div className="card-body">
                            <h1 className="card-title mb-4">{teacher.name}</h1>
                            <ul>
                                <li className="flex justify-between p-2">
                                    <span className="text-neutral/50">Gender</span>
                                    <span className={teacher.gender === "Male" ? "text-primary" : (teacher.gender === "Female" ? "text-secondary" : 'italic text-neutral/50 text-sm')}>{teacher.gender.ucfirst()}</span>
                                </li>
                                <li className="flex justify-between p-2">
                                    <span className="text-neutral/50 tooltip" data-tip="Date of Birth">DOB</span>
                                    <span>{teacher?.date_of_birth ? new Date(teacher.date_of_birth).toLocaleDateString() : <i className="text-neutral/50 text-sm">Not available</i>}</span>
                                </li>
                                <li className="flex justify-between p-2">
                                    <span className="text-neutral/50">Account Status</span>
                                    <span>{accountStatus[teacher.status]}</span>
                                </li>
                                <li className="flex justify-between p-2">
                                    <span className="text-neutral/50">Email</span>
                                    <span>{teacher.email}</span>
                                </li>
                                <li className="flex justify-between p-2">
                                    <span className="text-neutral/50">Email Verified</span>
                                    <span>{teacher.email_verified_at ? <i>{new Date(teacher.email_verified_at).toLocaleDateString()}</i> : <i className="text-neutral/50 text-sm">Not verified</i>}</span>
                                </li>
                                <li className="flex justify-between p-2">
                                    <span className="text-neutral/50">Price</span>
                                    <span>
                                        {teacher?.user_price ?
                                            <><Coin price={teacher.user_price.price} /> <span className="tooltip" data-tip="Change Price" ><button className="btn btn-sm btn-ghost" onClick={() => ChnagePriceModalRef.current.showModal()}><i className="bx bx-edit text-lg"></i></button></span></> :
                                            <span className="italic text-neutral/40">No price <button className="btn btn-sm btn-ghost" onClick={() => ChnagePriceModalRef.current.showModal()}><i className="bx bx-plus text-lg"></i> Price</button></span>
                                        }
                                    </span>
                                </li>
                                <li className="p-2">
                                    <span className="text-neutral/50">Summary</span>
                                    <p className="text-base">{teacher.bio}</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="card bg-base-100 mb-4">
                        <div className="card-body">
                            <h1 className="card-title mb-4">Documents</h1>
                            {teacher?.documents?.length > 0 ? teacher.documents.map((document, index) => {
                                return (
                                    <div className="card card-compact bg-base-100 shadow-sm" key={index}>
                                        <div className="card-body">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h2 className="card-title">{document.document_type.name}</h2>
                                                    <p className="text-sm text-neutral/50">{document.status.ucfirst()}</p>
                                                </div>
                                                <div>
                                                    { (!['verified', 'rejected'].includes(document.status)) ? (
                                                        <>
                                                            <button className="btn btn-sm btn-ghost" onClick={() => verifyDocumentStatus(document.id, 'verified')}><i className="bx bx-check text-lg text-green-500"></i> Approve</button>
                                                            <button className="btn btn-sm btn-ghost" onClick={() => verifyDocumentStatus(document.id, 'rejected')}><i className="bx bx-x text-lg text-red-500"></i> Reject</button>
                                                        </>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="p-2 mt-2">
                                                <LightGallery plugins={[lgThumbnail, lgZoom]} elementClassNames="flex items-center gap-2 overflow-x-auto w-full">
                                                    {
                                                        document?.document_files?.length > 0? document.document_files.map((file, i) => {
                                                            return <a href={file.mediaLink} key={index + i}>
                                                                <img src={file.mediaLink} alt={file.name} className="max-w-40 max-h-40 rounded-lg object-cover"  />
                                                            </a>
                                                        }) : <p className="text-center text-base-content italic">No document uploaded.</p>
                                                    }
                                                </LightGallery>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }) : <p className="text-center text-base-content italic">No documents uploaded yet.</p>}
                        </div>
                    </div>
                </div>
                <div className="col-span-8">
                    <div className="card bg-base-100 mb-4">
                        <div className="card-body">
                            <h1 className="card-title mb-4">Payments</h1>
                            <Table resource={payments} />
                        </div>
                    </div>

                    <div className="card bg-base-100 mb-4">
                        <div className="card-body">
                            <h1 className="card-title mb-4">Subjects</h1>
                            <div className="flex flex-wrap items-center gap-2">
                                {
                                    teacher?.user_subjects?.length > 0 ? teacher?.user_subjects?.map(us => {
                                        return <div key={us.id} className="bg-primary rounded-full text-sm text-primary-content flex items-center py-1 px-2">
                                        <img src={avatarImage(us.subject.name, 'random', 24)} className="rounded-full mr-1" alt="" />
                                        <span className="mr-1">Python</span>
                                    </div>
                                    }) : <em className="text-neutral/50">No Subject Added</em>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-6">
                            <div className="card bg-base-100 mb-4">
                                <div className="card-body">
                                    <h2 className="card-title">Educations</h2>
                                    <ul className="timeline timeline-vertical timeline-compact">
                                        {teacher?.qualifications?.length > 0 ? teacher.qualifications.map((q, i) => {
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
                        <div className="col-span-6">
                            <div className="card bg-base-100 mb-4">
                                <div className="card-body">
                                    <h2 className="card-title">Experiences</h2>
                                    <ul className="timeline timeline-vertical timeline-compact">
                                        {teacher?.user_experience?.length > 0 ? teacher.user_experience.map((exp, i) => {
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
                    </div>
                </div>
            </div>


            <dialog ref={ChnagePriceModalRef} className="modal">
                <div className="modal-box p-4">
                    <ModalClose onPress={() => ChnagePriceModalRef.current.close()} />
                    <div className="pt-4">
                        <ChangePrice userId={teacher.id} currentPrice={teacher.user_price.price || null} onComplete={() => {ChnagePriceModalRef.current.close(); reloadPageData(['teacher'])}} onCancel={() => ChnagePriceModalRef.current.close()} />
                    </div>
                </div>
            </dialog>
        </Layout>
    );
}
