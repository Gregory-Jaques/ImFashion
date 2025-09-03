# 📋 Configuración de Google Sheets para Formulario de Contacto

## 🚀 Paso 1: Crear Google Sheet y Apps Script

### 1.1 Crear la Hoja de Cálculo
1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nómbrala "Contactos ImFashion" (o el nombre que prefieras)
4. En la primera fila, agrega estos encabezados:
   - A1: **Fecha**
   - B1: **Nombre**
   - C1: **Email**
   - D1: **Teléfono**
   - E1: **Asunto**
   - F1: **Mensaje**

### 1.2 Crear el Google Apps Script
1. En tu Google Sheet, ve a **Extensiones > Apps Script**
2. Borra el código por defecto
3. Pega el siguiente código:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Agregar fila con los datos
    sheet.appendRow([
      new Date(),
      data.nombre,
      data.email,
      data.telefono,
      data.asunto,
      data.mensaje
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({status: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Guarda el proyecto con **Ctrl+S** (o **Cmd+S** en Mac)
5. Ponle un nombre al proyecto, por ejemplo: "ImFashion Contact Form"

## 🌐 Paso 2: Publicar como Web App

### 2.1 Implementar el Script
1. Haz clic en **Implementar > Nueva implementación**
2. Selecciona el tipo: **Aplicación web**
3. Configura los siguientes parámetros:
   - **Ejecutar como**: Yo (tu email)
   - **Quién tiene acceso**: Cualquier persona
4. Haz clic en **Implementar**
5. **¡IMPORTANTE!** Copia la URL que aparece (algo como: `https://script.google.com/macros/s/ABC123.../exec`)

### 2.2 Autorizar Permisos
1. La primera vez te pedirá autorizar permisos
2. Haz clic en **Revisar permisos**
3. Selecciona tu cuenta de Google
4. Haz clic en **Avanzado** si aparece una advertencia
5. Haz clic en **Ir a [nombre del proyecto] (no seguro)**
6. Haz clic en **Permitir**

## 🔧 Paso 3: Configurar la URL en el Código

### 3.1 Actualizar el Archivo JavaScript
1. Abre el archivo: `components/modal-component.js`
2. Busca la línea que dice:
   ```javascript
   const googleAppsScriptURL = 'TU_URL_DE_GOOGLE_APPS_SCRIPT';
   ```
3. Reemplaza `'TU_URL_DE_GOOGLE_APPS_SCRIPT'` con la URL que copiaste en el paso 2.1
4. Ejemplo:
   ```javascript
   const googleAppsScriptURL = 'https://script.google.com/macros/s/ABC123DEF456GHI789JKL/exec';
   ```

### 3.2 Guardar y Probar
1. Guarda el archivo
2. Copia el archivo actualizado a la carpeta `public/components/`:
   ```bash
   cp ImFashion/components/modal-component.js public/components/
   ```
3. Abre tu sitio web y prueba el formulario

## ✅ Paso 4: Verificar Funcionamiento

### 4.1 Probar el Formulario
1. Abre tu sitio web
2. Haz clic en "Escríbenos" para abrir el modal
3. Llena todos los campos requeridos (Nombre, Email, Mensaje)
4. Haz clic en "Enviar"
5. Deberías ver el mensaje "¡Formulario enviado exitosamente!"
6. El modal se cerrará automáticamente después de 2 segundos

### 4.2 Verificar en Google Sheets
1. Ve a tu Google Sheet
2. Deberías ver una nueva fila con:
   - Fecha y hora actual
   - Los datos que enviaste en el formulario

## 🔍 Solución de Problemas

### Problema: "Error de conexión"
- **Causa**: URL incorrecta o permisos no autorizados
- **Solución**: Verifica que la URL sea correcta y que hayas autorizado todos los permisos

### Problema: "Error al enviar el formulario"
- **Causa**: Error en el script de Google Apps Script
- **Solución**: 
  1. Ve a tu proyecto de Apps Script
  2. Haz clic en **Ejecuciones** en el menú lateral
  3. Revisa si hay errores en las ejecuciones recientes

### Problema: Los datos no aparecen en la hoja
- **Causa**: Script no configurado correctamente
- **Solución**: Verifica que el código del script sea exactamente como se muestra arriba

## 📧 Funcionalidades Implementadas

✅ **Validación de campos requeridos** (Nombre, Email, Mensaje)
✅ **Mensajes de estado** (Enviando, Éxito, Error)
✅ **Deshabilitación del botón** durante el envío
✅ **Cierre automático del modal** tras envío exitoso
✅ **Manejo de errores** de conexión y servidor
✅ **Limpieza del formulario** tras envío exitoso
✅ **Almacenamiento en Google Sheets** con fecha y hora

## 🎯 Próximos Pasos Opcionales

1. **Notificaciones por Email**: Configura el script para que te envíe un email cuando recibas un nuevo contacto
2. **Validación Avanzada**: Agrega validación de formato de email y teléfono
3. **Captcha**: Implementa Google reCAPTCHA para prevenir spam
4. **Analytics**: Agrega seguimiento de conversiones en Google Analytics

---

**¡Listo!** Tu formulario de contacto ahora está conectado con Google Sheets y funcionando correctamente. 🎉