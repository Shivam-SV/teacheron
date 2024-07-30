import { useRef } from "react"
import SubjectsForm from "./Forms/Subjects";

export default function Subject({ user }) {
    const editmodalRef = useRef(null);
    return (
        <>
            <div className="card bg-base-100 w-100 border">
            <div className="card-body">
                <div className="flex items-center mb-3">
                    <h2 className="card-title text-2xl m-0 font-bold grow">Subjects</h2>
                    <button className="btn btn-ghost btn-sm" onClick={() => editmodalRef.current.showModal()} >Edit Subjects</button>
                </div>

                <div className="grid grid-cols-12">
                    {user?.subjects?.length > 0 ? user.subjects.map() : <></>}
                    <div className="col-span-12 md:col-span-6 py-2">
                        <div className="flex bg-base-100 items-center">
                            <img
                                src="https://placehold.co/100x100?text=S"
                                alt="Movie" className="border-1 rounded-full border-white w-12 h-12" />
                            <div className="p-2 px-4 grow">
                                <h3 className="text-3lg font-bold mb-0">Science</h3>
                                <p>Beginners to Intermediate</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 py-2">
                        <div className="flex bg-base-100 items-center">
                            <img
                                src="https://placehold.co/100x100?text=M"
                                alt="Movie" className="border-1 rounded-full border-white w-12 h-12" />
                            <div className="p-2 px-4 grow">
                                <h3 className="text-3lg font-bold mb-0">Mathematics</h3>
                                <p>Inremediate to Advance</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 py-2">
                        <div className="flex bg-base-100 items-center">
                            <img
                                src="https://placehold.co/100x100?text=S"
                                alt="Movie" className="border-1 rounded-full border-white w-12 h-12" />
                            <div className="p-2 px-4 grow">
                                <h3 className="text-3lg font-bold mb-0">Science</h3>
                                <p>Beginners to Intermediate</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <dialog className="modal" ref={editmodalRef}>
            <div className="modal-box w-3/5 max-w-6xl">
                <div className="flex items-center mb-4">
                    <h3 className="text-lg font-medium grow">Update Subjects</h3>
                    <button className="btn btn-ghost rounded-full" onClick={() => editmodalRef.current.close()}>✕</button>
                </div>
                <SubjectsForm user={user} onSubmit={() => editmodalRef.current.close()} />
            </div>
        </dialog>
        </>
    )
}
