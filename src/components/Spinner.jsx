import React from 'react';
import styled, { keyframes } from 'styled-components';
import './Spinner.css';

function Spinner() {
  let spin3D = keyframes`
from {
  transform: rotate3d(0.5, 0.5, 0.5, 360deg)}
  to {
    transform: rotate3d(0deg)}
`;
  const BlueOrbit = styled.div`
    animation: ${spin3D} 3s linear 0.2s infinite;
  `;
  const GreenOrbit = styled.div`
    animation: ${spin3D} 2s linear 0s infinite;
  `;
  const RedOrbit = styled.div`
    animation: ${spin3D} 1s linear 0s infinite;
  `;
  const WhiteOrbit = styled.div`
    animation: ${spin3D} 10s linear 0s infinite;
  `;

  return (
      <div className="spinner-box">
        <BlueOrbit className="blue-orbit leo"></BlueOrbit>
        <GreenOrbit className="green-orbit leo"></GreenOrbit>
        <RedOrbit className="red-orbit leo"></RedOrbit>
        <WhiteOrbit className="white-orbit w1 leo"></WhiteOrbit>
        <WhiteOrbit className="white-orbit w2 leo"></WhiteOrbit>
        <WhiteOrbit className="white-orbit w3 leo"></WhiteOrbit>
    </div>
  );
}

export default Spinner;
