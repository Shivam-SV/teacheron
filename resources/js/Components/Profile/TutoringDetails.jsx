export default function TutoringDetails({ user }) {
    return (
        <div className="px-5">
            <div className="card bg-base-100 w-100 border">
                <div className="card-body">
                    <h2 className="card-title mb-3 text-2xl font-bold">Additional Details</h2>

                    <div className="grid grid-cols-12">
                        <div className="col-span-12 py-2 mb-2">
                            <div className="flex bg-base-100 items-center">
                                <i className="bx bx-envelope text-3xl text-neutral/45"></i>
                                <div className="p-2 px-4 grow">
                                    <h3 className="text-base mb-1">EMAIL</h3>
                                    <p className="m-0 font-semibold">mjnmansi@demo.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-12 py-2 mb-2">
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
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}