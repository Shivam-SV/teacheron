export default function Summary({ user }) {
    return (
        <div className="card bg-base-100 w-100 border">
            <div className="card-body">
                <h2 className="card-title mb-3 text-2xl font-bold">Summary</h2>
                <div className="content">
                    {user.bio || <em></em>}
                </div>
            </div>
        </div>
    )
}
