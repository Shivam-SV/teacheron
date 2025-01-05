import { Link, router } from "@inertiajs/react";
import {csrfToken, placeholderImage, reloadPageData} from '../../_utils/commons';
import Coin from "../Elements/Coin";
import { toast } from "react-toastify";

export default function ProfileHero({ user, myprofile, buyable }) {
    const updateProfilePic = (e) => {
        const file = e.target.files[0];

        router.post(route('profile.update-profile-picture', btoa(user.id)), {profile: file}, {
            forceFormData: true,
            headers: {
                'X-CSRF-TOKEN': csrfToken()
            },
            onSuccess: () => {
                reloadPageData(['user']);
            },
            onError: res => {
                if(res.profile){
                    res.profile.forEach(e => {
                        toast.error(e);
                    })   
                }
            }
        })
    }
    return (
        <div>
            <div className="cover-pic">
                <div className="relative">
                    <img src={placeholderImage('1500x300', user.name + '\'s Timeline')} alt="Timeline Pic" className="w-full object-contain shadow-inner rounded-lg" />
                    {myprofile && <div className="absolute top-4 right-4">
                        <span className="tooltip" data-tip="Edit Timeline Picture, Max should be 1500x300, Max Size 8MB, Ratio 5:1">
                            <label htmlFor="timeline" className="btn btn-sm btn-circle bg-white shadow-md">
                                <i className='bx bx-pencil text-primary text-lg'></i>
                                <input type="file" name="timeline" id="timeline" className="hidden" />
                            </label>
                        </span>
                    </div>}
                </div>
            </div>
            <div className="p-2">
                <div className="flex flex-wrap mb-2">
                    <div className="lg:-mt-14 lg:ml-10 md:-mt-10 md:ml-7 -mt-7 ml-5 mr-4 relative">
                        <img src={user?.profile?.mediaLink ?? placeholderImage('100x100', user.name)} alt="profile" className="shadow-md rounded-full border-4 border-white lg:w-40 lg:h-40 md:w-28 md:h-28 w-20 h-20" />
                        {myprofile && <div className="absolute bottom-4 right-4">
                            <span className="tooltip" data-tip="Edit Profile Picture, Max should be 100x100, Max Size 5MB, Ratio 1:1">
                                <label htmlFor="profile" className="btn btn-sm btn-circle bg-white shadow-md">
                                    <i className='bx bx-pencil text-primary text-lg'></i>
                                    <input type="file" name="profile" id="profile" className="hidden" onChange={updateProfilePic} />
                                </label>
                            </span>
                        </div>}
                    </div>
                    <div className="p-2 px-4 grow">
                        <h2 className="text-3xl font-bold mb-1">{user.name}</h2>
                        <p className="mb-4">{user.roles?.map(r => r.name.ucfirst()).join(', ') || <em className="text-neutral/60">No specification</em>}</p>
                        <div className="flex flex-wrap gap-2">
                            <address>{user.address || <span className="text-neutral/50">No location Added</span>}</address>
                        </div>
                    </div>
                    {myprofile && <div className="p-6">
                        <Link href={route('profile.edit-basic', btoa(user.id))} className="btn btn-outline btn-sm btn-primary" title="Edit Basic"><i className='bx bx-edit-alt'></i> <span className="sm:inline hidden">Edit Basic</span></Link>
                    </div>}
                    {buyable && <div className="p-6">
                        <div className="tooltip" data-tooltip="Hire me"><button className="btn btn-outline btn-sm btn-primary" title="Hire me"><Coin price={user.price} /></button></div>
                    </div>}
                </div>
            </div>
        </div>
    );
}
