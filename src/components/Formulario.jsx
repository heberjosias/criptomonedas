import React, {useEffect, useState} from 'react'
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptmoneda from '../hooks/useCriptomoneda'; 
import Error from './Error'; 
import axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`

const Formulario = ({guardarMoneda, guardarCriptoMoneda}) => {

    //state del listado de cripto
    const [listacripto, guardarCriptomonedas] = useState([]);
    const [error, guadarError] = useState(false);

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar Americano'},
        { codigo: 'MXN', nombre: 'Peso Mexicano'},
        { codigo: 'EUR', nombre: 'Euro'},
        { codigo: 'GBP', nombre: 'Libra Esterlina'}
    ]

    //utilizar moneda
    const [moneda, SelectMonedas] = useMoneda('Elige tu Moneda','',MONEDAS);

    // utilizar useCriptomoneda
    const [criptomoneda, SelectCripto] = useCriptmoneda('Elige tu Criptomoneda','',listacripto);

    //ejecutar llamado a la API
    useEffect(() => {

        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);

            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    }, [])

    //cuando usuario hace submit
    const cotizarMoneda = e =>{
        e.preventDefault();

        //validar
        if(moneda === '' || criptomoneda ===''){
            guadarError(true);
            return; 
        }

        // pasar datos al componente principal
        guadarError(false)
        guardarMoneda(moneda)
        guardarCriptoMoneda(criptomoneda)

    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios"/> : null}
            <SelectMonedas/>            
            <SelectCripto/>
            
            <Boton
                type="submit"
                value="Calcular"
            />

        </form>
     );
}
 
export default Formulario;