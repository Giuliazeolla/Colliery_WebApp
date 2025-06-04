import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/userSlice';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Registrazione completata con successo!');
        setError('');
        // Puoi aspettare un attimo prima di reindirizzare, per mostrare il messaggio
        setTimeout(() => navigate('/scheda-anagrafica'), 1500);
      } else {
        setError(data.message || 'Errore nella registrazione');
        setSuccess('');
      }
    } catch (err) {
      console.error('Errore di rete:', err);
      setError('Errore di rete. Riprova più tardi.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-green-50 shadow-xl rounded-2xl p-8 max-w-sm w-full space-y-4"
      >
        <h2 className="text-2xl font-bold text-green-800 text-center">Registrati a Enermetal</h2>

        {error && <div className="text-red-600 text-center">{error}</div>}
        {success && <div className="text-green-600 text-center">{success}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700"
        />
        <button
          type="submit"
          className="w-full bg-green-700 text-white py-3 rounded-2xl hover:bg-green-800 transition"
        >
          Registrati
        </button>
      </form>
    </div>
  );
}

export default Register;
