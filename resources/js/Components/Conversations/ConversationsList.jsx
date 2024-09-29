import { Link, usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { avatarImage } from "../../_utils/commons";

export default function ConversationsList() {
    const {auth} = usePage().props;
    const [conversations, setConversations] = useState([]);

    const getConversation = () => {
        axios.get(route('api.conversations', btoa(auth.id))).then(res => setConversations(res.data));
    }

    useEffect(() => {
        getConversation();
        return () => {
            setConversations([]);
        };
    }, []);

    return (
        <div className="bg-white shadow-lg h-full">
            <div className="p-2 border-b border-gray-100">
                <input type="text" placeholder="Search Conversations" className="input rounded-full bg-base-200 w-full" />
            </div>

            <div className="p-4">
                <ul role="tablist" className="tabs tabs-boxed">
                    <li role="tab" className="tab grow tab-active">All</li>
                    <li role="tab" className="tab grow">Active</li>
                    <li role="tab" className="tab grow">Archived</li>
                </ul>
            </div>
            <ul className="menu rounded-box space-y-2">
                {conversations.length > 0 ? conversations?.map(c => {
                    return (
                        <li key={c.id}>
                            <Link className="flex items-center" href={route('conversation.view', btoa(c.id))}>
                                <div><img src={avatarImage(c.name ?? c?.teacher?.name, 'random', 40)} alt={c.name ?? c?.teacher?.name} className="rounded-full h-10 w-10" /></div>
                                <div className="ml-2 grow">
                                    <p className="font-semibold">{(c.name ?? c?.teacher?.name).limit(20)}</p>
                                    <p className="text-sm text-neutral/70">{c?.last_message?.message}</p>
                                </div>
                                {c?.last_message && <div><p className="text-xs text-base-300">{c?.last_message?.messaged_ago}</p></div>}
                                <div className="ml-2"><i className='bx bx-dots-vertical-rounded text-lg'></i></div>
                            </Link>
                        </li>
                    );
                }) : <em className="text-neutral/60 text-center">Your conversations list is empty</em>}
            </ul>
        </div>
    );
}
