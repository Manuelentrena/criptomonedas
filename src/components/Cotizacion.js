import React from "react";
import styled from "@emotion/styled";

const ResultadoDiv = styled.div`
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #fca350;
  padding: 0.5rem 2rem;
  border-radius: 10px;
  margin-top: 2rem;
`;

const Info = styled.p`
  font-size: 18px;

  span {
    font-weight: bold;
    color: #4647b9;
  }
`;

const Precio = styled.p`
  font-size: 30px;
  span {
    font-weight: bold;
    color: #b23330;
  }
`;

const Cotizacion = ({ resultado }) => {
  if (Object.keys(resultado).length === 0) return null;

  console.log(resultado);

  return (
    <ResultadoDiv>
      <Precio>
        El precio es: <span>{resultado.PRICE}</span>
      </Precio>
      <Info>
        Precio más alto del día: <span>{resultado.HIGHDAY}</span>
      </Info>
      <Info>
        Precio más bajo del día: <span>{resultado.LOWDAY}</span>
      </Info>
      <Info>
        Variación en las últimas 24h: <span>{resultado.CHANGEPCT24HOUR}</span>
      </Info>
      <Info>
        Última Actualización: <span>{resultado.LASTUPDATE}</span>
      </Info>
    </ResultadoDiv>
  );
};

export default Cotizacion;
