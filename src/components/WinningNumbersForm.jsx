import React, { useState } from "react";
import { hasDuplicatedNumber, LOTTERY, MESSAGE } from "../utils";

function WinningNumbersForm(props) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [winningNumbers, setWinningNumbers] = useState(
    Array(LOTTERY.NUMBER_COUNT).fill(null)
  );
  const [bonusNumber, setBonusNumber] = useState(null);
  const messageRef = React.createRef();

  const handleSubmit = event => {
    event.preventDefault();

    const inputNumbers = [...winningNumbers, bonusNumber];
    const $input = messageRef.current;

    if (hasDuplicatedNumber(inputNumbers)) {
      $input.innerText = MESSAGE.WINNING_NUMBERS_FORM.HAS_DUPLICATED_NUMBER;

      return;
    }

    $input.innerText = "";
    setIsSubmit(true);
    props.setWinningResult(winningNumbers, bonusNumber);
  };

  const handleWinningNumberChange = ({ target }) => {
    const targetIndex = Number(target.dataset.index);
    const updatedWinningNumbers = winningNumbers.map((number, index) => {
      if (index !== targetIndex) {
        return number;
      }

      return Number(target.value);
    });

    setWinningNumbers(updatedWinningNumbers);
  };

  const handleBonusNumberChange = ({ target }) => {
    const updatedBonusNumber = target.value;

    setBonusNumber(updatedBonusNumber);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-9">
      <label className="flex-auto d-inline-block mb-3">
        지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.
      </label>
      <div className="d-flex">
        <div>
          <h4 className="mt-0 mb-3 text-center">당첨 번호</h4>
          <div>
            {winningNumbers.map((_, index) => (
              <input
                key={index}
                onChange={handleWinningNumberChange}
                data-index={index}
                className="winning-number mx-1 text-center"
                type="number"
                min={LOTTERY.MIN_NUMBER}
                max={LOTTERY.MAX_NUMBER}
                required
                disabled={isSubmit}
              ></input>
            ))}
          </div>
        </div>
        <div className="bonus-number-container flex-grow">
          <h4 className="mt-0 mb-3 text-center">보너스 번호</h4>
          <div className="d-flex justify-center">
            <input
              className="bonus-number text-center"
              onChange={handleBonusNumberChange}
              type="number"
              min={LOTTERY.MIN_NUMBER}
              max={LOTTERY.MAX_NUMBER}
              disabled={isSubmit}
              required
            />
          </div>
        </div>
      </div>
      <p ref={messageRef}></p>
      <button
        type="submit"
        className="open-result-modal-button mt-5 btn btn-cyan w-100"
      >
        결과 확인하기
      </button>
    </form>
  );
}

export default WinningNumbersForm;
