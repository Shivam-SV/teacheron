import axios from "axios";

const BASE_PATH = window.location.origin;

export async function savePost(postId){
    return await axios.post(route('post.save', postId));
}

export async function unsavePost(postId){
    return await axios.post(route('post.unsave', postId));
}

export async function buyPost(postId){
    return await axios.post(route('post.buy', postId));
}
