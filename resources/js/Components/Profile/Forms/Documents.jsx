import { useForm, usePage } from "@inertiajs/react";
import { formHandler } from "../../../_utils/commons";

export default function DocumentsForm({user, onComplete, sumbitButtonLabel}) {
    const documentTypes = usePage().props.documentTypes;
    const defaultValues = {user_id : user.id, document_type_id: "", document_files: []};
    const {data, setData, errors, processing, post, reset} = useForm({
        document: user?.user_documents?.length > 0 ? [... user.user_documents] :  [{...defaultValues}]
    });

    const updateForm = (key, index, value) => {
        let obj = data.document;
        obj[index][key] = value;
        setData('document', obj);
    }

    const AddAnotherDocument = () => {
        setData('document', [...data.document, {...defaultValues}])
    }
    return (
        <>
            <form action={ route('profile.update-documents', btoa(user.id)) } method="post" encType="multipart/form-data" onSubmit={ formHandler(post, () => {reset(); onComplete()}) }>
                {data.document.map((document, index) => (
                    <div className="grid grid-cols-12 gap-4 mb-3" key={index}>
                        <div className="col-span-6">
                            {index === 0 && <label className="label">Document Type</label>}
                            <select name="document_type" id="document_type" className="select select-bordered w-full" onChange={e => updateForm('document_type_id', index, e.target.value)}>
                                <option value="">Select Document Type</option>
                                {documentTypes?.length > 0 && documentTypes.map((documentType, i) => {
                                    return <option key={i} value={documentType.id}>{documentType.name}</option>
                                })};
                            </select>
                            {errors && errors[`document.${index}.document_type_id`] && <span className="text-red-500 text-xs italic">{errors[`document.${index}.document_type_id`].join(', ').replace(`document.${index}.document_type_id`, 'Document Type')}</span>}
                        </div>
                        <div className="col-span-6">
                            {index === 0 && <label className="label">Document File</label>}
                            <input type="file" accept=".pdf,.jpg,.jpeg,.png" onInput={e => updateForm('document_files', index, e.target.files)} aria-label="Upload Document" max="3" multiple className="file-input w-full input-bordered" />
                            {errors && Object.keys(errors)?.filter(key => key.includes(`document.${index}.document_files`)) && <span className="text-red-500 text-xs italic">{ Object.keys(errors)?.filter(key => key.includes(`document.${index}.document_files`)).map(key => errors[key]).join(', ').replace(`document.${index}.document_files`, 'Document File') }</span>}
                        </div>
                    </div>
                ))}
                <div className="modal-action">
                    <button type="button" className="btn btn-ghost text-primary" onClick={AddAnotherDocument}><i className="bx bx-plus text-lg"></i> Add Document</button>
                    <button type="submit" className="btn btn-primary" disabled={processing}>{processing? <i className="bx bx-loader-alt bx-spin text-lg mr-2"></i> : ''} {sumbitButtonLabel || <><i className="bx bx-save text-lg"></i> Save</>}</button>
                </div>
            </form>
        </>
    )
}