import { useState, useEffect } from "react";

const EVENT_DATE = new Date("2026-06-22T08:30:00-05:00");

function getTimeLeft() {
  const now = new Date();
  const diff = EVENT_DATE - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Unit({ value, label }) {
  return (
    <div className="text-center">
      <div className="font-heading text-3xl sm:text-4xl font-semibold text-gold tabular-nums">
        {String(value).padStart(2, "0")}
      </div>
      <div className="font-body text-xs text-text-dim tracking-[3px] mt-1">
        {label}
      </div>
    </div>
  );
}

export function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center justify-center gap-6 sm:gap-8">
      <Unit value={time.days} label="DAYS" />
      <span className="text-gold-dim text-xl font-light mt-[-16px]">:</span>
      <Unit value={time.hours} label="HRS" />
      <span className="text-gold-dim text-xl font-light mt-[-16px]">:</span>
      <Unit value={time.minutes} label="MIN" />
      <span className="text-gold-dim text-xl font-light mt-[-16px]">:</span>
      <Unit value={time.seconds} label="SEC" />
    </div>
  );
}
