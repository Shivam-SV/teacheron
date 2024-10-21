import Table from "../../../Components/Partials/Table";
import Layout from "../../../Layouts/AdminLayout";

export default function ViewTeacher({ teacher, payments }) {
    const accountStatus = {
        deactive: <span className="flex items-center"><span className="bg-red-500 mr-2 h-2 w-2 rounded-full flex justify-center items-center"></span> <span>Deactivated</span></span>,
        active: <span className="flex items-center"><span className="bg-green-500 mr-2 h-2 w-2 rounded-full flex justify-center items-center"></span> <span>Active</span></span>,
        suspended: <span className="flex items-center"><span className="bg-yellow-500 mr-2 h-2 w-2 rounded-full flex justify-center items-center"></span> <span>Suspended</span></span>,
        banned: <span className="flex items-center"><span className="bg-red-500 mr-2 h-2 w-2 rounded-full flex justify-center items-center"></span> <span>Banned</span></span>,
    }
    return (
        <Layout title={teacher.name}>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-4">
                    <div className="card bg-base-100">
                        <div className="card-body">
                            <h1 className="card-title mb-4">{teacher.name}</h1>
                            <ul>
                                <li className="flex justify-between p-2">
                                    <span className="text-neutral/50">Gender</span>
                                    <span className={teacher.gender === "Male"? "text-primary" : ( teacher.gender === "Female" ? "text-secondary" : 'italic text-neutral/50 text-sm' )}>{teacher.gender.ucfirst()}</span>
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
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-span-8">
                    <div className="card bg-base-100">
                        <div className="card-body">
                            <h1 className="card-title mb-4">Payments</h1>
                            <Table resource={payments} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
