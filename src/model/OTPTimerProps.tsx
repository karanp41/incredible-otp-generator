export interface OTPTimerProps {
    seconds: number;
    onResetOtp: () => any;
    onTimerUpdate: (timeLeft: number) => any;
}