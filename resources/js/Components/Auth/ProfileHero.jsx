export default function ProfileHero({user}){
    return (
        <div>
            <div className="cover-pic">
                <img src="https://placehold.co/1500x300?text=Your%20Cover%20Image" alt="profile Pic" className="w-full object-contain shadow-inner rounded-lg" />
            </div>
            <div className="p-2">
                <div className="flex">
                    <img src={user?.profile?.mediaLink ?? `https://placehold.co/100x100?text=${user.name}`} alt="profile" className="-mt-14 ml-10 shadow-md rounded-full border-4 border-white w-40 h-40 mr-4" />
                    <div className="p-6 grow">
                        <h2 className="text-3xl font-bold mb-2">{user.name}</h2>
                        <p>{user.roles?.join(', ') ?? <em>No specification</em>}</p>
                    </div>
                    <div className="p-6">
                        <button className="btn btn-outline btn-sm btn-primary"><i class='bx bx-edit-alt'></i> Edit profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
