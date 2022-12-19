import React, { useState } from 'react';
import { ApplePay, Cards } from '../assets';
import { usePaymentInputs } from 'react-payment-inputs';

const PaymentPage = () => {
  const { getCardNumberProps, getExpiryDateProps, getCVCProps } =
    usePaymentInputs();
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCardRequired, setNameOnCardRequired] = useState(false);
  const [cardInfoRequired, setCardInfoRequired] = useState(false);
  const [isLastNameError, setIsLastNameError] = useState(false);
  const [isNameContainAlphabetError, setIsNameContainAlphabetError] =
    useState(false);
  const [isInvalidDateError, setIsInvalidDateError] = useState(false);
  const [isInvalidMonthError, setIsInvalidMonthError] = useState(false);
  const [isInvalidCardError, setIsInvalisInvalidCardError] = useState(false);
  const [isIsInvalidCvvError, setIsInvalidCvvError] = useState(false);
  const nameValidation = () => {
    if (!nameOnCard.trim().includes(' ')) {
      setIsLastNameError(true);
    } else {
      setIsLastNameError(false);
    }
    if (/\d/.test(nameOnCard.trim())) {
      setIsNameContainAlphabetError(true);
    } else {
      setIsNameContainAlphabetError(false);
    }
  };
  const checkRequiredValidation = (e: any) => {
    switch (e.target.name) {
      case 'Name On Card':
        if (nameOnCard === '') {
          setNameOnCardRequired(true);
        } else {
          setNameOnCardRequired(false);
        }
        break;
      case 'Card Number':
        if (cardNumber === '') {
          setCardInfoRequired(true);
        } else {
          setCardInfoRequired(false);
        }
        break;
      case 'Card Expiry':
        if (expiryDate === '') {
          setCardInfoRequired(true);
        } else {
          setCardInfoRequired(false);
        }
        break;
      case 'Card Cvv':
        if (cvv === '') {
          setCardInfoRequired(true);
        } else {
          setCardInfoRequired(false);
        }
        break;
    }
  };
  console.log(expiryDate + ' ' + cardNumber + ' ' + cvv);

  return (
    <div className="max-w-fit flex justify-center">
      <div>
        <div className="bg-black cursor-pointer h-10 justify-center flex rounded-lg">
          <img
            src={ApplePay}
            width="50px"
            className="text-white mx-32"
            alt="apple pay"
          />
        </div>

        <div className="grid grid-cols-3 py-4">
          <div className="bg-slate-400 my-auto h-[1px] w-full"></div>
          <div className="mx-2 text-center">
            <span>Or pay with card</span>
          </div>
          <div className="bg-slate-400 my-auto h-[1px] w-full"></div>
        </div>

        <div className="flex flex-col text-sm">
          <div className="flex justify-between">
            <label className="pb-2">Name on card</label>
            <label
              id="required"
              className={`text-red-500 delay-200 transition text-xs my-auto peer-invalid:visible ${
                nameOnCardRequired ? 'visible' : 'invisible'
              }`}
            >
              REQUIRED
            </label>
          </div>
          {/* Name on Card */}
          <input
            type="text"
            placeholder="Name on card"
            name="Name On Card"
            onKeyUp={(e) => {
              checkRequiredValidation(e);
            }}
            onChange={(e) => {
              setNameOnCard(e.target.value);
            }}
            onBlur={(e) => {
              checkRequiredValidation(e);
              nameValidation();
            }}
            className="peer peer-invalid:outline-none border-[1px] focus:outline-none focus:border-blue-300 focus:outline-offset-0 focus:outline-blue-200 focus:border-2 mx-2 p-3 shadow-lg placeholder:text-gray-500 rounded-lg border-slate-200"
          />
          {/* Error Card Name*/}
          <span
            id="nameValidation"
            className={`text-red-500 text-sm p-3 ${
              !isLastNameError && 'hidden'
            }`}
          >
            Both first and last name are required
          </span>
          <span
            id="nameValidation"
            className={`text-red-500 text-sm p-3 ${
              !isNameContainAlphabetError && 'hidden'
            }`}
          >
            Name may only have English alphabet and spaces
          </span>
        </div>

        <div className="relative flex flex-col text-sm pt-7">
          <div className="flex justify-between">
            <label className="pb-2">Card information</label>
            <label
              id="requiredCardInfo"
              className={`text-red-500 delay-200 transition text-xs my-auto ${
                cardInfoRequired ? 'visible' : 'invisible'
              }`}
            >
              REQUIRED
            </label>
          </div>
          {/* Card Number */}
          <input
            {...getCardNumberProps({
              onChange: (e: any) => {
                setCardNumber(e.target.value);
              },
              onKeyPress: (e: any) => {
                checkRequiredValidation(e);
              },
              onBlur: (e: any) => {
                checkRequiredValidation(e);
              },
            })}
            max={19}
            name="Card Number"
            placeholder="1234 5678 9101 1121"
            className="border-[1px] z-0 focus:z-10 focus:outline-none focus:border-blue-300 focus:outline-offset-0 focus:outline-blue-200 focus:border-2 placeholder:text-gray-500 mx-2 p-3 shadow-lg rounded-t-lg border-slate-200"
          />

          <img
            className="absolute top-[65px] right-3 z-10"
            src={Cards}
            width="150px"
            alt="cards"
          />
          <div className="grid grid-cols-2 gap-0">
            {/* Card Expiry */}
            <input
              {...getExpiryDateProps({
                onChange: (e: any) => {
                  setExpiryDate(e.target.value);
                },
                onKeyPress: (e: any) => {
                  checkRequiredValidation(e);
                },
                onBlur: (e: any) => {
                  checkRequiredValidation(e);
                },
              })}
              data-mask="00/00"
              id="cardExpiry"
              name="Card Expiry"
              placeholder="MM/YY"
              className="border-[1px] z-0 focus:z-10 focus:outline-none focus:border-blue-300 focus:outline-offset-0 focus:outline-blue-200 focus:border-2 placeholder:text-gray-500 p-3 ml-2 py-3 shadow-lg rounded-bl-lg border-slate-200"
            />
            {/* Card Cvv */}
            <input
              {...getCVCProps({
                onChange: (e: any) => {
                  setCvv(e.target.value);
                },
                onKeyPress: (e: any) => {
                  checkRequiredValidation(e);
                },
                onBlur: (e: any) => {
                  checkRequiredValidation(e);
                },
              })}
              maxLength={3}
              id="cardCvv"
              name="Card Cvv"
              placeholder="CVV"
              data-mask="000"
              className="border-[1px] z-10 focus:z-10 focus:outline-none focus:border-blue-300 focus:outline-offset-0 focus:outline-blue-200 focus:border-2 placeholder:text-gray-500 p-3 mr-2 py-3 shadow-lg rounded-br-lg border-slate-200"
            />
          </div>
          {/* Card Info Errors */}
          <span
            id="cardValidation"
            className={`text-red-500 text-sm p-3 ${
              !isInvalidDateError && 'hidden'
            }`}
          >
            Invalid date
          </span>
          <span
            id="cardValidation"
            className={`text-red-500 text-sm p-3 ${
              !isInvalidMonthError && 'hidden'
            }`}
          >
            Invalid Month
          </span>
          <span
            id="cardValidation"
            className={`text-red-500 text-sm p-3 ${
              !isInvalidCardError && 'hidden'
            }`}
          >
            Invalid credit card
          </span>
          <span
            id="cardValidation"
            className={`text-red-500 text-sm p-3 ${
              !isIsInvalidCvvError && 'hidden'
            }`}
          >
            Invalid CVV
          </span>
        </div>

        <div className="bg-blue-900 cursor-pointer h-10 my-7 text-white text-xl justify-center flex rounded-lg">
          <span className="my-auto">Pay SAR 10.20</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
