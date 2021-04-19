import React, { useState } from "react";
import { LotteryMachine, ProfitCalculator } from "../services";
import LotteriesDetail from "./LotteriesDetail";
import PaymentForm from "./PaymentForm";
import WinningNumbersForm from "./WinningNumbersForm";
import WinningResultModal from "./WinningResultModal";

function App() {
  const lotteryMachine = new LotteryMachine();
  const profitCalculator = new ProfitCalculator();
  const [money, setMoney] = useState(null);
  const [lotteries, setLotteries] = useState([]);
  const [winningResult, setWinningResult] = useState(null);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  const closeResultModal = () => {
    setIsResultModalOpen(false);
  };

  const resetApp = () => {
    setMoney(null);
    setLotteries([]);
    setWinningResult(null);
    setIsResultModalOpen(false);
  };

  return (
    <div id="app" className="d-flex justify-center mt-5">
      <div className="w-100">
        <h1 className="text-center">🎱 행운의 로또</h1>
        <PaymentForm
          money={money}
          lotteries={lotteries}
          setMoney={setMoney}
          publishLotteries={money => {
            const publishedLotteries = lotteryMachine.publishLotteries(money);

            setLotteries(publishedLotteries);
          }}
        />
        {lotteries.length > 0 && (
          <>
            <LotteriesDetail lotteries={lotteries} />
            <WinningNumbersForm
              setWinningResult={(winningNumbers, bonusNumber) => {
                const rankCount = profitCalculator.getRankCount({
                  winningNumbers,
                  bonusNumber,
                  lotteries,
                });
                const earningRate = profitCalculator.getEarningRate(
                  rankCount,
                  lotteries
                );

                setWinningResult({ rankCount, earningRate });
                setIsResultModalOpen(true);
              }}
            />
          </>
        )}
        {winningResult && (
          <WinningResultModal
            winningResult={winningResult}
            isModalOpen={isResultModalOpen}
            closeModal={closeResultModal}
            resetApp={resetApp}
          />
        )}
      </div>
    </div>
  );
}

export default App;
