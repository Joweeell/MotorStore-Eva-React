
import { useEffect, useRef, useState } from 'react';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function GoogleLoginButton({ onLogin, onError }) {
  const contenedorRef = useRef(null);
  const accionesRef = useRef({ onLogin, onError });
  const procesandoRef = useRef(false);

  const [cargando, setCargando] = useState(false);

  accionesRef.current = { onLogin, onError };

  useEffect(() => {
    if (!CLIENT_ID) return;

    let activo = true;

    // RECIBIR RESPUESTA DE GOOGLE
    const recibirRespuesta = async (respuesta) => {
      if (!activo || procesandoRef.current) return;

      if (!respuesta?.credential) {
        accionesRef.current.onError(
          'Google no entregó una credencial válida.'
        );
        return;
      }

      procesandoRef.current = true;
      setCargando(true);

      try {
        // ENVIAR TOKEN AL BACKEND
        const solicitud = await fetch(
          `${API_URL}/api/auth/google`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              credential: respuesta.credential
            })
          }
        );

        const datos = await solicitud.json();

        if (!solicitud.ok || !datos.ok) {
          throw new Error(
            datos.mensaje ||
              'No se pudo iniciar sesión con Google.'
          );
        }

        // INICIAR SESIÓN EN MOTORSTORE
        if (activo) {
          accionesRef.current.onLogin(
            datos.usuario,
            datos.token
          );
        }
      } catch (error) {
        if (activo) {
          accionesRef.current.onError(
            error.message ||
              'No hay conexión con el backend.'
          );
        }
      } finally {
        procesandoRef.current = false;

        if (activo) {
          setCargando(false);
        }
      }
    };

    // MOSTRAR BOTÓN OFICIAL DE GOOGLE
    const mostrarBoton = () => {
      if (
        !activo ||
        !contenedorRef.current ||
        !window.google?.accounts?.id
      ) {
        return;
      }

      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: recibirRespuesta
      });

      contenedorRef.current.replaceChildren();

      window.google.accounts.id.renderButton(
        contenedorRef.current,
        {
          theme: 'outline',
          size: 'large',
          text: 'continue_with',
          shape: 'rectangular',
          width: 300,
          locale: 'es'
        }
      );
    };

    // CARGAR LIBRERÍA DE GOOGLE
    let script = document.querySelector(
      'script[data-motorstore-google]'
    );

    if (window.google?.accounts?.id) {
      mostrarBoton();
    } else {
      if (!script) {
        script = document.createElement('script');

        script.src =
          'https://accounts.google.com/gsi/client';

        script.async = true;
        script.dataset.motorstoreGoogle = 'true';

        document.head.appendChild(script);
      }

      script.addEventListener('load', mostrarBoton);
    }

    return () => {
      activo = false;

      script?.removeEventListener('load', mostrarBoton);
    };
  }, []);

  // VERIFICAR CONFIGURACIÓN
  if (!CLIENT_ID) {
    return (
      <div className="alert alert-warning small">
        Falta configurar VITE_GOOGLE_CLIENT_ID en
        el archivo .env del frontend.
      </div>
    );
  }

  return (
    <div className="d-flex flex-column align-items-center gap-2">
      <div ref={contenedorRef} />

      {cargando && (
        <span
          className="text-muted small"
          role="status"
        >
          Iniciando sesión con Google...
        </span>
      )}
    </div>
  );
}
