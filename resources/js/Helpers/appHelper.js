import { toast } from "react-toastify";

export function toastFlasher(flashes){
    const types = ['success', 'error', 'warning', 'info'];
    for (var type of types){
        if(flashes[type] && flashes[type].length > 0){
            toast[type](flashes[type], {
                toastId: `${type}-toast`
            });
        }
    }
}

export function formHandler(RequestCallback, successCallback = null){
    return (event) => {
        event.preventDefault();
        RequestCallback(event.target.action, {
            preserveScroll: true,
            onError:HandleFormError,
            onSuccess:successCallback
        })
    }
}

function HandleFormError(...args){
    console.log(args);
}
