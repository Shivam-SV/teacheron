export default function WalletDetails({user}){
    return (
        <div className="card static bg-gradient-to-tr from-primary to-secondary min-h-14 mb-4">
            <div className="card-body">
                <h2 className="text-4xl font-extrabold text-base-100">{user.wallet_balance} {user?.country?.code}</h2>
            </div>
        </div>
    )
}
