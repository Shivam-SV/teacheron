import BaseLayout from "./BaseLayout";

export default function OnBoardingLayout({children, activeTill, heading, subHeading}) {
    const steps = ['Education', 'Experience', 'Documents', 'Summary'];
    const activeStep = steps.indexOf(activeTill.toLowerCase().ucfirst());

    return (
        <BaseLayout>
            <div className="flex flex-col items-center py-24 min-h-screen bg-gray-100">
                <div className="mb-20 flex flex-col items-center max-w-4xl">
                    <h1 className="text-4xl font-bold text-center mb-2">{heading || "Let's get started!"}</h1>
                    <p className="text-lg text-center mb-8">{subHeading || "Please complete the following steps to get started."}</p>
                    <ul className="steps gap-4 mx-auto">
                        {steps.map((step, index) => (<li key={step} className={`step ${index <= activeStep ? 'step-primary' : ''}`}>{step}</li>))}
                    </ul>
                </div>

                <div className="container mx-auto">
                    {children}
                </div>
            </div>
        </BaseLayout>
    );
}