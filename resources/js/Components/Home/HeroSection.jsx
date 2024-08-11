export default function HeroSection(){
    return (
        <section className="bg-secondary/10">
            <div className="container mx-auto lg:p-16 md:p-10 p-4">
                <h1 className="my-6 text-center font-extrabold text-6xl">There are lots of oppotunities for you</h1>
                <div className="card bg-base-100 xl:mx-14 mb-4">
                    <div className="card-body">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="form-control md:col-span-5 sm:col-span-6 col-span-12">
                                <label className="input input-bordered flex items-center gap-2">
                                    <i className='bx bx-briefcase text-lg' ></i>
                                    <input type="text" className="grow" placeholder="Job title" />
                                </label>
                            </div>
                            <div className="form-control md:col-span-5 sm:col-span-6 col-span-12">
                                <label className="input input-bordered flex items-center gap-2">
                                <i className='bx bx-current-location text-lg'></i>
                                    <input type="text" className="grow" placeholder="location" />
                                </label>
                            </div>
                            <div className="md:col-span-2 col-span-12">
                                <button className="btn btn-primary lg:text-lg w-full">Find now</button>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-center text-lg">
                    <strong>Popular searches</strong> JAVA, web development, Machine learning
                </p>
            </div>
        </section>
    );
}
