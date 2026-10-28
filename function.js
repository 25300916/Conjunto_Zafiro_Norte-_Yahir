
document.addEventListener("DOMContentLoaded", function () {
    const anio = document.getElementById("anioActual");
    if (anio) {
        anio.textContent = new Date().getFullYear();
    }
    function mostrarMensaje(mensaje, tipo = "success") {
        let alerta = document.getElementById("mensajeSitio");
        if (!alerta) {
            alerta = document.createElement("div");
            alerta.id = "mensajeSitio";
            alerta.className = "alert";
            alerta.setAttribute("role", "status");
            const contenido = document.querySelector("main") || document.body;
            contenido.prepend(alerta);
        }
        alerta.className = "alert alert-" + tipo;
        alerta.textContent = mensaje;
        alerta.style.margin = "15px auto";
        alerta.style.maxWidth = "900px";
        alerta.style.padding = "12px 18px";
        alerta.style.borderRadius = "8px";
    }

    function descargarArchivo(nombre, contenido) {
        const archivo = new Blob(
            [contenido],
            { type: "text/plain;charset=utf-8" }
        );
        const enlace = document.createElement("a");
        const url = URL.createObjectURL(archivo);
        enlace.href = url;
        enlace.download = nombre;
        document.body.appendChild(enlace);
        enlace.click();
        enlace.remove();
        URL.revokeObjectURL(url);
    }
    const formularios = document.querySelectorAll(
        "#formAgenda, #formContrataciones"
    );
    formularios.forEach(function (formulario) {
        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();

            if (!formulario.checkValidity()) {
                formulario.reportValidity();
                return;
            }
            const datos = new FormData(formulario);
            let contenido = "CONJUNTO ZAFIRO NORTE\n";
            contenido += "SOLICITUD DE INFORMACIÓN\n\n";
            datos.forEach(function (valor, campo) {
                contenido += campo + ": " + valor + "\n";
            });
            descargarArchivo(
                "solicitud-zafiro-norte.txt",
                contenido
            );
            mostrarMensaje(
                "Tu archivo de solicitud se ha preparado correctamente."
            );
            formulario.reset();
        });
    });
    const formularioRepertorio = document.getElementById(
        "formRepertorio"
    );
    if (formularioRepertorio) {
        formularioRepertorio.addEventListener(
            "submit",
            function (evento) {
                evento.preventDefault();
                if (!formularioRepertorio.checkValidity()) {
                    formularioRepertorio.reportValidity();
                    return;
                }
                const datos = new FormData(formularioRepertorio);
                let contenido = "CONJUNTO ZAFIRO NORTE\n";
                contenido += "PREFERENCIAS DE REPERTORIO\n\n";
                datos.forEach(function (valor, campo) {
                    contenido += campo + ": " + valor + "\n";
                });
                descargarArchivo(
                    "repertorio-zafiro-norte.txt",
                    contenido
                );
                mostrarMensaje(
                    "Tus preferencias de repertorio se descargaron correctamente."
                );
                formularioRepertorio.reset();
            }
        );
    }
    document.querySelectorAll("[data-ir-inicio]").forEach(
        function (boton) {
            boton.addEventListener("click", function () {
                window.location.href = "index.html";
            });
        }
    );
});
