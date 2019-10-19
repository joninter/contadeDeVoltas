import React, { useState, useEffect } from 'react';

import './styles.css';

//Componentes Internos
import MostraVoltas from './MostraVoltas';
import MostraTempo from './MostraTempo';
import Button from './Button';

function App() {
  const [numVoltas, setNumVoltas] = useState(0);
  const [running, setRunnig] = useState(false);
  const [tempo, setTempo] = useState(0);

  useEffect(() => {
    let timer = null;
    if (running) {
      timer = setInterval(() => {
        setTempo(old => old + 1);
      }, 1000);
    }
    return () => {
      if (timer) {
        //truthy valor que é convertido para verdadeiro
        clearInterval(timer);
      }
    };
  }, [running]);

  const toggleRunning = () => {
    setRunnig(!running);
  };

  const increment = () => {
    setNumVoltas(numVoltas + 1);
  };
  const decrement = () => {
    if (numVoltas > 0) {
      setNumVoltas(numVoltas - 1);
    }
  };
  const reset = () => {
    setNumVoltas(0);
    setTempo(0);
  };
  return (
    <div className="App">
      <MostraVoltas voltas={numVoltas} />
      <Button className="bigger" text="+" onClick={increment} />
      <Button className="bigger" text="-" onClick={decrement} />
      {numVoltas > 0 && <MostraTempo tempo={Math.round(tempo / numVoltas)} />}
      <Button onClick={toggleRunning} text={running ? 'Pausar' : 'Iniciar'} />
      <Button onClick={reset} text="Reiniciar" />
    </div>
  );
}

export default App;
