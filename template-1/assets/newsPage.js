if (document.cookie.includes("jwt")) {
    document.getElementById('navi').innerHTML = `
      <li class="hero-nav__item">
        <a href="/" class="hero-nav__link">Главная страница</a>
      </li>
    `
}
function formatDate(dateString) {
    var date = new Date(dateString);
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    var hours = String(date.getHours()).padStart(2, '0');
    var minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}



  // Функция для создания разметки для новости
function createNewsMarkup(newsData) {
  return `
    <div style="margin-top:50px;" class="block-17__card row flex-column-reverse flex-lg-row justify-content-center">
      <div class="testimonial-card-3 text-center col-lg-6 px-0 d-flex align-items-center justify-content-center">
        <div class="px-4 px-lg-5">
          <h6 class="plan-card__name mb-0">${newsData.title}</h6>
          <p class="testimonial-card-3__paragraph my-4">
            ${newsData.content}
          </p>
          <h3>Дата публикации: ${formatDate(newsData.publication_date)}</h3>
        </div>
      </div>
    </div>
  `;
}

// Функция для получения и отрисовки новостей
function fetchAndRenderNews() {
  fetch('http://localhost:8000/api/news')
    .then(response => response.json())
    .then(data => {
      const newsContainer = document.getElementById('container-event');
      data.results.forEach(newsItem => {
        const newsMarkup = createNewsMarkup(newsItem);
        newsContainer.insertAdjacentHTML('beforeend', newsMarkup);
      });
    })
    .catch(error => {
      console.error('Ошибка при получении данных:', error);
    });
}

// Вызов функции для запуска процесса получения и отрисовки новостей
fetchAndRenderNews();