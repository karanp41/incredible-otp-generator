/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-array-index-key */
import React, { memo } from 'react';
import { ConfirmComponentProps } from '../model/ConfirmComponentProps';

export function ConfirmComponent(props: ConfirmComponentProps) {
  const {
    userOtpValue,
    actualOtp,
    isValidOtp,
    onConfirmOTPCallback,
    inputClassName,
    timeLeft,
    ...rest
  } = props;

  // Handle onClick button
  const handleOnClick = () => {
    if ((userOtpValue === actualOtp) && timeLeft > 0) {
      isValidOtp(true);

      // Trigerring success callback on confirmation 
      if (onConfirmOTPCallback) onConfirmOTPCallback();
    } else {
      isValidOtp(false);
    }
  };

  return (
    <div className="otpSubmit" {...rest}>
      <input
          type="button"
          onClick={handleOnClick}
          className={inputClassName}
          value="Confirm"
      />
    </div>
  );
}

const OTPConfirm = memo(ConfirmComponent);
export default OTPConfirm;
