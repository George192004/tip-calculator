import { useState } from "react";

export default function App() {
  return (
    <div>
      <Logo />
      <Container />
    </div>
  );
}

function Container() {
  const [bill, setBill] = useState("");
  const [selectTip, setSelectTip] = useState(false);
  const [numberPeople, setNumberPeople] = useState("");
  const [custom, setCustom] = useState("");

  const totalPerson = (bill / numberPeople).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const amountPerson = (
    (bill * selectTip || bill * custom) /
    100 /
    numberPeople
  ).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  function handleReset() {
    setBill("");
    setSelectTip(false);
    setNumberPeople("");
    setCustom("");
  }

  return (
    <div className="container">
      <div className="textbox">
        <BillInput bill={bill} onSetBill={setBill} />
        <SelectPercentage
          selectTip={selectTip}
          onSelectTip={setSelectTip}
          customTip={custom}
          onCustomTip={setCustom}
        />
        <NumberPeople numPeople={numberPeople} onNumPeople={setNumberPeople} />
      </div>
      <div className="money-box">
        <AmountPerson
          bill={bill}
          selectTip={selectTip}
          numPeople={numberPeople}
          amountPerson={amountPerson}
        />
        <TotalPerson
          bill={bill}
          selectTip={selectTip}
          numPeople={numberPeople}
          totalPerson={totalPerson}
        />
        <button className="reset-link" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

function BillInput({ bill, onSetBill }) {
  function handleBillInput(e) {
    onSetBill(
      e.target.value === "" ||
        (e.target.value >= 0 &&
          e.target.value[0] !== "0" &&
          e.target.value <= 100000)
        ? e.target.value
        : bill
    );
  }
  return (
    <div className="input-icons">
      <img className="icon" src="/assets/icon-dollar.svg" alt="dollar" />
      <label>Bill</label>
      <input
        type="number"
        className="bill-input"
        value={bill}
        onChange={handleBillInput}
        placeholder="0"
      />
    </div>
  );
}

function SelectPercentage({ selectTip, onSelectTip, customTip, onCustomTip }) {
  const percentages = [5, 10, 15, 25, 50];
  function handleSelect(cur) {
    onSelectTip(cur);
  }

  function handleSelectPercentage(e) {
    onCustomTip(
      e.target.value === "" ||
        (e.target.value <= 100 &&
          e.target.value > 0 &&
          e.target.value[0] !== "0")
        ? e.target.value
        : customTip
    );
  }

  return (
    <div>
      <p className="bill-text">Select Tip %</p>
      <div className="bill-grid">
        {percentages.map((cur, i) => (
          <button
            className={selectTip === cur ? "bill-group active" : "bill-group"}
            onClick={() => handleSelect(cur)}
            key={i}
          >
            <p className="bill-number">{cur}%</p>
          </button>
        ))}
        <input
          type="number"
          placeholder="custom"
          className="custom"
          value={customTip}
          onFocus={() => onSelectTip(false)}
          onChange={handleSelectPercentage}
        />
      </div>
    </div>
  );
}

function NumberPeople({ numPeople, onNumPeople }) {
  function handleNumberPeople(e) {
    const inputValue = e.target.value.trim();
    const intValue = Math.floor(Number(inputValue));

    onNumPeople(
      !isNaN(intValue) && intValue >= 0 && intValue < 1000
        ? intValue
        : numPeople
    );
  }

  return (
    <div className="input-icons">
      <img className="icon" src="/assets/icon-person.svg" alt="person" />
      <div className="flex">
        <label>Numbers of people</label>
        <label className="error">Can't be zero</label>
      </div>
      <input
        id="people"
        type="text"
        className="bill-input"
        placeholder="0"
        value={numPeople}
        onChange={handleNumberPeople}
      />
    </div>
  );
}

function AmountPerson({ bill, numPeople, amountPerson }) {
  const shouldDisplay = bill && numPeople;

  return (
    <div className="amount">
      <div className="1">
        <p className="amount-text">Tip amount</p>
        <p className="amount-person">/ person</p>
      </div>
      <div className="price-div">
        <p className="price">${shouldDisplay ? amountPerson : "0.00"}</p>
      </div>
    </div>
  );
}

function TotalPerson({ bill, numPeople, totalPerson }) {
  const shouldDisplay = bill && numPeople;

  return (
    <div className="total">
      <div className="3">
        <p className="total-text">Total</p>
        <p className="total-person">/ person</p>
      </div>
      <div className="price-div">
        <p className="price">${shouldDisplay ? totalPerson : "0.00"}</p>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="logo">
      <img src="/assets/logo.svg" alt="logo" />
    </div>
  );
}
