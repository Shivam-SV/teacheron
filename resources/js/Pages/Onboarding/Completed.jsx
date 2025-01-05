import { Link } from "@inertiajs/react";

export default function Completed({user}) {
    return (
        <div className="h-screen bg-gray-100 flex justify-center items-center">
            <div className="max-w-2xl">
                <div className="flex items-center justify-center h-full">
                    <div className="card bg-white">
                        <div className="card-body">
                            <h1 className="text-center text-4xl font-bold mb-4">🥳Congratulations!</h1>
                            <p className="text-center mb-8">Welcome to our team {user.name}, We glad to have you on board. Go ahead and start exploring new jobs for you, Good luck ahead! 👍</p>
                            <Link href="/" className="btn btn-primary w-full text-lg">Go Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}