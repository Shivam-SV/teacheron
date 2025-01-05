import { useEffect, useState } from "react";
import { avatarImage } from "../../_utils/commons";
import axios from "axios";
import { usePage, usePoll } from "@inertiajs/react";

export default function ChatBox({conversation}) {
    const {auth, messages: defaultMessages} = usePage().props;

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState(defaultMessages);

    usePoll(2000, {
        onSuccess: (res) => {
            console.log(res);
            setMessages(() => res.props.messages);
        }
    });

    const sendMessage = async (e) => {
        e.preventDefault();
        if (message.trim() === '') return;

        axios.post(route('api.conversation.send-message', btoa(conversation.id)), {
            message: message,
            sender_id: auth.id
        }).then(res => {
            console.log("message send", res);
            setMessage('');
        });
    }

    return (
        <div className="flex flex-col h-full">
            <div className="bg-white py-2 px-4 shadow flex items-center">
            <div><img src={avatarImage(conversation.name ?? conversation?.teacher?.name, 'random', 40)} alt={conversation.name ?? conversation?.teacher?.name} className="rounded-full h-10 w-10" /></div>
                <div className="ml-3">
                    <p className="font-semibold text-xl text-gray-800">{conversation.name ?? conversation?.teacher?.name}</p>
                    {/* <p className="text-sm text-gray-500 align-center"><span className="bg-green-500 w-2 h-2 rounded-full mr-2 inline-block"></span>Online</p> */}
                </div>
            </div>

            <div className="flex-1 flex flex-col-reverse p-6 overflow-y-auto">
                {messages?.data?.length > 0 ? messages?.data?.map((message, index) => {
                    if(message.sender_id === auth.id) return (
                        <div className="chat chat-end" key={index}>
                            <div className="chat-bubble text-neutral bg-neutral-content">{message.message}</div>
                        </div>
                    );
                    else return (
                        <div className="chat chat-start" key={index}>
                            <div className="chat-bubble">{message.message}</div>
                        </div>
                    )
                }) : <div className="text-center text-gray-500">Say 🙋‍♂️ Hi to start a conversation</div>}
            </div>

            <div>
                <form className="bg-white p-2 shadow-lg flex items-center" onSubmit={sendMessage}>
                    <input type="text" placeholder="Type a message" autoComplete="off" required value={message} onInput={(e) => setMessage(e.target.value)} name="message" className="input bg-base-200 w-full" />
                    <button className="ml-1 btn btn-primary">
                        <i className='bx bxl-telegram text-lg'></i> Send
                    </button>
                </form>
            </div>
        </div>
    );
}
