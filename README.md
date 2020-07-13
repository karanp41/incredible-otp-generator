# incredible-otp-generator
A flexible react based OTP generator for multipurpose use.

# Usage

## Installation
```
  yarn add incredible-otp-generator 
```

OR

```
  npm install incredible-otp-generator --save
```

## Importing
```
import OTPComponent from 'incredible-otp-generator';
````

## Calling the Component e.g.
```
  <OTPComponent
    amount="KD1000,000.000"
    length={6}
    seconds={10}
    logo="https://incrediblejs.com/wp-content/uploads/2020/01/cropped-IncredibleJsLogo.png"
    businessName="Test Business"
    onConfirmOTPCallback={() => {console.log('CONFIRMED OTP!!')}}
  />
```

## Parameters description
```
    logo, // Logo image URL
    amount, // Amount of payment
    businessName, // Name of bussiness to be displayed in header
    length, // Length of OTP
    seconds, // Seconds of timer
    onConfirmOTPCallback // Callback to be called on confirmation
```
