/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-array-index-key */
import React, { memo, useState, useCallback } from 'react';
import SingleInput from './SingleInput';
import { OTPTimerComponent } from '../otpTimer';
import { ConfirmComponent } from '../ConfirmButton';
import { OTPInputProps } from '../../model/OTPInputProps';

export function OTPInputComponent(props: OTPInputProps) {
  const {
    length,
    seconds,
    isNumberInput,
    autoFocus,
    disabled,
    onChangeOTP,
    isValidOtp,
    onConfirmOTPCallback,
    inputClassName,
    inputStyle,
    ...rest
  } = props;

  // Helper to return padded 0 string
  const padTrailingZeroes = (num: number, size: number) => {
    let s = num + "";
    while (s.length < size) s = s + "0";
    return s;
}

  // Helper to generate actual random OTP which has to be matched later
  const generateRandomOTP = useCallback(() => {
    const otp = (Math.floor(Number(padTrailingZeroes(1, length)) + Math.random() * Number(padTrailingZeroes(9, length)))).toString()
    console.log('NEW OTP :: ', otp)
    return otp;
  },[length])

  const [activeInput, setActiveInput] = useState(0);
  const [actualOtp, setActualOTP] = useState(() => {
    const otp = generateRandomOTP();
    return otp;
  });
  const [otpValues, setOTPValues] = useState(Array<string>(length).fill(''));
  const [userOtpValue, setUserOTPValue] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  // Helper to return OTP from inputs
  const handleOtpChange = useCallback(
    (otp: string[]) => {
      const otpValue = otp.join('');
      if(onChangeOTP) onChangeOTP(otpValue);
      setUserOTPValue(otpValue)
    },
    [onChangeOTP, setUserOTPValue]
  );

  // Helper to return value with the right type: 'text' or 'number'
  const getRightValue = useCallback(
    (str: string) => {
      let changedValue = str;
      if (!isNumberInput) {
        return changedValue;
      }
      return !changedValue || /\d/.test(changedValue) ? changedValue : '';
    },
    [isNumberInput]
  );

  // Change OTP value at focussing input
  const changeCodeAtFocus = useCallback(
    (str: string) => {
      const updatedOTPValues = [...otpValues];
      updatedOTPValues[activeInput] = str[0] || '';
      setOTPValues(updatedOTPValues);
      handleOtpChange(updatedOTPValues);
    },
    [activeInput, handleOtpChange, otpValues]
  );

  // Focus `inputIndex` input
  const focusInput = useCallback(
    (inputIndex: number) => {
      const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0);
      setActiveInput(selectedIndex);
    },
    [length]
  );

  const focusPrevInput = useCallback(() => {
    focusInput(activeInput - 1);
  }, [activeInput, focusInput]);

  const focusNextInput = useCallback(() => {
    focusInput(activeInput + 1);
  }, [activeInput, focusInput]);

  // Handle onFocus input
  const handleOnFocus = useCallback(
    (index: number) => () => {
      focusInput(index);
    },
    [focusInput]
  );

  // Handle onChange value for each input
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = getRightValue(e.currentTarget.value);
      if (!val) {
        e.preventDefault();
        return;
      }
      changeCodeAtFocus(val);
      focusNextInput();
    },
    [changeCodeAtFocus, focusNextInput, getRightValue]
  );

  // Hanlde onBlur input
  const onBlur = useCallback(() => {
    setActiveInput(-1);
  }, []);

  // Handle onKeyDown input
  const handleOnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'Backspace':
        case 'Delete': {
          e.preventDefault();
          if (otpValues[activeInput]) {
            changeCodeAtFocus('');
          } else {
            focusPrevInput();
          }
          break;
        }
        case 'ArrowLeft': {
          e.preventDefault();
          focusPrevInput();
          break;
        }
        case 'ArrowRight': {
          e.preventDefault();
          focusNextInput();
          break;
        }
        case ' ': {
          e.preventDefault();
          break;
        }
        default:
          break;
      }
    },
    [activeInput, changeCodeAtFocus, focusNextInput, focusPrevInput, otpValues]
  );

  // Handle paste event in input
  const handleOnPaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData
        .getData('text/plain')
        .trim()
        .slice(0, length - activeInput)
        .split('');
      if (pastedData) {
        let nextFocusIndex = 0;
        const updatedOTPValues = [...otpValues];
        updatedOTPValues.forEach((val, index) => {
          if (index >= activeInput) {
            const changedValue = getRightValue(pastedData.shift() || val);
            if (changedValue) {
              updatedOTPValues[index] = changedValue;
              nextFocusIndex = index;
            }
          }
        });
        setOTPValues(updatedOTPValues);
        setActiveInput(Math.min(nextFocusIndex + 1, length - 1));
      }
    },
    [activeInput, getRightValue, length, otpValues]
  );

  // Update timer to validate OTP expiry
  const onTimerUpdate = useCallback(
    (time: number) => {
      setTimeLeft(time)
    },[setTimeLeft]
  );

  const isValidOtpHandler = useCallback((isValid: boolean) => {
    isValidOtp(isValid);
  }, [isValidOtp]);

  // Handle reset OTP
  const onResetOtp = useCallback(() => {
    setActiveInput(0);
    setOTPValues(Array<string>(length).fill(''));
    setUserOTPValue("");
    setActualOTP(generateRandomOTP());
    isValidOtp(undefined);
  }, [length, isValidOtp, generateRandomOTP]);

  return (
    <React.Fragment>
      <div {...rest}>
      {Array(length)
          .fill('')
          .map((_, index) => (
          <SingleInput
              key={`SingleInput-${index}`}
              focus={activeInput === index}
              autoFocus={autoFocus}
              value={otpValues && otpValues[index]}
              onFocus={handleOnFocus(index)}
              onChange={handleOnChange}
              onKeyDown={handleOnKeyDown}
              onBlur={onBlur}
              onPaste={handleOnPaste}
              style={inputStyle}
              className={inputClassName}
              disabled={disabled}
          />
          ))}
      </div>
      <OTPTimerComponent
        seconds={seconds}
        onResetOtp={() => onResetOtp()}
        onTimerUpdate={(timeLeft: number) => onTimerUpdate(timeLeft)}
      />
      <ConfirmComponent
        inputClassName="otpSubmitButton"
        userOtpValue={userOtpValue}
        actualOtp={actualOtp}
        timeLeft={timeLeft}
        isValidOtp={isValidOtpHandler}
        onConfirmOTPCallback={onConfirmOTPCallback ? onConfirmOTPCallback : () => console.log('OTP Confirmed')}
      />
    </React.Fragment>
  );
}

OTPInputComponent.defaultProps = {
  length: 6,
  seconds: 10
};

const OTPInput = memo(OTPInputComponent);
export default OTPInput;
