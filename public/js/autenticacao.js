document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("LoginForm");
    const loginMessage = document.getElementById("login-message");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("/autenticacao", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                loginMessage.textContent = `Error ${errorData.message || "Erro ao tntar autenticar."}`;
                loginMessage.style.color = "red";
            }
            else {
                const data = await response.json();
                loginMessage.style.color = "green";
                alert(data.message);
                loginMessage.textContent = data.message;
                window.location.href = `/home?authToken= ${data.authToken}`;

                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
            }
        }

        catch (error) {
            loginMessage.textContent = `Erro de rede: ${eror.message}`;
            loginMessage.style.color = "red";
        }

    });
});