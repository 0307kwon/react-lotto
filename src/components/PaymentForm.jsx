import React from "react";
import { LOTTERY, MAX_PAYMENT, MESSAGE, SELECTOR } from "../utils";

function PaymentForm(props) {
  const messageRef = React.createRef();

  const handleSubmit = event => {
    event.preventDefault();

    const $input = event.target[SELECTOR.ID.PAYMENT_INPUT];
    const $message = messageRef.current;
    const money = Number($input.value);

    if (!isValidPayment(money)) {
      $message.innerText = MESSAGE.PAYMENT_FORM.INVALID_PAYMENT;

      return;
    }

    props.publishLotteries(money);
  };

  //TODO: 이 함수의 존재 다시 고민하기
  const isValidPayment = value => {
    return value > 0 && value % LOTTERY.PRICE === 0;
  };

  const handleInputCheck = ({ target }) => {
    if (target.value === "") {
      props.setMoney(null);

      return;
    }

    const money = Number(target.value);
    const $message = messageRef.current;

    props.setMoney(money);

    if (isValidPayment(money)) {
      $message.innerText = "";

      return;
    }

    $message.innerText = MESSAGE.PAYMENT_FORM.INVALID_PAYMENT;
  };

  return (
    <form className="mt-5" onSubmit={handleSubmit}>
      <label
        className="mb-2 d-inline-block"
        htmlFor={SELECTOR.ID.PAYMENT_INPUT}
      >
        구입할 금액을 입력해주세요.
      </label>
      <div className="d-flex">
        <input
          id={SELECTOR.ID.PAYMENT_INPUT}
          className="w-100 mr-2 pl-2"
          type="number"
          placeholder={`구입 금액 (${LOTTERY.PRICE}원 단위)`}
          onChange={handleInputCheck}
          max={MAX_PAYMENT}
          value={props.money ? props.money : ""}
          disabled={props.lotteries.length !== 0}
        />
        <button
          id={SELECTOR.ID.PAYMENT_SUBMIT}
          className="btn btn-cyan"
          type="submit"
          disabled={props.lotteries.length !== 0}
        >
          확인
        </button>
      </div>
      <p ref={messageRef}></p>
    </form>
  );
}

export default PaymentForm;
