import { OTPHeaderProps } from "./OTPHeaderProps";

export interface OTPAppComponentProps extends OTPHeaderProps {
    length: number;
    seconds: number;
    onConfirmOTPCallback?: () => any;
}