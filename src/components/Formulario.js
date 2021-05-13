import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";
import axios from "axios";
import Error from "./Error";

const Boton = styled.button`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326a60;
    cursor: pointer;
  }
`;

const Formulario = ({ setMoneda, setCriptomoneda }) => {
  //State delas criptomonedas
  const [listacripto, setListaCriptomonedas] = useState([]);
  const [error, setError] = useState(false);
  const MONEDAS = [
    { codigo: "USD", nombre: "Dolar de Estados Unidos" },
    { codigo: "MXN", nombre: "Peso Mexicano" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "CBP", nombre: "Libra Esterlina" },
  ];

  //Utilizar useMoneda
  const [moneda, SelectMonedas] = useMoneda("Elige tu Moneda", "", MONEDAS);
  //Utilizar Criptomoneda
  const [criptomoneda, SelectCripto] = useCriptomoneda(
    "Elige tu Criptomoneda",
    "",
    listacripto
  );

  //Ejecutar llamado a la API
  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

      const resultado = await axios.get(url);
      setListaCriptomonedas(resultado.data.Data);
    };
    consultarAPI();
  }, []);

  //Cuando el usuario hace submit
  const cotizarMoneda = (e) => {
    e.preventDefault();

    //Validar que el Form este relleno
    if (moneda === "" || criptomoneda === "") {
      setError(true);
      return;
    }
    //Una vez validado el form
    setError(false);
    setMoneda(moneda);
    setCriptomoneda(criptomoneda);
  };

  return (
    <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje="Hay un error" /> : null}
      <SelectMonedas />
      <SelectCripto />
      <Boton type="submit" value="Calcular">
        CALCULAR
      </Boton>
    </form>
  );
};

export default Formulario;
