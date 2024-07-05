import BaseLayout from "./BaseLayout";

export default function Layout({children}){
    return (
        <BaseLayout>
            <div className="bg-gradient-to-tl from-primary to-primary-content h-screen w-full">
                <div className="container mx-auto h-full">
                    <div className="flex justify-center items-center h-full">
                        {children}
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}
