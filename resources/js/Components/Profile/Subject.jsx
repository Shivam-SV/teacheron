export default function Subject({ user }) {
    return (
        <div className="card bg-base-100 w-100 border">
            <div className="card-body">
                <h2 className="card-title mb-3 text-2xl font-bold">Subjects</h2>

                <div className="grid grid-cols-12">
                    <div className="col-span-12 md:col-span-6 py-2">
                        <div className="flex bg-base-100">
                            <img
                                src="https://placehold.co/100x100?text=S"
                                alt="Movie" className="border-1 border-white w-12 h-12" />
                            <div className="p-2 px-4 grow">
                                <h3 className="text-3lg font-bold mb-0">Science</h3>
                                <p className="m-0">Beginners to Intermediate</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 py-2">
                        <div className="flex bg-base-100">
                            <img
                                src="https://placehold.co/100x100?text=S"
                                alt="Movie" className="border-1 border-white w-12 h-12" />
                            <div className="p-2 px-4 grow">
                                <h3 className="text-3lg font-bold mb-0">Mathematics</h3>
                                <p className="m-0">Inremediate to Advance</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 py-2">
                        <div className="flex bg-base-100">
                            <img
                                src="https://placehold.co/100x100?text=S"
                                alt="Movie" className="border-1 border-white w-12 h-12" />
                            <div className="p-2 px-4 grow">
                                <h3 className="text-3lg font-bold mb-0">Science</h3>
                                <p className="m-0">Beginners to Intermediate</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}   