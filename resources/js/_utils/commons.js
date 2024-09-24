import { toast } from "react-toastify";

window.toastedMessage = [];

export function toastFlasher(flashes){
    const types = ['success', 'error', 'warning', 'info'];
    for (var type of types){
        if(flashes[type] && flashes[type].length > 0 && toastedMessage.filter(tm => tm.type === type && tm.message === flashes[type]).length === 0){
            toast[type](flashes[type], {
                toastId: `${type}-toast`
            });
            // toastedMessage.push({type, message: flashes[type]})
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
    console.error(args);
}

export function placeholderImage(size = '100x100', text = null, color = null){
    let url = new URL(`https://placehold.co/${size}`);
    if(text) url.searchParams.set('text', text);
    if(color) url.searchParams.set('color', color);
    return url.toString();
}

export function avatarImage(name, color = 'random', size = 64){
    let url =  new URL('https://ui-avatars.com/api/');
    if(name) url.searchParams.set('name', name);
    if(color) url.searchParams.set('background', color);
    if(size) url.searchParams.set('size', size);
    return url.toString();
}
