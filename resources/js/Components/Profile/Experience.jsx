export default function Experience({ user }) {
    return (
        <div className="card bg-base-100 w-100 border static">
            <div className="card-body">
                <h2 className="card-title mb-3 text-2xl font-bold">Experience</h2>

                <div className="p-4 md:p-2">
                    <ul className="timeline timeline-vertical timeline-compact">
                        <li>
                            <div className="timeline-start">Mar 2022</div>
                            <div className="timeline-middle">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="timeline-end timeline-box">
                                <h3 className="text-base font-semibold">Ph.D. in Aerospace Engineering</h3>
                                <p><em>IISc, Bangalore</em> <span className="badge badge-primary">78%</span></p>
                            </div>
                            <hr />
                        </li>
                        <li>
                            <hr />
                            <div className="timeline-start">Mar 2022</div>
                            <div className="timeline-middle">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="timeline-end timeline-box">
                                <h3 className="text-base font-semibold">Ph.D. in Aerospace Engineering</h3>
                                <p><em>IISc, Bangalore</em> <span className="badge badge-primary">78%</span></p>
                            </div>
                            <hr />
                        </li>
                        <li>
                            <hr />
                            <div className="timeline-start">Mar 2022</div>
                            <div className="timeline-middle">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="timeline-end timeline-box">
                                <h3 className="text-base font-semibold">Ph.D. in Aerospace Engineering</h3>
                                <p><em>IISc, Bangalore</em> <span className="badge badge-primary">78%</span></p>
                            </div><hr />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
