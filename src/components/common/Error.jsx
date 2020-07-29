import React from "react";
import styled from 'styled-components'

const ErrorStyles = styled.div`
  font-weight: lighter;
  color: #f44336;
`;

const Error = ({ touched, message }) => {
  if (!touched) {
    return <ErrorStyles><div className="form-message invalid" >&nbsp;</div></ErrorStyles>;
  }
  if (message) {
    return <ErrorStyles><div className="form-message invalid">{message}</div></ErrorStyles>;
  }
  //return <div className="form-message invalid">&nbsp;</div>;
};

export default Error;