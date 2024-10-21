import Coin from "../Elements/Coin";

export default function WalletDetails({user}){
    return (
        <div className="card static bg-gradient-to-tr from-primary to-secondary min-h-14 mb-4">
            <div className="card-body flex items-center justify-between flex-row">
                <h2 className="text-lg font-bold text-base-100">Wallet Balance</h2>
                <h2 className="text-4xl font-extrabold text-base-100 align-middle"><Coin size="3xl" price={user.wallet_balance} /></h2>
            </div>
        </div>
    )
}
