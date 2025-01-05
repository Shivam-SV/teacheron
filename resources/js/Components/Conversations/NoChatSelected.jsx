export default function NoChatSelected({message}) {
    return <div className="flex flex-col justify-center items-center h-full" >
        <img src="/assets/images/start-chat.svg" width={"30%"} alt="Start a chat" />
        <p className="text-center text-gray-500 mt-4">{message || "Choose a conversation to start messaging"}</p>
    </div>;
}