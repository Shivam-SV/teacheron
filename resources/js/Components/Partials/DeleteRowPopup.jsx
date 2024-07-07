export default function DeleteRowPopup({title, message, popupRef, confirmCallback}){
    return (
        <dialog className="modal" role="alert" ref={popupRef}>
            <div className="modal-box">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => popupRef.current.close()}>✕</button>
                <div className="flex">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-error bg-error/10 rounded-lg">
                        <i className='bx bx-trash-alt text-lg leading-none' ></i>
                    </div>
                    <div className="ms-3">
                        <div className="mb-4">
                            <h4 className="mb-1 text-md font-semibold">{title ?? 'Are you sure?'}</h4>
                            <div className="mb-2 text-sm font-normal text-neutral/75">{message ?? "Removing this may not be recovered in the future."}</div>
                        </div>
                        <div className="flex gap-2">
                            <button className="btn btn-primary btn-sm" onClick={confirmCallback}>Delete</button>
                            <button className="btn btn-ghost btn-sm" onClick={() => popupRef.current.close()}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    )
}
