export default function WalletDetails({user}){
    return (
        <div className="card static bg-gradient-to-tr from-primary to-secondary min-h-14 mb-4">
            <div className="card-body">
                <h2 className="text-4xl font-extrabold text-base-100 align-middle">{user.wallet_balance} <i class='bx bxs-dollar-circle text-amber-300 mt-1 align-bottom '></i></h2>
            </div>
        </div>
    )
}
