import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BaseLayout from "./components/BaseLayout";
import HomePage from "./pages/HomePage";
import TopicsPage from "./pages/TopicsPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
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
import RequireAuthentication from "./RequireAuthentication";
import QuizPage from "./pages/QuizPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import DataCollection from "./pages/DataCollection";
import MeasuresOfLocationAndSpread from "./pages/MeasuresOfLocationAndSpread";
import RepresentationsOfData from "./pages/RepresentationsOfData";
import Correlation from "./pages/Correlation";
import Probability from "./pages/Probability";
import StatisticalDistributions from "./pages/StatisticalDistributions";
import { Toaster } from "sonner";


const App = () => {
  return (
    <Router>
      <BaseLayout>
      <Toaster richColors />
        <Routes>
          <Route path="/" element={<RequireAuthentication><HomePage /></RequireAuthentication>} />
          <Route path="/topics" element={<RequireAuthentication><TopicsPage /></RequireAuthentication>} />
          <Route path="/profile" element={<RequireAuthentication><ProfilePage /></RequireAuthentication>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/quiz/:topicId" element={<RequireAuthentication><QuizPage /></RequireAuthentication>} />
          <Route path="/topics/algebraic-expressions" element={<RequireAuthentication><AlgebraicExpressions /></RequireAuthentication>} />
          <Route path="/topics/quadratics" element={<RequireAuthentication><Quadratics /></RequireAuthentication>} />
          <Route path="/topics/equations-and-inequalities" element={<RequireAuthentication><EquationsAndInequalities /></RequireAuthentication>} />
          <Route path="/topics/graphs-and-transformations" element={<RequireAuthentication><GraphsAndTransformations /></RequireAuthentication>} />
          <Route path="/topics/straight-line-graphs" element={<RequireAuthentication><StraightLineGraphs /></RequireAuthentication>} />
          <Route path="/topics/circles" element={<RequireAuthentication><Circles /></RequireAuthentication>} />
          <Route path="/topics/algebraic-methods" element={<RequireAuthentication><AlgebraicMethods /></RequireAuthentication>} />
          <Route path="/topics/the-binomial-expansion" element={<RequireAuthentication><BinomialExpansion /></RequireAuthentication>} />
          <Route path="/topics/trigonometric-ratios" element={<RequireAuthentication><TrigonometricRatios /></RequireAuthentication>} />
          <Route path="/topics/trigonometric-identities-and-equations" element={<RequireAuthentication><TrigonometricIdentitiesAndEquations /></RequireAuthentication>} />
          <Route path="/topics/vectors" element={<RequireAuthentication><Vectors /></RequireAuthentication>} />
          <Route path="/topics/differentiation" element={<RequireAuthentication><Differentiation /></RequireAuthentication>} />
          <Route path="/topics/integration" element={<RequireAuthentication><Integration /></RequireAuthentication>} />
          <Route path="/topics/exponentials-and-logarithms" element={<RequireAuthentication><ExponentialsAndLogarithms /></RequireAuthentication>} />
          <Route path="/topics/data-collection" element={<RequireAuthentication><DataCollection /></RequireAuthentication>} />
          <Route path="/topics/measures-of-location-and-spread" element={<RequireAuthentication><MeasuresOfLocationAndSpread /></RequireAuthentication>} />
          <Route path="/topics/representations-of-data" element={<RequireAuthentication><RepresentationsOfData /></RequireAuthentication>} />
          <Route path="/topics/correlation" element={<RequireAuthentication><Correlation /></RequireAuthentication>} />
          <Route path="/topics/probability" element={<RequireAuthentication><Probability /></RequireAuthentication>} />
          <Route path="/topics/statistical-distributions" element={<RequireAuthentication><StatisticalDistributions /></RequireAuthentication>} />
        </Routes>
      </BaseLayout>
    </Router>
  );
};

export default App;
