import React, { memo, useState, useEffect, useCallback } from 'react';
import { OTPTimerProps } from '../model/OTPTimerProps';

export function OTPTimerComponent(props: OTPTimerProps) {
  const {
    seconds,
    onResetOtp,
    onTimerUpdate
  } = props;

  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        onTimerUpdate(timeLeft - 1)
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft, onTimerUpdate]);

  const handleOnClick = useCallback(() => {
    setTimeLeft(seconds);
    onResetOtp();
  }, [seconds, onResetOtp]);

  const renderReset = function() {
    return <button
              className="pillButtonClassic"
              onClick={handleOnClick}
            >
              RESET
            </button>
  };

  return (
    <div className="otpTimer">
      {
        timeLeft > 0
              ? <span>0:{(timeLeft < 10 ? "0" + timeLeft : "" + timeLeft)}</span> 
              : renderReset()
      }
    </div>
  );
}

const OTPTimer = memo(OTPTimerComponent);
export default OTPTimer;
