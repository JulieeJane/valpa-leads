// 🔹 1. Configurar Supabase
const supabaseUrl = "https://itnrwlswyykpceitjwiq.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0bnJ3bHN3eXlrcGNlaXRqd2lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1NDI2NDcsImV4cCI6MjA4NzExODY0N30.O3JR8nDrzGtGMvnIsWMtnhGHLbm_q3o_NDKskAMoxvA"

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey)


// 🔹 2. Escuchar envío del formulario
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario")

  if (!form) return

  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const nombre = document.getElementById("nombre").value
    const telefono = document.getElementById("telefono").value
    const email = document.getElementById("email").value

    const { data, error } = await supabase
      .from("leads")
      .insert([{ nombre, telefono, email }])

    if (error) {
      console.error(error)
      alert("Error al enviar datos")
    } else {
      alert("Datos enviados correctamente")
      form.reset()
    }
  })
})
