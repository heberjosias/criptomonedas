import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';
import axios from 'axios';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;
const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;
const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align:left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display:block;
  }
`;

function App() {

  const [moneda , guardarMoneda] = useState('');
  const [criptomoneda , guardarCriptoMoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {
      
    const cotizarCriptomoneda = async () => {

      //evitamos la primer ejecución
      if(moneda === '') return;

      //consultar api para obtener cotización
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

      const resultado = await axios.get(url);

      //mostra spinner
      guardarCargando(true);

      //ocultar spinner
      setTimeout(()=>{

        guardarCargando(false);
        //guardar el estado de resultado
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      },1500);

      

    }  
    cotizarCriptomoneda();
  }, [moneda, criptomoneda])

    //mostrar spinner o resultado
    const componente = (cargando) ? <Spinner/> : <Cotizacion resultado={resultado} />


  return (
 
    <Contenedor>
        <div>
          <Imagen 
              src={imagen}
              alt="imagen cripto"
            />
        </div>
        <div>
            <Heading>Cotiza Criptomonedas al Instante</Heading>
            <Formulario
              guardarMoneda={guardarMoneda}
              guardarCriptoMoneda={guardarCriptoMoneda}
            />

            {componente}

            
        </div>
    </Contenedor>

  );
}

export default App;
