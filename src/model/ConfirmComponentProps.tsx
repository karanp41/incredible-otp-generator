export interface ConfirmComponentProps {
    userOtpValue?: number | string;
    actualOtp?: number | string;
    isValidOtp: (isValid: boolean) => any;
    onConfirmOTPCallback: () => any;
    inputClassName?: string;
    timeLeft: number;
  }
  