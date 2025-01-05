import { useRef } from "react"
import SubjectsForm from "./Forms/Subjects";
import { avatarImage } from "../../_utils/commons";
import ModalClose from "../Elements/ModalClose";

export default function Subject({ user, myprofile }) {
    const editmodalRef = useRef(null);
    return (
        <>
            <div className="card bg-base-100 w-100 border static">
            <div className="card-body">
                <div className="flex items-center mb-3">
                    <h2 className="card-title text-2xl m-0 font-bold grow">Subjects</h2>
                    {myprofile && <button className="btn btn-ghost btn-sm" onClick={() => editmodalRef.current.showModal()} >Edit Subjects</button>}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    {
                        user?.user_subjects?.length > 0 ? user?.user_subjects?.map(us => {
                            return <div key={us.id} className="bg-primary rounded-full text-sm text-primary-content flex items-center py-1 px-2">
                            <img src={avatarImage(us.subject.name, 'random', 24)} className="rounded-full mr-1" alt="" />
                            <span className="mr-1">Python</span>
                        </div>
                        }) : <em className="text-neutral/50">No Subject Added</em>
                    }
                </div>
            </div>
        </div>
        <dialog className="modal" ref={editmodalRef}>
            <div className="modal-box w-3/5 max-w-6xl">
                <ModalClose onPress={() => editmodalRef.current.close()} />
                <div className="flex items-center mb-4">
                    <h3 className="text-lg font-medium grow">Update Subjects</h3>
                </div>
                <SubjectsForm user={user} onSubmit={() => editmodalRef.current.close()} />
            </div>
        </dialog>
        </>
    )
}
