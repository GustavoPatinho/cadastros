import React from "react";
import {
  BrowserRouter,
  Routes as ReactRoutes,
  Route,
  Link,
} from "react-router-dom";
import Form from "../screens/Form";
import Home from "../screens/Home";

// import { Container } from './styles';

const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/edit/:sku" element={<Form mode="Edição" />}></Route>
        <Route path="/create" element={<Form mode="Criação" />}></Route>
      </ReactRoutes>
    </BrowserRouter>
  );
};

export default Routes;
