import { usePage } from "@inertiajs/react";
import { toastFlasher } from "../Helpers/appHelper";

export default function BaseLayout({children}){
    toastFlasher(usePage().props.flash);
    return <>{children}</>
}
