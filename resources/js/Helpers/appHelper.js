import { toast } from "react-toastify";

export function toastFlasher(flashes){
    const types = ['success', 'error', 'warning', 'info'];
    for (var type of types){
        if(flashes[type] && flashes[type].length > 0){
            toast[type](flashes[type]);
        }
    }
}

export function formHandler(RequestCallback){
    return (event) => {
        event.preventDefault();
        RequestCallback(event.target.action, {
            preserveScroll: true,
            onError:HandleFormError
        })
    }
}

function HandleFormError(...args){
    console.log(args);
}
