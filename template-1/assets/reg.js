document.addEventListener('DOMContentLoaded', function() {
    var registrationForm = document.getElementById('reg-form');

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var formData = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            first_name: document.getElementById('first_name').value,
            last_name: document.getElementById('last_name').value,
            phone_number: document.getElementById('phone_number').value,
            password: document.getElementById('password').value
        };

        fetch('http://localhost:8000/api/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert('Регистрация прошла успешно!');
            window.location.href = 'http://localhost:7000/';
            // Вы можете перенаправить пользователя на другую страницу после успешной регистрации
        })
        .catch(error => {
            alert('Произошла ошибка при регистрации');
        });
    });
});