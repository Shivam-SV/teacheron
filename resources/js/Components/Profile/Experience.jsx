export default function Experience({ user }) {
    return (
        <div className="card bg-base-100 w-100 border">
            <div className="card-body">
                <h2 className="card-title mb-3 text-2xl font-bold">Experience</h2>

                <div className="card bg-base-100 rounded-none border-b-2">
                    <div className="card-body px-4 py-4">
                        <h3 className="card-title">Ph.D. in Aerospace Engineering</h3>
                        <p className="m-0">IISc, Bangalore</p>
                        <p className="m-0 text-sm">Feb 2018 - Mar 2022</p>
                        <p className="m-0 text-sm"><span className="font-medium">Scored:</span> 8.2/10</p>
                    </div>
                </div>

                <div className="card bg-base-100 rounded-none border-b-2">
                    <div className="card-body px-4 py-4">
                        <h3 className="card-title">BCA (Computer Science)</h3>
                        <p className="m-0">BBK DAV College</p>
                        <p className="m-0 text-sm">Mar 2018 - Apr 2020</p>
                        <p className="m-0 text-sm"><span className="font-medium">Scored:</span> 8.2/10</p>
                    </div>
                </div>

                <div className="card bg-base-100 rounded-none border-b-2">
                    <div className="card-body px-4 py-4">
                        <h3 className="card-title">Matriculation</h3>
                        <p className="m-0">BBK DAV College</p>
                        <p className="m-0 text-sm">Jun 2018 - Aug 2020</p>
                        <p className="m-0 text-sm"><span className="font-medium">Scored:</span> 8.2/10</p>
                    </div>
                </div>
            </div>
        </div>
    )
}