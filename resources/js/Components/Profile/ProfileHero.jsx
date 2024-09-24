import { Link } from "@inertiajs/react";
import {placeholderImage} from '../../_utils/commons';

export default function ProfileHero({ user, myprofile }) {
    console.log(user);
    return (
        <div>
            <div className="cover-pic">
                <img src={placeholderImage('1500x300', 'Your Cover Image')} alt="profile Pic" className="w-full object-contain shadow-inner rounded-lg" />
            </div>
            <div className="p-2">
                <div className="flex flex-wrap mb-2">
                    <img src={user?.profile?.mediaLink ?? placeholderImage('100x100', user.name)} alt="profile" className="lg:-mt-14 lg:ml-10 md:-mt-10 md:ml-7 -mt-7 ml-5 shadow-md rounded-full border-4 border-white lg:w-40 lg:h-40 md:w-28 md:h-28 w-20 h-20 mr-4" />
                    <div className="p-2 px-4 grow">
                        <h2 className="text-3xl font-bold mb-1">{user.name}</h2>
                        <p className="mb-4">{user.roles?.map(r => r.name.ucfirst()).join(', ') || <em className="text-neutral/60">No specification</em>},</p>
                        <div className="flex flex-wrap gap-2">
                            <address>{user.address || <span className="text-neutral/50">No location Added</span>}</address>
                        </div>
                    </div>
                    {myprofile && <div className="p-6">
                        <Link href={route('profile.edit-basic', btoa(user.id))} className="btn btn-outline btn-sm btn-primary" title="Edit Basic"><i className='bx bx-edit-alt'></i> <span className="sm:inline hidden">Edit Basic</span></Link>
                    </div>}
                </div>
            </div>
        </div>
    );
}
