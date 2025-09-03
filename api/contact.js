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
    const googleAppsScriptURL = 'https://script.google.com/macros/s/AKfycbxee-1zNdtxY0M2ZqaaCSNKiBxtvRjy0NQKOqFQECppaJZdMVfGT8VRsLJHw_j98hyq/exec';
    
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
    
    // Log para debugging
    console.log('Response status:', response.status);
    
    // Si la respuesta HTTP es exitosa, consideramos que el formulario se envió correctamente
    // Sabemos que los datos llegan a la planilla aunque la respuesta no sea JSON válido
    if (response.ok) {
      // No intentamos parsear la respuesta como JSON ya que puede ser HTML
      res.status(200).json({ status: 'success', message: 'Mensaje enviado correctamente' });
    } else {
      console.log('Error condition met - response.ok:', response.ok);
      res.status(500).json({ status: 'error', message: 'Error al enviar el mensaje' });
    }
    
  } catch (error) {
    console.error('Error en Vercel Function:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Error interno del servidor' 
    });
  }
}