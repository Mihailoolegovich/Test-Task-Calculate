import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import calculateString from 'calculate-string';

import { useRef } from 'react';

const calcSignsBtn = ['+', '-', '*', '/', '.'];
const calcNumBtn = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

// axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.baseURL = 'https://test-task-calculate.herokuapp.com/';

export const App = () => {
  const [output, setOutput] = useState('');
  const [calculation, setCalculation] = useState('');

  const [position, setPosition] = useState(0);
  const [baseData, setBaseData] = useState([]);

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const localPersonId = sessionStorage.getItem('myPeronId');
    if (!localPersonId) {
      axios
        .post('/api/calculator')
        .then(response =>
          sessionStorage.setItem('myPeronId', response.data.calc._id)
        );
      return;
    }

    axios
      .get(`/api/calculator/${localPersonId}`)
      .then(response => setBaseData(response.data.calc.value));
  }, []);

  useEffect(() => {
    if (baseData.length > 0) {
      axios.put(`/api/calculator/${sessionStorage.getItem('myPeronId')}`, {
        value: baseData,
      });
    }
    setPosition(baseData.length - 1);
  }, [baseData]);

  useEffect(() => {
    if (baseData[position] === undefined) {
      return;
    }
    setCalculation(baseData[position]);
  }, [baseData, position]);

  function updateCalculate(btnValue) {
    if (
      calcSignsBtn.includes(btnValue) &
      calcSignsBtn.includes(calculation.slice(-1))
    ) {
      return;
    }

    if (btnValue === '.') {
      calculation.length === 0
        ? setCalculation(0 + btnValue)
        : setCalculation(calculation + btnValue);
      return;
    }

    if (calculation === 0 ?? calculation === '0') {
      setCalculation(btnValue);
      return;
    }
    setCalculation(calculation + btnValue);
    // setBaseData(preState => {
    //   let r = preState.slice(0, position + 1);
    //   return [...r, calculation + btnValue];
    // });

    if (!calcSignsBtn.includes(btnValue)) {
      setOutput(calculateString(calculation + btnValue).toString());
    }
  }

  function ClickOperation(operator) {
    switch (operator) {
      case 'C':
        setCalculation('');
        setOutput('');

        break;
      case '=':
        try {
          calculateString(calculation);
        } catch (error) {
          alert('Not corect ');
          break;
        }

        setBaseData(preState => [
          ...preState,
          calculateString(calculation).toString(),
        ]);
        break;

      default:
        break;
    }
  }

  function cleanHistory() {
    setBaseData(['']);
    setCalculation('');
    setOutput('');
  }
  return (
    <>
      <div className="container">
        <div className="inputs_tumba">
          <div className="inputs_tumba--buttons">
            <button className="history_btn" onClick={() => cleanHistory()}>
              Clear History
            </button>
            <div>
              <button
                className="history_btn"
                onClick={() => setPosition(position - 1)}
                disabled={position === 0}
              >
                <img
                  width={'30px'}
                  alt={'emoji '}
                  src={'https://cdn-icons-png.flaticon.com/512/565/565344.png'}
                />
              </button>
              <button
                className="history_btn"
                onClick={() => setPosition(position + 1)}
                disabled={position === baseData.length - 1}
              >
                <img
                  width={'30px'}
                  alt={'emoji '}
                  src={'https://cdn-icons-png.flaticon.com/512/565/565331.png'}
                />
              </button>
            </div>
          </div>
          <p className="output">{output || '0'}</p>
          <p className="calc">{calculation || ''}</p>
        </div>
        <div className="buttons_tumba">
          <div className="buttons_tumba--signs">
            {calcSignsBtn.map(el => {
              return (
                <button key={el} onClick={() => updateCalculate(el.toString())}>
                  {el}
                </button>
              );
            })}
            <button onClick={() => ClickOperation('C')}>{'C'}</button>
            <button onClick={() => ClickOperation('=')}>{'='}</button>
          </div>
          <div className="buttons_tumba--num">
            {calcNumBtn.map(el => {
              return (
                <button key={el} onClick={() => updateCalculate(el.toString())}>
                  {el}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
