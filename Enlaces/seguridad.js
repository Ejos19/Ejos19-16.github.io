document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // 1. BASE DE DATOS DE USUARIOS PERMITIDOS
  // ==========================================================================
  const usuariosPermitidos = [
    { usuario: "Eduardo.oso", pass: "20870092" },
    { usuario: "Yanina.tor", pass: "20870092" },
    { usuario: "Jose.criollo", pass: "V-17423374" },
    { usuario: "Emma.Mendez", pass: "Tealca2026*5" },
    { usuario: "Liseth.Gar", pass: "Tealca2026*4" },
    { usuario: "Andres.Ram", pass: "Tealca2026*3" },
    { usuario: "Migleysi.Roy", pass: "V-18951095" },
    { usuario: "Carmen.Del", pass: "V-19738393" },
    { usuario: "Marian.Per", pass: "V-18245926" },
    
    // { usuario: "Admin.Ventas", pass: "Clave2026" }
  ];

  let estaDesbloqueado = false;

  // Referencias a elementos
  const btnDesbloqueo = document.getElementById("btn-desbloqueo");
  const textoBoton = document.getElementById("texto-boton");
  const iconoCandado = document.getElementById("icono-candado");
  const modalLogin = document.getElementById("modal-login");
  const formLogin = document.getElementById("form-login");
  const btnCancelar = document.getElementById("btn-cancelar");
  const inputUsuario = document.getElementById("input-usuario");
  const inputPassword = document.getElementById("input-password");
  const enlaces = document.querySelectorAll(".enlace-input");
  const toastContainer = document.getElementById("toast-container");

  // ==========================================================================
  // 2. SISTEMA DE NOTIFICACIONES SUTILES (TOAST)
  // ==========================================================================
  function mostrarToast(mensaje, tipo = "warning") {
    if (!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = `toast-notification ${tipo}`;

    // Icono dinámico según el tipo de notificación
    let icono = "fa-circle-info";
    if (tipo === "success") icono = "fa-circle-check";
    if (tipo === "danger") icono = "fa-circle-xmark";
    if (tipo === "warning") icono = "fa-triangle-exclamation";

    toast.innerHTML = `<i class="fa-solid ${icono}"></i> <span>${mensaje}</span>`;
    toastContainer.appendChild(toast);

    // Animación de entrada
    setTimeout(() => toast.classList.add("show"), 10);

    // Eliminación automática después de 3.5 segundos
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // ==========================================================================
  // 3. ESTADOS DE BLOQUEO Y DESBLOQUEO
  // ==========================================================================
  function bloquearSistema() {
    estaDesbloqueado = false;
    textoBoton.textContent = "Login";
    if (iconoCandado) iconoCandado.className = "fa-solid fa-lock";

    enlaces.forEach((enlace) => {
      enlace.style.opacity = "0.5";
      enlace.style.cursor = "not-allowed";
    });
  }

  function desbloquearSistema() {
    estaDesbloqueado = true;
    textoBoton.textContent = "Desbloqueado";
    if (iconoCandado) iconoCandado.className = "fa-solid fa-unlock";

    enlaces.forEach((enlace) => {
      enlace.style.opacity = "1";
      enlace.style.cursor = "pointer";
    });
  }

  // Prevenir navegación cuando esté bloqueado
  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", (e) => {
      if (!estaDesbloqueado) {
        e.preventDefault();
        mostrarToast("Inicia sesión para acceder a las URL", "warning");
      }
    });
  });

  // Estado inicial
  bloquearSistema();

  // ==========================================================================
  // 4. EVENTOS Y ALTERNANCIA (TOGGLE)
  // ==========================================================================
  btnDesbloqueo.addEventListener("click", () => {
    // Si ya está desbloqueado, al hacer clic se vuelve a bloquear
    if (estaDesbloqueado) {
      bloquearSistema();
      mostrarToast("Sistema bloqueado nuevamente", "danger");
    } else {
      // Si está bloqueado, se abre el modal para pedir clave
      modalLogin.showModal();
    }
  });

  btnCancelar.addEventListener("click", () => {
    modalLogin.close();
    formLogin.reset();
  });

  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    const userIngresado = inputUsuario.value.trim();
    const passIngresada = inputPassword.value.trim();

    const esValido = usuariosPermitidos.some(
      (u) => u.usuario === userIngresado && u.pass === passIngresada,
    );

    if (esValido) {
      desbloquearSistema();
      formLogin.reset();
      modalLogin.close();
      mostrarToast("Acceso concedido correctamente", "success");
    } else {
      mostrarToast("Usuario o contraseña incorrectos", "danger");
      inputPassword.value = "";
    }
  });
});
