import React, { memo } from 'react';
import { OTPHeaderProps } from '../model/OTPHeaderProps';

export function OTPHeaderComponent(props: OTPHeaderProps) {
  const {
    logo,
    amount,
    businessName
  } = props;

  return (
        <div className="otpHeader">
          <div className="container">
            <div className="otpHeadWrapper">
              <div className="otpLogoWrapper">
                <div className="otpLogo">
                  <img alt="App logo" src={logo} />
                </div>
                <div className="otpBusinessName">
                  <p>PAYMENT FOR</p>
                  <p>{businessName}</p>
                </div>
              </div>
              <div className="otpCurrencyWrapper">
                <p>{amount}</p>
                <button className="pillButtonClassic">CLOSE</button>
              </div>
            </div>
          </div>
          
        </div>
  );
}

OTPHeaderComponent.defaultProps = {
  logo: "https://cdn.iconscout.com/icon/free/png-256/uber-12-761721.png",
  amount: "KD1000,000.000",
  businessName: "Uber Money"
};

const OTPHeader = memo(OTPHeaderComponent);
export default OTPHeader;
