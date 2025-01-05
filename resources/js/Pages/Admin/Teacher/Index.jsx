import Layout from "../../../Layouts/AdminLayout";
import Table from "../../../Components/Partials/Table";
import CreatePayment from "../../../Components/Admin/Payments/CreatePayment";
import { useRef, useState } from "react";
import { Link, router } from "@inertiajs/react";
export default function Index({teachers}){
    const paymentModalRef = useRef(null);
    const [paymentFillingUserId, setPaymentFillingUserId] = useState(null);

    const fillWallet = (userId) => {
        setPaymentFillingUserId(userId);
        paymentModalRef.current.showModal();
    }
    return (
        <Layout title="Teachers">
            <div className="card bg-white">
                <div className="card-body">
                    <Table
                        resource={teachers}
                        placeholder="No Teachers Found"
                        onRowClick={(row) => {
                            router.visit(route("supadmin.teacher.show", btoa(row.id)));
                        }}
                        actions={{
                            actions:({row}) => {
                                return (
                                    <>
                                        <button className="btn btn-sm btn-outline btn-primary mr-2" onClick={e => e.stopPropagation() || fillWallet(row.id)}>Fill Wallet</button>
                                    </>
                                );
                            }
                        }}
                    />
                </div>
            </div>

            <dialog id="payment_modal" className="modal" ref={paymentModalRef}>
                <div className="modal-box">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => paymentModalRef.current.close()}>✕</button>
                    <CreatePayment userId={paymentFillingUserId} onSuccess={() => paymentModalRef.current.close()} />
                </div>
            </dialog>
        </Layout>
    )
}
