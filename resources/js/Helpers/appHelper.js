import { toast } from "react-toastify";

export default function toastFlasher(flashes){
    const types = ['success', 'error', 'warning', 'info'];
    for (var type of types){
        if(flashes[type] && flashes[type].length > 0){
            toast[type](flashes[type]);
        }
    }
}
