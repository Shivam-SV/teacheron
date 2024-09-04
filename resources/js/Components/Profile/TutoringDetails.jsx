import { DateTime } from "luxon";

export default function TutoringDetails({ user }) {
    const UserDetails = [
        { title: 'Email', value: user.email },
        { title: 'Status', value: user.status.ucfirst() },
        { title: 'Phones', value: user.alternate_phone?.join(', ') || <em className="text-neutral/20">No phone added</em> },
        { title: 'Date of Birth', value: user.date_of_birth ? DateTime.fromISO(user.date_of_birth).toLocaleString(DateTime.DATE_MED) : <em className="text-neutral/20">Not Specified</em> },
        { title: 'Price', value: '300-500$/ per hour' },
        { title: 'Experience', value: '2 Years' },
    ];

    return (
        <div className="">
            <div className="card bg-base-100 w-100 border static">
                <div className="card-body">
                    <h2 className="card-title mb-4 text-2xl font-bold">Personal Details</h2>
                    <div className="flex flex-wrap">
                        {UserDetails.map((d, i) => {
                            return (
                                <div key={i} className="p-2 text-sm w-1/2">
                                    <h3 className="font-semibold text-neutral/60">{d.title}</h3>
                                    <p className="m-0 font-bold break-words" style={{whiteSpace:'break-word'}}>{d.value}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* <div className="grid grid-cols-12">
                        <div className="col-span-12 py-2 mb-2">

                        </div> */}

                        {/* <div className="col-span-12 py-2 mb-2">
                            <div className="flex bg-base-100 items-center">
                                <i className="bx bxs-lock-open-alt text-3xl  text-neutral/45"></i>
                                <div className="p-2 px-4 flex-grow">
                                    <h3 className="text-base mb-1">LAST LOGIN</h3>
                                    <p className="m-0 font-semibold">3 hours ago</p>
                                </div>
                            </div>
                        </div>


                        <div className="col-span-12 py-2 mb-2">
                            <div className="flex bg-base-100 items-center">
                                <i className="bx bx-money text-3xl  text-neutral/45"></i>
                                <div className="p-2 px-4 flex-grow">
                                    <h3 className="text-base mb-1">PRICE</h3>
                                    <p className="m-0 font-semibold">300-500$/ per hour</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-12 py-2 mb-2">
                            <div className="flex bg-base-100 items-center">
                                <i className="bx bx-chalkboard text-3xl  text-neutral/45"></i>
                                <div className="p-2 px-4 flex-grow">
                                    <h3 className="text-base mb-1">EXPERIENCE</h3>
                                    <p className="m-0 font-semibold">3 years</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-12 py-2 mb-2">
                            <div className="flex bg-base-100 items-center">
                                <i className="bx bx-bus text-3xl  text-neutral/45"></i>
                                <div className="p-2 px-4 flex-grow">
                                    <h3 className="text-base mb-1">CAN TRAVEL</h3>
                                    <p className="m-0 font-semibold">Yes (By 3 km)</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-12 py-2 mb-2">
                            <div className="flex bg-base-100 items-center">
                                <i className="bx bx-user-pin text-3xl  text-neutral/45"></i>
                                <div className="p-2 px-4 flex-grow">
                                    <h3 className="text-base mb-1">CURRENTLY WORKING</h3>
                                    <p className="m-0 font-semibold">Yes</p>
                                </div>
                            </div>
                        </div> */}

                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}
