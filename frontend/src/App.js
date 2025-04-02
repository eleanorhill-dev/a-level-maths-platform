import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/BaseLayout';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage'; 
import TopicsPage from './pages/TopicsPage'; 
import RegisterPage from './pages/RegisterPage';
import AlgebraicExpressions from './pages/AlgebraicExpressions';
import Quadratics from './pages/Quadratics';
import EquationsAndInequalities from './pages/EquationsAndInequalities';
import GraphsAndTransformations from './pages/GraphsAndTransformations';
import StraightLineGraphs from './pages/StraightLineGraphs';
import Circles from './pages/Circles';
import AlgebraicMethods from './pages/AlgebraicMethods';
import BinomialExpansion from './pages/BinomialExpansion';
import TrigonometricRatios from './pages/TrigonometricRatios';
import TrigonometricIdentitiesAndEquations from './pages/TrigonometricIdentitiesAndEquations';
import Vectors from './pages/Vectors';
import Differentiation from './pages/Differentiation';
import Integration from './pages/Integration';
import ExponentialsAndLogarithms from './pages/ExponentialsAndLogarithms';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<TopicsPage />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/topics/algebraic-expressions" element={<AlgebraicExpressions />} />
        <Route path="/topics/quadratics" element={<Quadratics />} />
        <Route path="/topics/equations-and-inequalities" element={<EquationsAndInequalities />} />
        <Route path="/topics/graphs-and-transformations" element={<GraphsAndTransformations />} />
        <Route path="/topics/straight-line-graphs" element={<StraightLineGraphs />} />
        <Route path="/topics/circles" element={<Circles />} />
        <Route path="/topics/algebraic-methods" element={<AlgebraicMethods />} />
        <Route path="/topics/the-binomial-expansion" element={<BinomialExpansion />} />
        <Route path="/topics/trigonometric-ratios" element={<TrigonometricRatios />} />
        <Route path="/topics/trigonometric-identities-and-equations" element={<TrigonometricIdentitiesAndEquations />} />
        <Route path="/topics/vectors" element={<Vectors />} />
        <Route path="/topics/differentiation" element={<Differentiation />} />
        <Route path="/topics/integration" element={<Integration />} />
        <Route path="/topics/exponentials-and-logarithms" element={<ExponentialsAndLogarithms />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
