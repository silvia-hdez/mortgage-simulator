import { useState } from 'react'

import './App.css'

function App() {

const initialValues = {
  precio: 200000,
  prestamo: 200000 * 0.8,
  plazo: 30,
  interes: 2.9,
  gastos:200000 * 0.12
}



const [state, setState] = useState(initialValues) 

const handleChange = (e) => {
  setState((prevProps) => ({
    ...prevProps,
    [e.target.name] : parseFloat(e.target.value)
  }))
}

const calcularGastos = () => {

  const nuevosGastos = state.precio * 0.12;
  setState((prevState) => ({
    ...prevState,
    gastos: nuevosGastos
  }));
};



  const tipoInteres = state.interes/12
  const numerador = state.prestamo * Math.pow(1+tipoInteres/100, state.plazo*12) * (tipoInteres/100)
  const denominador = Math.pow(1+tipoInteres/100, state.plazo*12) - 1
  const cuota = Math.round(numerador / denominador)

  let interesAcumulado = 0
  let amortizadoAcumulado = 0
  let capitalPendiente = state.prestamo
  

  
    if(interesAcumulado === 0) {
      interesAcumulado = (state.prestamo * (state.interes/100))/12
      amortizadoAcumulado = cuota-interesAcumulado
      capitalPendiente - amortizadoAcumulado
    } else {
      for (let i=0; i<(state.plazo*12)-1; i++) {
        const interes = (capitalPendiente * (state.interes/100))/12
        amortizadoAcumulado += cuota-interes
        return interesAcumulado + interes
        
      }
    } 
    



  return (
    <>
      <h1>Prueba simulador</h1>

     <form >
        <div>
          <label>Precio del inmueble</label>
          <input 
            type='number' 
            name='precio' 
            value={state.precio}
            onChange={handleChange}  
          />
        </div>

        <div>
          <label>Importe hipoteca</label>
          <input 
            type='number' 
            name='prestamo'
            value={state.prestamo}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Plazo en años</label>
          <input 
            type='number' 
            name='plazo'
            value={state.plazo}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Tipo de interés</label>
          <input 
            type='number' 
            name='interes'
            value={state.interes}
            onChange={handleChange}
          />
        </div>

        <button type="button" onClick={calcularGastos}>Calcular</button>
    </form> 
      <div>
        <h4>Gastos compraventa</h4>
        <h5>{state.gastos}€</h5>
      </div>
      <div>
        <h4>Cuota</h4>
        <h5>{cuota}€</h5>
      </div>  
      <div>
        <h4>Intereses</h4>
        <h5>{interesAmortizacion}€</h5>
      </div>
    </>
  )
}

export default App
