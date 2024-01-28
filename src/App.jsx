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

// const calcularGastos = () => {

//   const nuevosGastos = state.precio * 0.12;
//   setState((prevState) => ({
//     ...prevState,
//     gastos: nuevosGastos,
//     prestamo: state.precio*0.2
//   }));
// };

  const porcPrestamo = ((state.prestamo/state.precio)*100).toFixed(1)
  const gastos = state.precio * 0.12
  const costeTotal = state.precio + gastos

//Cálculo cuota

  const tipoInteres = state.interes/12
  const numerador = state.prestamo * Math.pow(1+tipoInteres/100, state.plazo*12) * (tipoInteres/100)
  const denominador = Math.pow(1+tipoInteres/100, state.plazo*12) - 1
  const cuota = (numerador / denominador).toFixed(2)


 //Cálculo total intereses


 // interés = capital pte * interés/100 / cuotas año

  let interesAcumulado = 0
  let amortizadoAcumulado = 0
  let capitalPendiente = state.prestamo
  

  for (let i=0; i< (state.plazo*12); i++) {
 
      
        const interes = ((capitalPendiente * (state.interes/100))/12)
        const cuotaActual = parseFloat(cuota);
        const capitalAmortizado = cuotaActual-interes

      interesAcumulado += interes
      amortizadoAcumulado += capitalAmortizado
      capitalPendiente -= capitalAmortizado

  } 


  interesAcumulado = interesAcumulado.toFixed(2)
  const interesNumero = parseInt(interesAcumulado)
  amortizadoAcumulado = amortizadoAcumulado.toFixed(2)

  console.log(amortizadoAcumulado)



  const totalCosteHipoteca = state.precio + interesNumero + gastos

  return (
    <>
      <h1>Prueba simulador</h1>
      <div className='simulador'>
        <div className='resultados'>
          <form className='formulario'>
            <div className='introDato'>
              <label>Precio del inmueble</label>
              <input 
              type='number' 
              name='precio' 
              value={state.precio}
              onChange={handleChange}  
              />
            </div>

            <div className='introDato'>
              <label>Importe hipoteca</label>
              <div className='porPrestamo'>
              <input 
                type='number' 
                name='prestamo'
                value={state.prestamo}
                onChange={handleChange}
              />
              <div className='porcentaje'>{porcPrestamo}%</div>
              </div>
              
            </div>

            <div className='introDato'>
              <label>Plazo en años</label>
              <input 
                type='number' 
                name='plazo'
                value={state.plazo}
                onChange={handleChange}
              />
            </div>

            <div className='introDato'>
              <label>Tipo de interés</label>
              <input 
                type='number' 
                name='interes'
                value={state.interes}
                onChange={handleChange}
              />
            </div>

            {/* <button type="button" onClick={calcularGastos}>Calcular</button> */}
          </form> 
        </div>
          
        <div className='resultados'>
          {/* <div>
          <h4>Gastos compraventa</h4>
          <h5>{state.gastos}€</h5>
          </div> */}
          <div>
            <h4>Cuota mensual</h4>
            <h5>{cuota}€</h5>
          </div>  
          <div className='tiposCostes'>
            
              <div>
                <h4>Precio del inmueble</h4>
                <h5>{state.precio}€</h5>
              <div>
                <h4>Gastos Aproximados</h4>
                <h5>{gastos}€ (12%)</h5>
              </div>
              <div>
                <h4>Coste total inmueble</h4>
                <h5>{costeTotal}€</h5>
              </div>
            </div>  

            <div>

              <div>
                <h4>Importe hipoteca</h4>
                <h5>{state.prestamo}€</h5>
              </div>
              <div>
                <h4>Intereses hipoteca</h4>
                <h5>{interesAcumulado}€</h5>
              </div>
              
              <div>
                <h4>Coste total inmueble con hipoteca</h4>
                <h5>{totalCosteHipoteca}€</h5>
              </div>
            </div>  
          
            
            
          </div>
        </div>
      </div>
      
      
    </>
  )
}

export default App
