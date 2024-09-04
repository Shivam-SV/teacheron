import { Link } from "@inertiajs/react";
import { avatarImage } from "../../Helpers/appHelper";
import Ratings from "../Elements/Ratings";

export default function Tutor({tutor}){
    return (
        <Link className="w-[20rem] rounded-xl border-neutral/70 shadow p-4" href={route('tutor', btoa(tutor.id))}>
            <div className="flex items-center mb-2">
                {tutor?.profile?.mediaLink ? <img src={tutor?.profile?.mediaLink} className="w-[64px] h-[64px] rounded-full" /> : <img src={avatarImage(tutor.name, 'random', 64)} alt={tutor.name} className="rounded-full mr-2" />}
                <div className="grow">
                    <h2 className="text-lg font-extrabold">{tutor.name}</h2>
                    <Ratings value={3.5} />
                </div>
                <button className="tooltip" data-tip="Wishlist"><i className='bx bx-bookmark text-lg' ></i></button>
            </div>
            <div className="flex flex-wrap p-2">
                {
                    tutor?.user_subjects?.length > 0 && tutor?.user_subjects?.map(us => {
                        return <div key={us.subject.id} className="bg-base-200 rounded-full text-xs font-medium flex items-center py-1 px-2">
                            <span>{us.subject.name}</span>
                        </div>
                    })
                }
            </div>
            <div>
                {tutor?.bio ? <p>{tutor.bio.limit(150)}</p> :  <em className="text-neutral/40">No information provided</em>}
            </div>
        </Link>
    );
}
