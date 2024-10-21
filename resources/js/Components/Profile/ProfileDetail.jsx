import { useState } from "react";
import Education from "./Education";
import Experience from "./Experience";
import Subject from "./Subject";
import Summary from "./Summary";

export default function ProfileDetail({ user, myprofile }) {
    const locationHash = window.location.hash.replace(new RegExp('[^a-bA-Z0-9]+', 'gi'), '').trim();
    const [tab, setTab] = useState(locationHash || "Summary");
    const updateTab = (tabName) => {
        setTab(tabName);
        window.location.hash = tabName;
    }

    return (
        <div className="">
            <div role="tablist" className="tabs tabs-boxed mb-2">
                <a role="tab" className={"tab " + (tab === "Summary" ? 'tab-active' : '')} aria-label="Summary" onClick={() => updateTab("Summary")}>Summary</a>

                <a role="tab" className={"tab " + (tab === "Subject" ? 'tab-active' : '')} aria-label="Subject" onClick={() => updateTab("Subject")}>Subject</a>

                <a role="tab" className={"tab " + (tab === "Education" ? 'tab-active' : '')} aria-label="Education" onClick={() => updateTab("Education")}>Education</a>

                <a role="tab" className={"tab " + (tab === "Experience" ? 'tab-active' : '')} aria-label="Experience" onClick={() => updateTab("Experience")}>Experience</a>
            </div>

            <div>
                <div role="tabpanel" className={"tab-content " + (tab === "Summary" ? 'block' : '')}>
                    <Summary user={user} />
                </div>
                <div role="tabpanel" className={"tab-content " + (tab === "Subject" ? 'block' : '')}>
                    <Subject user={user} myprofile={myprofile} />
                </div>
                <div role="tabpanel" className={"tab-content " + (tab === "Education" ? 'block' : '')}>
                    <Education user={user} myprofile={myprofile} />
                </div>
                <div role="tabpanel" className={"tab-content " + (tab === "Experience" ? 'block' : '')}>
                    <Experience user={user} myprofile={myprofile} />
                </div>
            </div>

        </div >
    )
}
