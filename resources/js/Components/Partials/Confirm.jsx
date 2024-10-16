export default function Confirm({title, message, popupRef, onConfirm, onCancel, type, iconClass, confirmButtonText, cancelButtontext}){
    const typos = [
        {type: 'primary', icon: 'bx-check', defaultMessage: "Are you sure you want to confirm this?", defaultTitle: 'Are you sure?', color: {text: 'text-primary', bg: 'bg-primary-content'}, confirmButtonText: 'Yes, confirm', cancelButtontext: 'No, cancel'},
        {type: 'secondary', icon: 'bx-check', defaultMessage: "Are you sure you want to confirm this?", defaultTitle: 'Are you sure?', color: {text: 'text-secondary', bg: 'bg-secondary-content'}, confirmButtonText: 'Yes, confirm', cancelButtontext: 'No, cancel'},
        {type: 'accent', icon: 'bx-check', defaultMessage: "Are you sure you want to confirm this?", defaultTitle: 'Are you sure?', color: {text: 'text-accent', bg: 'bg-accent-content'}, confirmButtonText: 'Yes, confirm', cancelButtontext: 'No, cancel'},
        {type: 'confirm', icon: 'bx-question-mark', defaultMessage: "Are you sure you want to confirm this?", defaultTitle: 'Are you sure?', color: {text: 'text-primary', bg: 'bg-primary-content'}, confirmButtonText: 'Yes, confirm', cancelButtontext: 'No, cancel'},
        {type: 'warning', icon: 'bx-warning', defaultMessage: "Are you sure you want to proceed with this action?", defaultTitle: 'Are you sure?', color: {text: 'text-warning', bg: 'bg-warning-content'}, confirmButtonText: 'Yes, confirm', cancelButtontext: 'No, cancel'},
        {type: 'info', icon: 'bx-info-circle', defaultMessage: "Are you sure you want to proceed with this action?", defaultTitle: 'Are you sure?', color: {text: 'text-info', bg: 'bg-info-content'}, confirmButtonText: 'Yes, confirm', cancelButtontext: 'No, cancel'},
        {type: 'error', icon: 'bx-x', defaultMessage: "Are you sure you want to proceed with this action?", defaultTitle: 'Are you sure?', color: {text: 'text-error', bg: 'bg-error-content'}, confirmButtonText: 'Yes, confirm', cancelButtontext: 'No, cancel'},
    ];
    let typo = typos.find(t => t.type === type);
    typo.icon = iconClass ?? typo.icon;
    typo.defaultMessage = message ?? typo.defaultMessage;
    typo.defaultTitle = title ?? typo.defaultTitle;
    typo.color = typo.color ?? {text: 'text-primary', bg: 'bg-primary-content'};
    typo.confirmButtonText = confirmButtonText ?? typo.confirmButtonText;
    typo.cancelButtontext = cancelButtontext ?? typo.cancelButtontext;

    return (
        <dialog className="modal" role="alert" ref={popupRef}>
            <div className="modal-box">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => popupRef.current.close()}>✕</button>
                <div className="flex">
                    <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${typo.color.text} ${typo.color.bg} rounded-lg`}>
                        <i className={`bx ${typo.icon} text-lg leading-none`} ></i>
                    </div>
                    <div className="ms-3">
                        <div className="mb-4">
                            <h4 className="mb-1 text-md font-semibold">{typo.defaultTitle}</h4>
                            <div className="mb-2 text-sm font-normal text-neutral/75" dangerouslySetInnerHTML={{__html: typo.defaultMessage}}></div>
                        </div>
                        <div className="flex gap-2">
                            <button className="btn btn-primary btn-sm" onClick={onConfirm}>{typo.confirmButtonText}</button>
                            <button className="btn btn-ghost btn-sm" onClick={() => {popupRef.current.close(); onCancel && onCancel()}}>{typo.cancelButtontext}</button>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    )
}
