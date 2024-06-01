function scrollToElement() {
  var element = document.getElementById('pricing');
  element.scrollIntoView({ behavior: 'smooth' });
}

function scrollToAbout() {
  var element = document.getElementById('about');
  element.scrollIntoView({ behavior: 'smooth' });
}

if (document.cookie.includes("jwt")) {
  document.getElementById('navi').innerHTML = `
    <li class="hero-nav__item">
      <a href="/" class="hero-nav__link">Главная страница</a>
    </li>
  `
}

function parseJwt(token) {
  // Разделяем токен на три части
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

var cookieArray = document.cookie.split('; ');

// Ищем в массиве пару, которая содержит JWT
var jwtPair = cookieArray.find(function(pair) {
  return pair.startsWith('jwt=');
});

// Если нашли пару, извлекаем JWT
if (jwtPair) {
  var jwt = jwtPair.split('=')[1];
  console.log(jwt);
} else {
  console.log('JWT не найден');
}





function fetchEvents() {
  fetch('http://localhost:8000/api/events/')
    .then(response => response.json())
    .then(data => {
      try {
        let userIdJwt = parseJwt(jwt)
        data.results.forEach(element => {
          let con = document.getElementById('container-event');
          con.innerHTML += renderEvent(element, userIdJwt);
        });
      } catch (error) {
        data.results.forEach(element => {
          let con = document.getElementById('container-event');
          con.innerHTML += renderEvent(element);
        });
      }
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });
}



function renderEvent(data, idJwt = "none") {
  console.log(idJwt )
  let eventLayot = `
      <div style="margin-top:50px;" class="block-17__card row flex-column-reverse flex-lg-row justify-content-center">
        <div class="testimonial-card-3 text-center col-lg-6 px-0 d-flex align-items-center justify-content-center">
          <div class="px-4 px-lg-5">
          <h6 class="plan-card__name mb-0">${data.name}</h6>
            <p class="testimonial-card-3__paragraph my-4">
              ${data.description}
            </p>
            <h3>Всего билетов: ${data.available_tickets ? data.available_tickets : data.total_tickets}</h3>
            <h3>Стоимость билета: ${data.cost}</h3>
            <h3>Дата проведения: ${formatDate(data.date_time)}</h3>
          </div>
        </div>
        <div class="cta-card col-lg-5 px-0">
          <div class="plan-card text-center">
            <img src=${data.image} alt="">
            <a href="${idJwt == "none" ? `#popup` : `/ticketspage.html?eventId=${data.id_event}&user_id=${idJwt.user_id}`}"  class="d-block btn btn-primary px-5 mx-auto">Купить билет</a>
          </div>
        </div>
      </div>
  `
  
  return eventLayot
}


fetchEvents();


function formatDate(dateString) {
  var date = new Date(dateString);
  var year = date.getFullYear();
  var month = String(date.getMonth() + 1).padStart(2, '0');
  var day = String(date.getDate()).padStart(2, '0');
  var hours = String(date.getHours()).padStart(2, '0');
  var minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

// Добавьте этот код в ваш JavaScript файл или в тег <script> в вашем HTML
$(document).ready(function() {
  // Обработка клика на ссылку
  $('.btn-primary').on('click', function(e) {
    e.preventDefault(); // Предотвращаем стандартное действие ссылки

    // Получаем параметры из фрагмента URI
    var params = new URLSearchParams(window.location.hash.split('?')[1]);
    var param1 = params.get('param1');
    var param2 = params.get('param2');

    // Вы можете использовать эти параметры для выполнения каких-либо действий
    console.log('Param1:', param1);
    console.log('Param2:', param2);

    // Открываем модальное окно
    $('#yourModalId').modal('show'); // Замените 'yourModalId' на идентификатор вашего модального окна
  });
});