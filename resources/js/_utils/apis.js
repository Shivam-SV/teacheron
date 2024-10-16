import { router } from "@inertiajs/react";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_PATH = window.location.origin;

export function updatePageProps(...props){
    router.visit(location.href, {only: [props], preserveScroll: true, preserveState: false});
}

export async function savePost(postId){
    return await axios.post(route('post.save', postId));
}

export async function unsavePost(postId){
    return await axios.post(route('post.unsave', postId));
}

export async function buyPost(postId){
    let toastId = toast.loading('Debitting your account and buying the post...');
    axios.post(route('post.buy', postId)).then(res => {
        toast.update(toastId, {
            render: res.data.message,
            type:'success',
            isLoading: false
        });
        router.visit(route('conversation.view', btoa(res.data.conversations_id)));
    }).catch(err => {
        toast.update(toastId, {
            render: err.response.data.message,
            type: 'error',
            isLoading: false
        });
    });
}

export async function updatePostStatus(postId, status){
    return await axios.post(route('supadmin.posts.update-status', postId), {status});
}

export async function updatePostPrice(postId, price){
    return await axios.post(route('supadmin.posts.update-price', postId), {price});
}


