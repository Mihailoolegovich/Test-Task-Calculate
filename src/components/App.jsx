import './App.css';
import { useEffect, useState, useRef } from 'react';
// import fixerApiData from '../data/fixerApiData.json';
import axios from 'axios';
// import { Header } from './Header/Header';
// import { Currency } from './Currency/Currency';

const calculateSignsBtn = ['+', '-', '*', '/'];
const calculateNumBtn = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.'];

// const calculateNumBtn = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '*', '/', '.'];
const calculateOperationBtn = ['=', 'C'];

export const App = () => {
  const [output, setOutput] = useState('');
  const [calculation, setCalculation] = useState('');

  const [position, setPosition] = useState(0);
  const [baseData, setBaseData] = useState([]);

  const firstRender = useRef(false);

  useEffect(() => {
    if (!firstRender.current) {
      firstRender.current = true;
      return;
    }
    if (position < baseData.length - 1) {
      setBaseData(preState => {
        let r = preState.slice(0, position);
        return [...r, calculation];
      });
      return;
    }

    setBaseData(preState => [...preState, calculation]);
  }, [calculation]);

  useEffect(() => {
    setPosition(baseData.length - 1);
  }, [baseData]);

  useEffect(() => {
    if (!firstRender.current) {
      firstRender.current = true;
      return;
    }
    setCalculation(baseData[position]);
  }, [position]);

  // useEffect(() => {
  //   console.log('disBtnUndo', disBtnUndo);

  //   position !== 0 ? (disBtnUndo = true) : (disBtnUndo = false);
  //   position !== baseData.length ? (disBtnRedo = true) : (disBtnRedo = false);
  // }, [position]);

  // const [currencyTwo, setCurrencyTwo] = useState('USD');
  // const [rates, setRates] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(
  //       'https://api.apilayer.com/fixer/latest?symbols=USD%2CEUR%2CRUB%2CBYN%2CGBP%2CPLN%2CUAH&base=UAH&apikey=gpUpYLM9pOIPka8iVbUCbLNy1utDkk6i'
  //     )
  //     .then(response => setRates(response.data.rates));
  // }, []);

  function updateCalculate(btnValue) {
    // const btnValue = e.target.textContent;
    if (
      calculateSignsBtn.includes(btnValue) & (calculation === '') ||
      calculateSignsBtn.includes(btnValue) &
        calculateSignsBtn.includes(calculation.slice(-1))
    ) {
      return;
    }

    // if (btnValue === '.') {
    //   calculation.length > 1
    //     ? setCalculation(calculation + 0 + btnValue)
    //     : setCalculation(calculation + btnValue);
    //   return;
    // }

    // if (calculation === 0 ?? calculation === '0') {
    //   setCalculation(btnValue);
    //   return;
    // }
    // if (calculation.length > 1) {
    //   btnValue === '.'
    //     ? setCalculation(calculation + 0 + btnValue)
    //     : setCalculation(btnValue);
    //   return;
    // }

    // calculation === 0 ? setCalculation(value) : value === '.';
    // if (calculation === 0) {
    //   btnValue === '.'
    //     ? setCalculation(calculation + btnValue)
    //     : setCalculation(btnValue);
    //   return;
    // }
    // if (e.target.textContent) {
    // }

    if (position !== baseData.length) {
      console.log('find bag');
      setCalculation(baseData[position] + btnValue);
      console.log('baseData[position]', baseData[position]);
      return;
    }

    setCalculation(calculation + btnValue);
    console.log(btnValue);
    // console.log(e.currentTarget.value);
  }

  function ClickOperation(operator) {
    console.log(operator);
    switch (operator) {
      case 'C':
        setCalculation(0);
        setOutput(0);

        break;
      case '=':
        console.log(eval(calculation));
        setOutput(eval(calculation));
        setCalculation(eval(calculation));

        break;

      default:
        break;
    }
  }

  function UndoClick() {
    // position - 1 < 0 ? (disBtnUndo = true) : (disBtnUndo = false);
    // if (position - 1 < 0) {

    // }
    setPosition(position - 1);
  }
  function RedoClick() {
    setPosition(position + 1);
  }
  return (
    <>
      <button onClick={UndoClick} disabled={position === 0}>
        Undo
      </button>
      <button onClick={RedoClick} disabled={position === baseData.length - 1}>
        Redo
      </button>

      <div className="container">
        <div className="inputsTumba">
          <p className="output">{output || '0'}</p>
          <p className="output  ">{calculation || ''}</p>
          {/* <p className="output  ">{baseData[position] || ''}</p> */}

          {/* <input
            className="input"
            onChange={() => ChangeInput(even)}
            value={calculation}
          ></input> */}
          {/* <input className="input" value={baseData[position]}></input> */}

          {/* <input className="input" onChange={()=> ChangeInput(even)} value={calculation}></input> */}
        </div>
        <div className="buttonsTumba">
          {calculateSignsBtn.map(el => {
            return (
              <button onClick={() => updateCalculate(el.toString())}>
                {el}
              </button>
            );
          })}
          {calculateOperationBtn.map(el => {
            return <button onClick={() => ClickOperation(el)}>{el}</button>;
          })}
        </div>
        <div className="buttonsTumba">
          {calculateNumBtn.map(el => {
            return (
              <button onClick={() => updateCalculate(el.toString())}>
                {el}
              </button>
            );
          })}
        </div>
      </div>
      {/* <Header
        usdCurrency={roundNum(1 / rates['USD'])}
        eurCurrency={roundNum(1 / rates['EUR'])}
      />

      <div className="container_currency">
        <div className="platform_currency">
          <h2 className="platform_currency--title">I have</h2>
          <Currency
            calculationue={amountOne}
            changeInput={changeAmountOne}
            selectValue={currencyOne}
            selectChange={changeCurrencyOne}
            currencyKeys={Object.keys(rates)}
          />
          <span className="platform_currency--about">
            {`1 ${currencyOne}  = ${roundNum(
              coefficient(currencyTwo, currencyOne)
            )} ${currencyTwo}`}
          </span>
        </div>
        <div className="platform_currency">
          <h2 className="platform_currency--title">I will get</h2>
          <Currency
            calculationue={amountTwo}
            changeInput={changeAmountTwo}
            selectValue={currencyTwo}
            selectChange={changeCurrencyTwo}
            currencyKeys={Object.keys(rates)}
          />
          <span className="platform_currency--about">
            {`1 ${currencyTwo}  = ${roundNum(
              coefficient(currencyOne, currencyTwo)
            )} ${currencyOne}`}
          </span>
        </div>
      </div> */}
    </>
  );
};
