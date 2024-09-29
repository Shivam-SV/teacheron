import ChatBox from "../../Components/Conversations/ChatBox";
import ConversationsList from "../../Components/Conversations/ConversationsList";
import Layout from "../../Layouts/AppLayout";

export default function ViewConversation({conversation}) {
    return (
        <Layout>
            <div className="mt-2" style={{height: "calc(100vh - 84px)"}}>
                <div className="flex h-full">
                    <div className="w-1/3 h-full">
                        <ConversationsList />
                    </div>
                    <div className="w-full h-full">
                        <ChatBox conversation={conversation} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
