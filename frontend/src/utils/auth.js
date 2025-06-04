// utils/auth.js

export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => localStorage.getItem('token');

export const removeToken = () => localStorage.removeItem('token');

export const isLoggedIn = () => !!getToken();

export const loginUser = async (email, password) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Email o password non corretti",
      };
    }

    const { token, email: userEmail } = data;

    saveToken(token);
    localStorage.setItem("email", userEmail);

    return {
      success: true,
      email: userEmail,
      token,
    };
  } catch (error) {
    console.error("Errore durante la richiesta di login:", error);
    return {
      success: false,
      message: "Errore di connessione al server",
    };
  }
};

export const logoutUser = () => {
  removeToken();
  localStorage.removeItem('email');
  localStorage.removeItem('user');
};
