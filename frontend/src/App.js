import React from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./components/Screens/HomeScreen";
import CartScreen from './components/Screens/CartScreen';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProductScreen from "./components/Screens/ProductScreen";
import LoginScreen from "./components/Screens/LoginScreen";
import RegisterScreen from "./components/Screens/RegisterScreen";
import ProfileScreen from "./components/Screens/ProfileScreen";
import ShippingScreen from "./components/Screens/ShippingScreen";
import ResetMailScreen from "./components/Screens/ResetMailScreen";
import ResetPasswordScreen from "./components/Screens/ResetPasswordScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path='/cart/:id?'component={CartScreen}/>
          <Route path='/login' component={LoginScreen}/>
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen}/>
          <Route path='/shipping' component={ShippingScreen}/>
          <Route path='/resetmail' component={ResetMailScreen}/>
          <Route path='/resetpassword/:token' component={ResetPasswordScreen}/>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
