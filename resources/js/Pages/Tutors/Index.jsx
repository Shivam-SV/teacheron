import { Link } from "@inertiajs/react";
import Tutor from "../../Components/Tutors/Tutor";
import Layout from "../../Layouts/AppLayout";

export default function Tutors({tutors}){
    console.log(tutors);
    return (
        <Layout>
            <div className="container mx-auto my-8 p-4">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-neutral/70">Latest Jobs</h2>
                        <p className="text-sm text-neutral/40 italic">{tutors?.total} {'job'.pluralize(tutors?.total)} for you</p>
                    </div>
                    <div>
                        <div className="flex items-center">
                            <Link href={tutors?.prev_page_url || '#'} className="px-1 rounded-full hover:bg-neutral/10 disabled:text-neutral/10 disabled:hover:bg-transparent disabled:cursor-not-allowed" as="button" disabled={tutors?.prev_page_url === null} ><i className='bx bx-chevron-left bx-md'></i></Link>
                            <Link href={tutors?.next_page_url || '#'} className="px-1 rounded-full hover:bg-neutral/10 disabled:text-neutral/10 disabled:hover:bg-transparent disabled:cursor-not-allowed" as="button" disabled={tutors?.next_page_url === null} ><i className='bx bx-chevron-right bx-md'></i></Link>
                        </div>
                        <p className="text-sm text-neutral/40 italic">{tutors?.per_page} on page</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 my-6 mx-10">
                    {tutors?.data?.length > 0 && tutors?.data?.map(t => <Tutor tutor={t} key={t.id} />)}
                </div>
            </div>
        </Layout>
    );
}
