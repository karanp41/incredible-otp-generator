import { CSSProperties } from "react";

export interface OTPInputProps {
    length: number;
    seconds: number;
    onChangeOTP?: (otp: string) => any;
    isValidOtp: (isValidOtp: any) => any;
    onConfirmOTPCallback?: () => any;
  
    autoFocus?: boolean;
    isNumberInput?: boolean;
    disabled?: boolean;
  
    style?: CSSProperties;
    className?: string;
  
    inputStyle?: CSSProperties;
    inputClassName?: string;
}