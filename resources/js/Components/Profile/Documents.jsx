import { useRef } from "react";
import DocumentsForm from "./Forms/Documents";
import ModalClose from "../Elements/ModalClose";
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

export default function Documents({ user, myprofile }) {
    const formModalRef = useRef(null);
    return (
        <>
            <div className="card bg-base-100 w-100 border static">
                <div className="card-body">
                    <div className="flex items-center mb-3">
                        <h2 className="card-title text-2xl font-bold flex-1">Personal Documents</h2>
                        {!myprofile || <button className="btn btn-ghost btn-sm" onClick={e => formModalRef.current.showModal()} >Upload Document</button>}
                    </div>

                    <div className="p-4 md:p-2">
                        {user?.documents?.length > 0 ? user.documents.map((document, index) => {
                            return (
                                <div className="card card-compact bg-base-100 shadow-md" key={index}>
                                    <div className="card-body">
                                        <div>
                                            <h2 className="card-title">{document.document_type.name}</h2>
                                            <p className="text-sm text-neutral/50">{document.status.ucfirst()}</p>
                                        </div>
                                        <div className="p-2 mt-2 flex items-center gap-2 overflow-x-auto w-full">
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

            <dialog id="uploadDocumentModal" ref={formModalRef} className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <div className="mb-4">
                        <h4 className="text-xl">Upload Document</h4>
                        <small>Max file upload size: 2MB</small>
                    </div>
                    <ModalClose onPress={() => formModalRef.current.close()} />
                    <DocumentsForm user={user} myprofile={myprofile} onComplete={() => formModalRef.current.close()} />
                </div>
            </dialog>
        </>
    )
}
