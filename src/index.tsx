import React, { useState } from "react";
import OTPInput from "./components/OTP";
import "./App.css";
import { OTPHeaderComponent } from "./components/OtpHeader";
import OTPBanner from "./components/OtpStatusBanner";
import { OTPAppComponentProps } from './model/OTPAppComponentProps';

const App: React.FC<OTPAppComponentProps> = (props: OTPAppComponentProps) => {

  const {
    logo, // Logo image URL
    amount, // Amount of payment
    businessName, // Name of bussiness to be displayed in header
    length, // Length of OTP
    seconds, // Seconds of timer
    onConfirmOTPCallback // Callback to be called on confirmation
  } = props;

  const [isValidOtp, setOtpValidity] = useState(undefined);

  return (
    <div className="otpComponent">
      <OTPHeaderComponent
        logo={logo}
        amount={amount}
        businessName={businessName}
      />
      
      <OTPBanner
        isValidOTP={isValidOtp}
      />

      <div className="otpBody">
        <div className="container">
          <OTPInput
            length={length}
            seconds={seconds}
            className="otpContainer"
            inputClassName="otpInput"
            isNumberInput
            autoFocus
            // Handle onchange OTP BOX Event
            // Pass custom callback to handle
            // onChangeOTP={otp => {
            //   console.log("Number OTP Input: ", otp);
            // }}
            isValidOtp={(isValid: any) => {
              setOtpValidity(isValid);
            }}
            onConfirmOTPCallback={onConfirmOTPCallback}
          />
        </div>
      </div>

    </div>
  );
};

export default App;
