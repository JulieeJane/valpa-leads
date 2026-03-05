// 🔹 1. Configurar Supabase
const supabaseUrl = "https://itnrwlswyykpceitjwiq.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0bnJ3bHN3eXlrcGNlaXRqd2lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1NDI2NDcsImV4cCI6MjA4NzExODY0N30.O3JR8nDrzGtGMvnIsWMtnhGHLbm_q3o_NDKskAMoxvA"

window.supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey)


alert("ESTE ES EL NUEVO LOCAL");

console.log("VERSION NUEVA JS 2026"); // verificación de la nueva version js 25/02/2026
// 🔹 2. Escuchar envío del formulario
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario")

  if (!form) return

  console.log("Formulario detectado")
  form.addEventListener("submit", async (e) => {
    e.preventDefault()


    const nombre = document.getElementById("nombre").value
    const telefono = document.getElementById("telefono").value
    const email = document.getElementById("email").value
    const servicio = document.getElementById("servicio_interes").value;
    const origen = document.getElementById("origen").value;
    const mensaje = document.getElementById("mensaje").value;

    //lineas de prueba para corergir el email y no mande null 
    console.log("INPUT:", emailInput);
    console.log("VALUE:", emailInput.value);


    const { data, error } = await supabaseClient
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
      console.error(error)
      alert("Error al enviar datos")
    } else {
      alert("Datos enviados correctamente")
      console.log("Insert result:", data, error)
      form.reset()
    }
  })

  if (document.querySelector('input[name="empresa"]').value !== "") {
    return; // es bot
  }
})
