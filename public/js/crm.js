const supabaseUrl = "https://itnrwlswyykpceitjwiq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0bnJ3bHN3eXlrcGNlaXRqd2lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1NDI2NDcsImV4cCI6MjA4NzExODY0N30.O3JR8nDrzGtGMvnIsWMtnhGHLbm_q3o_NDKskAMoxvA";

const supabaseClient =
    window.supabase.createClient(
        supabaseUrl,
        supabaseKey
    );

console.log("CRM JS CARGADO");
let todosLosProspectos = [];
verificarSesion();

async function verificarSesion() {

    const { data } =
        await supabaseClient.auth.getSession();

    if (!data.session) {

        window.location.href =
            "login.html";

    }

}

async function cargarProspectos() {

    const { data, error } =
        await supabaseClient
            .from("prospectos")
            .select("*")
            .order("fecha_registro",
                { ascending: false });

    if (error) {

        console.error(error);
        return;

    }
    todosLosProspectos = data;

    const tabla =
        document.querySelector(
            "#tablaProspectos tbody"
        );

    tabla.innerHTML = "";

    /* CONTADORES */

    let nuevo = 0;
    let contactado = 0;
    let cerrado = 0;

    let conteoEstatus = {};
    let conteoServicio = {};
    let conteoMes = {};

    data.forEach(p => {

        /* CONTADORES */

        if (p.estatus === "Nuevo") nuevo++;
        if (p.estatus === "Contactado") contactado++;
        if (p.estatus === "Cerrado") cerrado++;

        /* ESTATUS */

        let estatus =
            p.estatus || "Sin estatus";

        conteoEstatus[estatus] =
            (conteoEstatus[estatus] || 0) + 1;

        /* SERVICIO */

        let servicio =
            p.servicio_interes || "Sin servicio";

        conteoServicio[servicio] =
            (conteoServicio[servicio] || 0) + 1;

        /* MES */

        let fecha =
            new Date(p.fecha_registro);

        let mes =
            fecha.toLocaleString(
                "es-MX",
                { month: "short" }
            );

        conteoMes[mes] =
            (conteoMes[mes] || 0) + 1;

        /* FILA TABLA */

        const fila = `

<tr>

<td>${p.nombre}</td>
<td>${p.telefono}</td>
<td>${p.email}</td>
<td>${p.servicio_interes}</td>
<td>${p.origen}</td>

<td>

<select onchange="cambiarEstatus(${p.id}, this.value)">

<option ${p.estatus == "Nuevo" ? "selected" : ""}>Nuevo</option>

<option ${p.estatus == "Contactado" ? "selected" : ""}>
Contactado
</option>

<option ${p.estatus == "En seguimiento" ? "selected" : ""}>
En seguimiento
</option>

<option ${p.estatus == "Cerrado" ? "selected" : ""}>
Cerrado
</option>

</select>

</td>

<td>

<textarea
onchange="guardarNota(${p.id}, this.value)"
>

${p.notas ?? ""}

</textarea>

</td>

</tr>

`;

        tabla.innerHTML += fila;

    });

    /* ACTUALIZAR CONTADORES */

    document.getElementById(
        "countNuevo"
    ).innerText = nuevo;

    document.getElementById(
        "countContactado"
    ).innerText = contactado;

    document.getElementById(
        "countCerrado"
    ).innerText = cerrado;

    /* CREAR GRAFICAS */

    crearGraficaEstatus(
        conteoEstatus
    );

    crearGraficaServicio(
        conteoServicio
    );

    crearGraficaMes(
        conteoMes
    );

}

/* GRAFICA ESTATUS */

function crearGraficaEstatus(datos) {

    new Chart(

        document.getElementById(
            "graficaEstatus"
        ),

        {
            type: "pie",

            data: {
                labels:
                    Object.keys(datos),

                datasets: [
                    {
                        data:
                            Object.values(datos)
                    }
                ]

            }

        }

    );

}

/* GRAFICA SERVICIO */

function crearGraficaServicio(datos) {

    new Chart(

        document.getElementById(
            "graficaServicio"
        ),

        {
            type: "bar",

            data: {
                labels:
                    Object.keys(datos),

                datasets: [
                    {
                        data:
                            Object.values(datos)
                    }
                ]

            }

        }

    );

}

/* GRAFICA MES */

function crearGraficaMes(datos) {

    new Chart(

        document.getElementById(
            "graficaMes"
        ),

        {
            type: "line",

            data: {
                labels:
                    Object.keys(datos),

                datasets: [
                    {
                        data:
                            Object.values(datos)
                    }
                ]

            }

        }

    );

}

/* ACTUALIZAR ESTATUS */

async function cambiarEstatus(
    id,
    estatus
) {

    await supabaseClient
        .from("prospectos")
        .update({
            estatus: estatus
        })
        .eq("id", id);

    cargarProspectos();

}

/* GUARDAR NOTA */

async function guardarNota(
    id,
    nota
) {

    await supabaseClient
        .from("prospectos")
        .update({
            notas: nota
        })
        .eq("id", id);

}

/* LOGOUT */

async function logout() {

    await supabaseClient
        .auth
        .signOut();

    window.location.href =
        "login.html";

}

//funcion filtrar
function filtrar() {

    const valor =
        document.getElementById(
            "filtroEstatus"
        ).value;

    const tabla =
        document.querySelector(
            "#tablaProspectos tbody"
        );

    tabla.innerHTML = "";

    let lista = [];

    if (valor === "Todos") {

        lista = todosLosProspectos;

    }

    else if (valor === "Cerrado") {

        lista =
            todosLosProspectos.filter(p =>

                p.estatus === "Cerrado" ||
                p.estatus === "Cerrado ganado" ||
                p.estatus === "Cerrado perdido"

            );

    }

    else {

        lista =
            todosLosProspectos.filter(p =>

                p.estatus === valor

            );

    }

    lista.forEach(p => {

        const fila = `

<tr>

<td>${p.nombre}</td>
<td>${p.telefono}</td>
<td>${p.email}</td>
<td>${p.servicio_interes}</td>
<td>${p.origen}</td>

<td>

<select onchange="cambiarEstatus(${p.id}, this.value)">

<option ${p.estatus == "Nuevo" ? "selected" : ""}>Nuevo</option>

<option ${p.estatus == "Contactado" ? "selected" : ""}>
Contactado
</option>

<option ${p.estatus == "En seguimiento" ? "selected" : ""}>
En seguimiento
</option>
<option ${p.estatus == "Cerrado" ? "selected" : ""}>
Cerrado
</option>
</select>
</td>
<td>
<textarea
onchange="guardarNota(${p.id}, this.value)"
>
${p.notas ?? ""}
</textarea>
</td>
</tr>
`;
        tabla.innerHTML += fila;

    });

}

/* EJECUTAR */

cargarProspectos();
