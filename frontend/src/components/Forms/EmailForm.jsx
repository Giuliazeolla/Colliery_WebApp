import React, { useState } from 'react';

const EmailForm = () => {
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus('Invio in corso...');

    try {
      const res = await fetch('http://localhost:5000/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus('✅ Email inviata con successo!');
        setFormData({ to: '', subject: '', message: '' });
      } else {
        const err = await res.json();
        setStatus(`❌ Errore: ${err.error || 'Errore durante l’invio'}`);
      }
    } catch (error) {
      setStatus(`❌ Errore di rete: ${error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Invia una Email</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          name="to"
          placeholder="Destinatario"
          value={formData.to}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="subject"
          placeholder="Oggetto"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="message"
          placeholder="Messaggio"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Invia Email
        </button>
      </form>
      {status && <p className="mt-3 text-sm text-gray-700">{status}</p>}
    </div>
  );
};

export default EmailForm;
