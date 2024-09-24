import { usePage } from "@inertiajs/react";
import { toastFlasher } from "../_utils/commons";

export default function BaseLayout({children}){
    toastFlasher(usePage().props.flash);
    return <>{children}</>
}
