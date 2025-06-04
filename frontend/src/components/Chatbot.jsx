import React, { useState, useRef, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import faqData from "../data/faqData.js";
import "../styles/chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Ciao! Come posso aiutarti oggi?" },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const chatbotRef = useRef(null);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  if (isOpen) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [isOpen]);

  const getHardcodedResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    if (msg.includes("preventivo")) {
      return 'Puoi richiedere un preventivo andando nella sezione "Richiesta Preventivo".';
    }
    if (msg.includes("pannelli")) {
      return "Offriamo pannelli fotovoltaici di alta qualità. Vuoi maggiori dettagli?";
    }
    if (msg.includes("ciao") || msg.includes("salve")) {
      return "Ciao! 😊 Come posso esserti utile oggi?";
    }
    return null;
  };

  const getFAQResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    for (const faq of faqData) {
      const match = faq.keywords.some((keyword) => msg.includes(keyword));
      if (match) return faq.answer;
    }
    return null;
  };

  const handleSend = async () => {
    if (!input.trim() || sending) return;

    const userText = input.trim();
    const userMessage = { from: "user", text: userText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setSending(true);

    const hardcoded = getHardcodedResponse(userText);
    if (hardcoded) {
      setMessages((prev) => [...prev, { from: "bot", text: hardcoded }]);
      setSending(false);
      return;
    }

    const faqResponse = getFAQResponse(userText);
    if (faqResponse) {
      setMessages((prev) => [...prev, { from: "bot", text: faqResponse }]);
      setSending(false);
      return;
    }

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "Sei un assistente virtuale per Colliery, un’azienda di pannelli fotovoltaici. Rispondi solo su prodotti, preventivi, installazione e supporto tecnico.",
            },
            { role: "user", content: userText },
          ],
          temperature: 0.7,
        }),
      });

      const data = await res.json();
      const aiResponse = data.choices?.[0]?.message?.content;

      if (
        !aiResponse ||
        aiResponse.toLowerCase().includes("non lo so") ||
        aiResponse.toLowerCase().includes("non posso") ||
        aiResponse.toLowerCase().includes("non sono sicuro")
      ) {
        window.open(
          "https://wa.me/391234567890?text=Ho%20una%20domanda%20per%20Colliery",
          "_blank"
        );
        setMessages((prev) => [
          ...prev,
          {
            from: "bot",
            text: "Ti metto in contatto con un operatore via WhatsApp...",
          },
        ]);
      } else {
        setMessages((prev) => [...prev, { from: "bot", text: aiResponse }]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Errore nella connessione all’assistente. Riprova più tardi.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="chatbot-container fade-in">
      {!isOpen && (
        <button
          className="chatbot-toggle-btn"
          onClick={() => setIsOpen(true)}
          aria-label="Apri chatbot"
        >
          <MessageSquare size={24} />
        </button>
      )}

      {isOpen && (
        <div className="chatbot-box" ref={chatbotRef}>
          <div className="chatbot-header">
            <button
              className="chatbot-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Chiudi chatbot"
            >
              ✕
            </button>
          </div>
          <main className="chatbot-main">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chatbot-message ${msg.from}`}>
                <div className={`chatbot-bubble ${msg.from}`}>{msg.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </main>

          <footer className="chatbot-footer">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Scrivi un messaggio..."
              disabled={sending}
            />
            <button onClick={handleSend} disabled={!input.trim() || sending}>
              ➤
            </button>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
