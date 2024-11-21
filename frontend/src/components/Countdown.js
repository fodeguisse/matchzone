import React, { useEffect, useState } from "react";

function Countdown({eventDate}) {
    const calculateTimeRemaining = () => {
        const eventTime = new Date(eventDate).getTime();
        const now = new Date().getTime();
        const difference = eventTime - now;

        return {
            days: Math.floor(difference / (1000*60*60*24)),
            hours: Math.floor(difference % (1000*60*60*24) / (1000*60*60)),
            minutes: Math.floor(difference % (1000*60*60*24) / (1000*60)),
            seconds: Math.floor(difference % (1000*60*60*24) / 1000),
        }
    }

    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 1000);
        return () => clearInterval(interval);
    }, [eventDate]);

    return(
        <div className="countdown">
            <span>{timeRemaining.days}j</span> : <span>{timeRemaining.hours}h</span>: <span>{timeRemaining.minutes}m</span> : <span>{timeRemaining.seconds}s</span>

        </div>
    );
}

export default Countdown;