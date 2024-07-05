import Education from "./Education";
import Experience from "./Experience";
import Subject from "./Subject";
import Summary from "./Summary";

export default function ProfileDetail({ user }) {
    return (
        <div className="py-5">
            <div role="tablist" className="tabs tabs-bordered">
                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Summary" defaultChecked />
                <div role="tabpanel" className="tab-content py-5">
                    <Summary />
                </div>

                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Subject" />
                <div role="tabpanel" className="tab-content py-5">
                    <Subject />
                </div>

                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Education" />
                <div role="tabpanel" className="tab-content py-5">
                    <Education />
                </div>

                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Experience" />
                <div role="tabpanel" className="tab-content py-5">
                    <Experience />
                </div>
            </div>
        </div>
    )
}