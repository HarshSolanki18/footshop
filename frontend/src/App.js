import React from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./components/Screens/HomeScreen";
import CartScreen from './components/Screens/CartScreen';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProductScreen from "./components/Screens/ProductScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path='/cart/:id?'component={CartScreen}/>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
