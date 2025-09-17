import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Modules from './pages/Modules'
import Simulations from './pages/Simulations'
import Games from './pages/Games'
import Profile from './pages/Profile'
import Vocab from './pages/Vocab'
import Onboarding from './pages/Onboarding'
import CheckEmail from './pages/CheckEmail'
import Layout from './components/Layout'
import PrivateRoute from './components/PrivateRoute'

// Import individual module and game components
import BudgetingModule from './pages/modules/BudgetingModule'
import SavingModule from './pages/modules/SavingModule'
import StockMarketGame from './pages/games/StockMarketGame'
import BudgetBlitzGame from './pages/games/BudgetBlitzGame'
import FOMOFighterGame from './pages/games/FOMOFighterGame'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/check-email" element={<CheckEmail />} />
        
        {/* Onboarding route - accessible to authenticated users */}
        <Route path="/onboarding" element={
          <PrivateRoute requireOnboarding={false}>
            <Onboarding />
          </PrivateRoute>
        } />
        
        {/* Protected routes - require completed onboarding */}
        <Route path="/dashboard" element={
          <PrivateRoute requireOnboarding={true}>
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRoute>
        } />
        
        <Route path="/modules" element={
          <PrivateRoute>
            <Layout>
              <Modules />
            </Layout>
          </PrivateRoute>
        } />
        
        {/* Individual module routes */}
        <Route path="/modules/budgeting" element={
          <PrivateRoute>
            <Layout>
              <BudgetingModule />
            </Layout>
          </PrivateRoute>
        } />
        
        <Route path="/modules/saving" element={
          <PrivateRoute>
            <Layout>
              <SavingModule />
            </Layout>
          </PrivateRoute>
        } />
        
        <Route path="/simulations" element={
          <PrivateRoute>
            <Layout>
              <Simulations />
            </Layout>
          </PrivateRoute>
        } />
        
        <Route path="/games" element={
          <PrivateRoute>
            <Layout>
              <Games />
            </Layout>
          </PrivateRoute>
        } />
        
        {/* Individual game routes */}
        <Route path="/games/stock-market" element={
          <PrivateRoute>
            <Layout>
              <StockMarketGame />
            </Layout>
          </PrivateRoute>
        } />
        
        <Route path="/games/budget-blitz" element={
          <PrivateRoute>
            <Layout>
              <BudgetBlitzGame />
            </Layout>
          </PrivateRoute>
        } />
        
        <Route path="/games/fomo-fighter" element={
          <PrivateRoute>
            <Layout>
              <FOMOFighterGame />
            </Layout>
          </PrivateRoute>
        } />
        
        <Route path="/profile" element={
          <PrivateRoute>
            <Layout>
              <Profile />
            </Layout>
          </PrivateRoute>
        } />
        
        <Route path="/vocab" element={
          <PrivateRoute>
            <Layout>
              <Vocab />
            </Layout>
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App
