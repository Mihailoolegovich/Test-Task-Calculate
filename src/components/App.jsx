import './App.css';
import { useEffect, useState } from 'react';

const calcSignsBtn = ['+', '-', '*', '/', '.'];
const calcNumBtn = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

export const App = () => {
  const [output, setOutput] = useState('');
  const [calculation, setCalculation] = useState('');

  const [position, setPosition] = useState(0);
  const [baseData, setBaseData] = useState([]);

  useEffect(() => {
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

    setBaseData(preState => {
      let r = preState.slice(0, position + 1);
      return [...r, calculation + btnValue];
    });

    if (!calcSignsBtn.includes(btnValue)) {
      setOutput(eval(calculation + btnValue).toString());
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
          eval(calculation);
        } catch (error) {
          alert('Not corect ');
          break;
        }
        setBaseData(preState => [...preState, eval(calculation).toString()]);
        break;

      default:
        break;
    }
  }

  return (
    <>
      <div className="container">
        <div className="inputs_tumba">
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
