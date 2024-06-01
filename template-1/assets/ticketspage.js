//парсим URI
var urlParams = new URLSearchParams(window.location.search);
var eventId = urlParams.get('eventId');
var userId = urlParams.get('user_id');

//получаем JWT из куки
var cookieArray = document.cookie.split('; ');
var jwtPair = cookieArray.find(function(pair) {
  return pair.startsWith('jwt=');
});
var jwt = jwtPair.split('=')[1];

let dataObj = 1;


document.getElementById("reg-form").addEventListener('submit', function(event) {
  event.preventDefault();

  Promise.all([
    fetchUserData(userId, jwt),
    fetchEventData(eventId, jwt)
  ]).then(([userData, eventData]) => {
    
    dataObj = {
      userD: userData,
      eventD: eventData
    }
    sendMail(dataObj);
  }).catch(error => {
    console.error('Ошибка при получении данных пользователя или события:', error);
  });
  window.location.href = "/";
});
//получаем данные о событии
function fetchEvents() {
  fetch(`http://localhost:8000/api/events/${eventId}`)
    .then(response => response.json())
    .then(data => {
          document.getElementById('event_content').textContent = " " + data.description;
          document.getElementById('event_name').textContent += " " + data.name;
          document.getElementById('event_cost').textContent += " " + data.cost;
          document.getElementById('event_date').textContent += " " + formatDate(data.date_time);
          document.getElementById('event_available_tickets').textContent += " " + data.available_tickets  ;
          document.getElementById('tick-cost').textContent += " " + data.cost;
          document.getElementById('event_image').src = data.image;
  })
    .catch(error => {
      console.error('Ошибка:', error);
  });
}
fetchEvents();

//Валидаторы
document.getElementById('cvv').addEventListener('input', function() {
  var inputValue = this.value;
  var cleanedValue = inputValue.replace(/\D/g, '');
  var finalValue = cleanedValue.slice(0, 3);
  this.value = finalValue;
});

document.getElementById('full-name').addEventListener('input', function() {
  var inputValue = this.value;
  var cleanedValue = inputValue.replace(/[^a-zA-Zа-яА-Я\s]/g, '');
  this.value = cleanedValue;
});

document.getElementById('card-number').addEventListener('input', function() {
  var inputValue = this.value;
  var cleanedValue = inputValue.replace(/\D/g, '');
  var finalValue = cleanedValue.slice(0, 16);
  this.value = finalValue;
});

document.getElementById('expiry-date').addEventListener('change', function() {
  var selectedDate = new Date(this.value);
  var currentDate = new Date();
  if (selectedDate < currentDate) {
    this.valueAsDate = currentDate;
  }
});
document.getElementById('username').addEventListener('input', function() {
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  var isValid = emailRegex.test(this.value);

  if (!isValid) {
    this.setCustomValidity('Пожалуйста, введите корректный адрес электронной почты.');
  } else {
    this.setCustomValidity('');
  }
});

//форматирование даты
function formatDate(dateString) {
    var date = new Date(dateString);
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    var hours = String(date.getHours()).padStart(2, '0');
    var minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

//получаем данные пользователя
function fetchUserData(userId, jwt) {
  const url = `http://localhost:8000/api/users/${userId}`;

  return fetch(url, { // Возвращаем промис
    headers: {
      'Authorization': `Bearer ${jwt}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Ошибка при получении данных');
    }
    return response.json();
  })
  .catch(error => {
    console.error("Ошибка при получении данных:", error);
    throw error; // Переброс ошибки для обработки выше
  });
}

//еще одна функция для получения данных о событии

function fetchEventData(eventId, jwt) {
  const url = `http://localhost:8000/api/events/${eventId}`;

  return fetch(url, { 
    headers: {
      'Authorization': `Bearer ${jwt}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Ошибка при получении данных');
    }
    return response.json();
  })
  .catch(error => {
    console.error("Ошибка при получении данных:", error);
    throw error;
  });
}


//отправляем POST запрос для покупки билета и отправляем письмо
function sendPostRequest(dataObj) {
    var data = {
        "event": eventId,
        "quantity": 1,
        "user": userId
    };
    

    fetch('http://localhost:8000/api/tickets/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            sendMail(dataObj)
            alert("Письмо с данными билета отправлено на почту");
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

//функция для отправки письма
async function sendMail(dataObj) {
  const subject = 'Билет на мероприятие: ' + dataObj.eventD.name;
  console.log(dataObj)
  
  sendEmailRequest(subject, `
  Номер телефона: ${dataObj.userD.phone_number}\n
  ФИО: ${dataObj.userD.first_name + ' ' + dataObj.userD.last_name}.\n
  Название мероприятия: ${dataObj.eventD.name}\n
  Стоимость билета: ${dataObj.eventD.cost}\n
  Дата и время проведения мероприятия: ${formatDate(dataObj.eventD.date_time)}`,
  dataObj.userD.email, jwt);
};




function sendEmailRequest(subject, body, to, jwt) {
  const url = 'http://localhost:8000/api/sendmail/';
  const data = {
      subject: subject,
      body: body,
      to: to
  };

  fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + jwt,
      },
      body: JSON.stringify(data)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      alert('Письмо отправлено на почту');
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
}