import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

import Dashboard from './pages/Dashboard';

import LandingPage from './components/LandingPage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Home';
import Contatti from './components/Contatti';
import Storia from './components/Storia';
import Lavori from './components/Lavori';

import CustomerInfoForm from './components/Forms/CustomerInfoForm';
import QuoteRequestForm from './components/Forms/QuoteRequestForm';
import OrderSummary from './components/Forms/OrderSummary';
import EmailForm from './components/Forms/EmailForm';

import ProtectedRoute from './components/ProtectedRoute';
import ProtectedLayout from './components/ProtectedLayout';

import './styles/global.css';
import './styles/variables.css';

function App() {
  const formData = {
    ragioneSociale: 'Azienda Test',
    refAmministrativo: 'Mario Rossi',
    emailRefAmministrativo: 'mario@azienda.it',
    cellulareRefAmministrativo: '3331234567',
    refCommerciale: 'Giulia Verdi',
    emailRefCommerciale: 'giulia@azienda.it',
    cellulareRefCommerciale: '3337654321',
    data: '2025-05-28'
  };

  const opzionali = {
    impiantoFotovoltaico: true,
    accumulo: false,
    colonnina: true
  };

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/home" element={<Home />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/storia" element={<Storia />} />
          <Route path="/lavori" element={<Lavori />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<ProtectedLayout />}>
              <Route path="/scheda-anagrafica" element={<CustomerInfoForm />} />
              <Route path="/richiesta-preventivo" element={<QuoteRequestForm />} />
              <Route path="/riepilogo-ordine" element={<OrderSummary
                    formData={formData}
                    opzionali={opzionali}
                    onReset={() => {
                    console.log('Reset ordine');
                    }}
                  />
                }
              />
              <Route path='/email' element={<EmailForm/>} />
            </Route>
          </Route>

          <Route
            path="*"
            element={
              <h2 className="text-center text-red mt-8">Pagina non trovata</h2>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
