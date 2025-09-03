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
    // Extraer todos los campos del body
    const requestData = req.body;
    
    // Validar datos requeridos básicos
    if (!requestData.nombre || !requestData.email) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Nombre y email son requeridos' 
      });
    }
    
    // Log para debugging
    console.log('Datos recibidos en contact.js:', JSON.stringify(requestData));
    
    // Enviar datos a Google Apps Script
    const googleAppsScriptURL = 'https://script.google.com/macros/s/AKfycbwW0G_YN184pcXbttzsm4e6W6EOPMSRpGH-NdQL76Inednie4-kDCC7DvzjP6MC20LU/exec';
    
    const response = await fetch(googleAppsScriptURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
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