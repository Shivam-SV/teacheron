import { useState } from "react";
import Education from "./Education";
import Experience from "./Experience";
import Subject from "./Subject";
import Summary from "./Summary";

export default function ProfileDetail({ user }) {

    const [tab, setTab] = useState(window.location.hash.trim() ?? "Summary");

    console.log(typeof window.location.hash.trim());

    const updateTab = (tabName) => {
        setTab(tabName);
        window.location.hash = tabName;
    }

    return (
        <div className="py-5">
            <div role="tablist" className="tabs tabs-boxed">
                <a name="my_tabs_1" role="tab" className={"tab " + (tab === "Summary" ? 'tab-active' : '')} aria-label="Summary" onClick={() => updateTab("Summary")}>Summary</a>

                <a name="my_tabs_1" role="tab" className={"tab " + (tab === "Subject" ? 'tab-active' : '')} aria-label="Subject" onClick={() => updateTab("Subject")}>Subject</a>

                <a name="my_tabs_1" role="tab" className={"tab " + (tab === "Education" ? 'tab-active' : '')} aria-label="Education" onClick={() => updateTab("Education")}>Education</a>

                <a name="my_tabs_1" role="tab" className={"tab " + (tab === "Experience" ? 'tab-active' : '')} aria-label="Experience" onClick={() => updateTab("Experience")}>Experience</a>
            </div>

            <div>
                <div role="tabpanel" className={"py-5 tab-content " + (tab === "Summary" ? 'block' : '')}>
                    <Summary />
                </div>
                <div role="tabpanel" className={"py-5 tab-content " + (tab === "Subject" ? 'block' : '')}>
                    <Subject />
                </div>
                <div role="tabpanel" className={"py-5 tab-content " + (tab === "Education" ? 'block' : '')}>
                    <Education />
                </div>
                <div role="tabpanel" className={"py-5 tab-content " + (tab === "Experience" ? 'block' : '')}>
                    <Experience />
                </div>
            </div>

        </div >
    )
}