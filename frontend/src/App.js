import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RequireAuthentication from "./RequireAuthentication";
import { Toaster } from "sonner";

// Import Main Pages
import BaseLayout from "./components/BaseLayout";
import HomePage from "./pages/HomePage";
import TopicsPage from "./pages/TopicsPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/RegisterPage';
import QuizPage from "./pages/QuizPage";
import AnalyticsPage from "./pages/AnalyticsPage";

// Import AS Pure Topics
import AlgebraicExpressions from './pages/AS-Pure/AlgebraicExpressions';
import Quadratics from './pages/AS-Pure/Quadratics';
import EquationsAndInequalities from './pages/AS-Pure/EquationsAndInequalities';
import GraphsAndTransformations from './pages/AS-Pure/GraphsAndTransformations';
import StraightLineGraphs from './pages/AS-Pure/StraightLineGraphs';
import Circles from './pages/AS-Pure/Circles';
import AlgebraicMethods from './pages/AS-Pure/AlgebraicMethods';
import BinomialExpansion from './pages/AS-Pure/BinomialExpansion';
import TrigonometricRatios from './pages/AS-Pure/TrigonometricRatios';
import TrigonometricIdentitiesAndEquations from './pages/AS-Pure/TrigonometricIdentitiesAndEquations';
import Vectors from './pages/AS-Pure/Vectors';
import Differentiation from './pages/AS-Pure/Differentiation';
import Integration from './pages/AS-Pure/Integration';
import ExponentialsAndLogarithms from './pages/AS-Pure/ExponentialsAndLogarithms';

// Import AS Stats and Mechanics Topics
import DataCollection from "./pages/AS-StatsMechanics/DataCollection";
import MeasuresOfLocationAndSpread from "./pages/AS-StatsMechanics/MeasuresOfLocationAndSpread";
import RepresentationsOfData from "./pages/AS-StatsMechanics/RepresentationsOfData";
import Correlation from "./pages/AS-StatsMechanics/Correlation";
import Probability from "./pages/AS-StatsMechanics/Probability";
import StatisticalDistributions from "./pages/AS-StatsMechanics/StatisticalDistributions";
import HypothesisTesting from "./pages/AS-StatsMechanics/HypothesisTesting";
import ModellingInMechanics from "./pages/AS-StatsMechanics/ModellingInMechanics";
import ConstantAcceleration from "./pages/AS-StatsMechanics/ConstantAcceleration";
import ForcesAndMotion from "./pages/AS-StatsMechanics/ForcesAndMotion";
import VariableAcceleration from "./pages/AS-StatsMechanics/VariableAcceleration";

// Import A-Level Pure Topics
import AlgebraicMethods2 from "./pages/A-Pure/AlgebraicMethods2";
import FunctionsAndGraphs from "./pages/A-Pure/FunctionsAndGraphs";
import SequencesAndSeries from "./pages/A-Pure/SequencesAndSeries";
import TheBinomialExpansion2 from "./pages/A-Pure/TheBinomialExpansion2";
import Radians from "./pages/A-Pure/Radians";
import TrigonometricFunctions from "./pages/A-Pure/TrigonometricFunctions";
import TrigonometryAndModelling from "./pages/A-Pure/TrigonometryAndModelling";
import ParametricEquations from "./pages/A-Pure/ParametricEquations";
import Differentiation2 from "./pages/A-Pure/Differentiation2";
import NumericalMethods from "./pages/A-Pure/NumericalMethods";
import Integration2 from "./pages/A-Pure/Integration2";
import Vectors2 from "./pages/A-Pure/Vectors2";

// Import A-Level Stats and Mechanics Topics
import RegressionCorrelationHypothesisTesting from "./pages/A-StatsMechanics/RegressionCorrelationHypothesisTesting";
import ConditionalProbability from "./pages/A-StatsMechanics/ConditionalProbability";
import TheNormalDistribution from "./pages/A-StatsMechanics/TheNormalDistribution";
import Moments from "./pages/A-StatsMechanics/Moments";
import ForcesAndFriction from "./pages/A-StatsMechanics/ForcesAndFriction";
import Projectiles from "./pages/A-StatsMechanics/Projectiles";
import ApplicationsOfForces from "./pages/A-StatsMechanics/ApplicationsOfForces";
import FurtherKinematics from "./pages/A-StatsMechanics/FurtherKinematics";

