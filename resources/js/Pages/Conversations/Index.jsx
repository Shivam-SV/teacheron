import ConversationsList from "../../Components/Conversations/ConversationsList";
import NoChatSelected from "../../Components/Conversations/NoChatSelected";
import Layout from "../../Layouts/AppLayout";

export default function Conversations() {
    return (
        <Layout>
            <div className="mt-2" style={{height: "calc(100vh - 84px)"}}>
                <div className="flex h-full">
                    <div className="w-1/3 h-full">
                        <ConversationsList />
                    </div>
                    <div className="w-full h-full">
                        <NoChatSelected />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
