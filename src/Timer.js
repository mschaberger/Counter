import React, { useState, useEffect, useRef } from 'react';
import './Timer.css';
import swal from 'sweetalert';



const Timer = () => {

  const [segundos, setSegundos] = useState(0);
  const [activo, setActivo] = useState(false);
  const [tipo, setTipo] = useState('counter');

  function toggle() {
    setActivo(!activo);
  }

  function reset() {
    setSegundos(0);
    setActivo(false);
  }

  function cambioTipo() {
    if(tipo === 'counter') setTipo('countdown')
    if(tipo === 'countdown') setTipo('counter')
  }

  useEffect(() => {
    let intervalo = null;
    if (activo && tipo === 'counter') {
      intervalo = setInterval(() => {
        setSegundos(segundos => segundos + 1);
      }, 1000);
    }
    if (activo && tipo === 'countdown') {
      intervalo = setInterval(() => {
        setSegundos(segundos => segundos - 1);
      }, 1000);
    }
    if (!activo && segundos !== 0 && tipo === 'counter') {
      clearInterval(intervalo);
    }
    if (segundos <= 0 && tipo === 'countdown') {
      reset();
      clearInterval(intervalo);
    }

    return () => clearInterval(intervalo);
  }, [activo, segundos, tipo]);



  const myRef = useRef(null);
  function agregaSegundos() {
    // `current` apunta al elemento de entrada de texto montado
    let ref = myRef.current.value
    if (ref>0) {
      setSegundos(Number(ref))
    }else{
      swal('WARNING','Only positive numbers', 'warning')
    }
  }

  

  return (
    <div className="app">
      <div className="time">
        {segundos} 
      </div>
      <div className="row">
        <button className={`button button-primary button-primary-${activo ? 'active' : 'inactive'}`} onClick={toggle}>
          {activo ? 'Stop' : 'Start'}
        </button>
        <button className="button button-primary" onClick={reset}>
          Reset
        </button>
        <button className='btnfos btnfos-2' onClick={cambioTipo}>
          {tipo}
        </button>
        {tipo === 'countdown' && 
        <input className= 'input' type="number" ref={myRef} onChange={agregaSegundos} placeholder="Seconds" autoComplete="off"/>}
      </div>
    </div>
  );
};



export default Timer;