function App() {
  const [xp, setXp] = useState(0);

  const fetchXp = async () => {
    try {
      const res = await fetch("http://localhost:5000/get_user_xp", {
        credentials: "include",
      });
      const data = await res.json();
      setXp(data.total_xp);
    } catch (err) {
      console.error("Failed to fetch XP:", err);
    }
  };

  useEffect(() => {
    fetchXp();
  }, []);

  return (
    <Router>
      <BaseLayout xp={xp}>
      <Toaster richColors />
        <Routes>
          <Route path="/" element={<RequireAuthentication><HomePage /></RequireAuthentication>} />
          <Route path="/topics" element={<RequireAuthentication><TopicsPage /></RequireAuthentication>} />
          <Route path="/profile" element={<RequireAuthentication><ProfilePage /></RequireAuthentication>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/quiz/:topicId" element={<RequireAuthentication><QuizPage onXpUpdate={fetchXp}/></RequireAuthentication>} />

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
          <Route path="/topics/hypothesis-testing" element={<RequireAuthentication><HypothesisTesting /></RequireAuthentication>} />
          <Route path="/topics/modelling-in-mechanics" element={<RequireAuthentication><ModellingInMechanics /></RequireAuthentication>} />
          <Route path="/topics/constant-acceleration" element={<RequireAuthentication><ConstantAcceleration /></RequireAuthentication>} />
          <Route path="/topics/forces-and-motion" element={<RequireAuthentication><ForcesAndMotion /></RequireAuthentication>} />
          <Route path="/topics/variable-acceleration" element={<RequireAuthentication><VariableAcceleration /></RequireAuthentication>} />

          <Route path="/topics/algebraic-methods-2" element={<RequireAuthentication><AlgebraicMethods2 /></RequireAuthentication>} />
          <Route path="/topics/functions-and-graphs" element={<RequireAuthentication><FunctionsAndGraphs /></RequireAuthentication>} />
          <Route path="/topics/sequences-and-series" element={<RequireAuthentication><SequencesAndSeries /></RequireAuthentication>} />
          <Route path="/topics/the-binomial-expansion-2" element={<RequireAuthentication><TheBinomialExpansion2 /></RequireAuthentication>} />
          <Route path="/topics/radians" element={<RequireAuthentication><Radians /></RequireAuthentication>} />
          <Route path="/topics/trigonometric-functions" element={<RequireAuthentication><TrigonometricFunctions /></RequireAuthentication>} />
          <Route path="/topics/trigonometry-and-modelling" element={<RequireAuthentication><TrigonometryAndModelling /></RequireAuthentication>} />
          <Route path="/topics/parametric-equations" element={<RequireAuthentication><ParametricEquations /></RequireAuthentication>} />
          <Route path="/topics/differentiation-2" element={<RequireAuthentication><Differentiation2 /></RequireAuthentication>} />
          <Route path="/topics/numerical-methods" element={<RequireAuthentication><NumericalMethods /></RequireAuthentication>} />
          <Route path="/topics/integration-2" element={<RequireAuthentication><Integration2 /></RequireAuthentication>} />
          <Route path="/topics/vectors-2" element={<RequireAuthentication><Vectors2 /></RequireAuthentication>} />

          <Route path="/topics/regression-correlation-hypothesis-testing" element={<RequireAuthentication><RegressionCorrelationHypothesisTesting /></RequireAuthentication>} />
          <Route path="/topics/conditional-probability" element={<RequireAuthentication><ConditionalProbability /></RequireAuthentication>} />
          <Route path="/topics/the-normal-distribution" element={<RequireAuthentication><TheNormalDistribution /></RequireAuthentication>} />
          <Route path="/topics/moments" element={<RequireAuthentication><Moments /></RequireAuthentication>} />
          <Route path="/topics/forces-and-friction" element={<RequireAuthentication><ForcesAndFriction /></RequireAuthentication>} />
          <Route path="/topics/projectiles" element={<RequireAuthentication><Projectiles /></RequireAuthentication>} />
          <Route path="/topics/applications-of-forces" element={<RequireAuthentication><ApplicationsOfForces /></RequireAuthentication>} />
          <Route path="/topics/further-kinematics" element={<RequireAuthentication><FurtherKinematics /></RequireAuthentication>} />
        </Routes>
      </BaseLayout>
    </Router>
  );
};

export default App;
