const supabaseUrl = "https://itnrwlswyykpceitjwiq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0bnJ3bHN3eXlrcGNlaXRqd2lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1NDI2NDcsImV4cCI6MjA4NzExODY0N30.O3JR8nDrzGtGMvnIsWMtnhGHLbm_q3o_NDKskAMoxvA";

const supabaseClient = supabase.createClient(
    supabaseUrl,
    supabaseKey
);

async function login() {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const { data, error } =
        await supabaseClient.auth.signInWithPassword({

            email,
            password

        });

    if (error) {

        document.getElementById("mensaje")
            .innerText = error.message;
            alert("Credenciales incorrectas");

        return;

    }

    window.location.href =
        "admin.html";

}