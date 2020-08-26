import React from 'react';
import {Provider} from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import HomePage from './pages/HomePage';
import LocationPage from './pages/LocationPage';
// import SearchPage from './pages/SearchPage';
import SearchPage from './pages/SearchPage-2';
import NavbarComponent from './pages/components/layout/NavbarComponent';
import store, {persistor} from "./store/store";

// function App({store, persistor}) {
function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Router>
                    <NavbarComponent />
                    <Switch>
                        <Route exact path="/" component = {HomePage} />
                        <Route exact path="/search" component = {SearchPage} />
                        <Route exact path="/location" component = {LocationPage} />
                    </Switch>
                </Router>
            </PersistGate>
        </Provider>
    );
}
export default App;