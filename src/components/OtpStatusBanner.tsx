import React, { memo } from 'react';
import { OtpStatusBannerProps } from '../model/OtpStatusBannerProps';

export function OtpStatusBanner(props: OtpStatusBannerProps) {
  const {
    isValidOTP,
  } = props;

  return (
        <div className={`otpStatusBanner ${!isValidOTP && typeof isValidOTP !== "undefined" ? "invalid" : ""}`}>
          <div className="container">
            {typeof isValidOTP !== "undefined" ? (isValidOTP ? 'Valid OTP number! ' : 'Invalid OTP') : ""}
          </div>
        </div>
  );
}

const OTPBanner = memo(OtpStatusBanner);
export default OTPBanner;
