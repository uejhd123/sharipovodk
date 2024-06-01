document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.getElementById('auth-form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var formData = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };

        fetch('http://localhost:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка авторизации');
            }
            return response.json();
        })
        .then(data => {
            document.cookie = "jwt=" + data.access + "; path=/";
            alert('Авторизация прошла успешно');
            window.location.href = "http://localhost:7000/"
        })
        .catch(error => {
            alert('Ошибка во время авторизации: ' + error.message);
        });
    });
});
