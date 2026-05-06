// 🔹 1. Configurar Supabase

const supabaseUrl = "https://itnrwlswyykpceitjwiq.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0bnJ3bHN3eXlrcGNlaXRqd2lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1NDI2NDcsImV4cCI6MjA4NzExODY0N30.O3JR8nDrzGtGMvnIsWMtnhGHLbm_q3o_NDKskAMoxvA"

window.supabaseClient =
    window.supabase.createClient(
        supabaseUrl,
        supabaseKey
    );

console.log("VERSION NUEVA JS 2026");

// 2. FUNCIÓN GLOBAL DE CORREO

window.enviarCorreoAutomatico = function (
    nombre,
    email,
    servicio
) {

    emailjs.send(
        "service_ubgrgum",
        "template_yf5quqb",
        {
            nombre: nombre,
            email: email,
            servicio: servicio
        }
    )

        .then(function (response) {

            console.log(
                "Correo enviado",
                response
            );

        })

        .catch(function (error) {

            console.error(
                "Error enviando correo",
                error
            );

        });

};

// 3. ESCUCHAR FORMULARIO

const form =
    document.getElementById(
        "formulario"
    );

console.log("Formulario detectado");

form.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        console.log(
            "Submit detectado"
        );

        const nombre =
            document.getElementById(
                "nombre"
            ).value;

        const telefono =
            document.getElementById(
                "telefono"
            ).value;

        const email =
            document.getElementById(
                "email"
            ).value;

        const servicio =
            document.getElementById(
                "servicio_interes"
            ).value;

        const origen =
            document.getElementById(
                "origen"
            ).value;

        const mensaje =
            document.getElementById(
                "mensaje"
            ).value;

        const { data, error } =
            await supabaseClient
                .from("prospectos")
                .insert([
                    {
                        nombre: nombre,
                        telefono: telefono,
                        email: email,
                        servicio_interes: servicio,
                        origen: origen,
                        mensaje: mensaje
                    }
                ]);

        if (error) {

            console.error(error);

            alert(
                "Error al enviar datos"
            );

        }

        else {

            console.log(
                "Insert result:",
                data
            );

            // ENVÍO DE CORREO

            enviarCorreoAutomatico(
                nombre,
                email,
                servicio
            );

            alert(
                "Datos enviados correctamente"
            );

            form.reset();

        }

    }
);