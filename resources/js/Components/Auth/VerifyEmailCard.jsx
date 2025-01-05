import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function VerifyEmailCard() {

    const [timer, setTimer] = useState(40);

    useEffect(() => {
        const Interval = setInterval(() => {
            if(timer > 0) setTimer(timer - 1);
            // else clearInterval(Interval)
        }, 1000);
        return () => {
            clearInterval(Interval)
        };
    });

    return (
        <div className="flex items-center justify-center">
            <div
                className="card border w-[22rem]"
                style={{ "--padding-card": "1.5rem" }}
            >
                <div className="card-body">
                    <h1 className="text-center font-extrabold text-3xl mb-4">
                        Verify your email
                    </h1>
                    <p className=" text-neutral mb-10">Check you email on your email provider and hit the link inside that email to verify your email</p>
                    { timer > 0 ? <div ><p className="text-base-300 countdown">Resend at <span className='px-1' style={{'--value': `${timer}`}}></span></p></div> : <Link className="btn btn-primary" href={location.href}>Resend</Link> }
                </div>
            </div>
        </div>
    );
}
