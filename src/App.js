import React from 'react';
import {Provider} from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { LastLocationProvider } from 'react-router-last-location';

import HomePage from './pages/HomePage';
// import LocationPage from './pages/LocationPage';
import LocationPage from './pages/LocationPage-2';
import OrderPage from './pages/OrderPage';
import CheckOutPage from './pages/CheckOutPage';
// import SearchPage from './pages/SearchPage';
import SearchPage from './pages/SearchPage-2';
import Login from './pages/Login';
import Register from './pages/Register';
import NavbarComponent from './pages/components/layout/NavbarComponent';
import store, {persistor} from "./store/store";

import PrivateRoute from './common/PrivateRoute';

// function App({store, persistor}) {
function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Router>
                    <LastLocationProvider>
                        <NavbarComponent />
                        <Switch>
                            {/* <Route exact path="/" component = {HomePage} /> */}
                            <Route exact path="/" component = {SearchPage} />
                            <Route exact path="/location" component = {LocationPage} />
                            <Route exact path="/login" component = {Login} />
                            <Route exact path="/register" component = {Register} />
                            <PrivateRoute exact path = "/order" component = {OrderPage}/>
                            <PrivateRoute exact path = "/checkout" component = {CheckOutPage}/>
                        </Switch>
                    </LastLocationProvider>
                </Router>
            </PersistGate>
        </Provider>
    );
}
export default App;
