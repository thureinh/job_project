import React from 'react';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import AppAppBar from './modules/views/AppAppBar';
import LoginPage from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import withRoot from './modules/withRoot';

import {
    Routes,
    Route,
} from "react-router-dom";

function App() {
    return (
        <React.Fragment>
            <AppAppBar />
            <Routes>
                <Route path="/" element={<ProductHero />}></Route>
                <Route path="/sign-in" element={<LoginPage />}></Route>
                <Route path="/dashboard" element={ <Dashboard/> }></Route>
            </Routes>
            <AppFooter />
        </React.Fragment>
    );
}

export default withRoot(App);
