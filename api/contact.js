export default async function handler(req, res) {
  // Configurar CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Manejar solicitudes OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { nombre, email, telefono, asunto, mensaje } = req.body;
    
    // Validar datos requeridos
    if (!nombre || !email || !mensaje) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Nombre, email y mensaje son requeridos' 
      });
    }
    
    // Enviar datos a Google Apps Script
    const googleAppsScriptURL = 'https://script.google.com/macros/s/AKfycbwp9_xg1Kym2rr6LqjtE6WLu3BwnkcvpjqRtVeHn8BL7tzqBiSGmB0vye1ZzjnZ7iZf/exec';
    
    const response = await fetch(googleAppsScriptURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre,
        email,
        telefono: telefono || '',
        asunto: asunto || '',
        mensaje
      })
    });
    
    const result = await response.json();
    
    if (result.status === 'success') {
      res.status(200).json({ status: 'success', message: 'Mensaje enviado correctamente' });
    } else {
      res.status(500).json({ status: 'error', message: result.message || 'Error al enviar el mensaje' });
    }
    
  } catch (error) {
    console.error('Error en Vercel Function:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Error interno del servidor' 
    });
  }
}