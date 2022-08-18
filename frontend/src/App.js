import React from 'react';
import ProductHero from './modules/views/ProductHero';
import AppAppBar from './modules/views/AppAppBar';
import LoginPage from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './modules/ProtectedRoute';
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
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                </Route>
            </Routes>
        </React.Fragment>
    );
}

export default withRoot(App);
