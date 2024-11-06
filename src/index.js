import 'htmx.org';
import './styles/main.scss';
import hlogo from './images/hlogo.svg';
import flogo from './images/flogo.svg';
import adres from './images/adres.svg';
import phone from './images/phone.svg';
import picture1 from './images/picture1.png';
import picture2 from './images/picture2.png';
import picture3 from './images/picture3.png';
import picture4 from './images/picture4.png';
import check from './images/check.svg';


// --- Функция с лоадером
function set_loader(event) {
    const button = event.target; // Получаем кнопку, которая инициировала событие
    button.classList.add("loader"); // Добавляем лоадер на кнопку
}

// --- Функция для применения окончательного вида кнопки
function buy_complite(event) {
    const button = event.target; // Получаем кнопку, которая инициировала событие
    const heading = button.querySelector('h4'); // Текст который нужно изменить

    button.classList.remove("loader");
    button.classList.add("inCart"); // Добавляем стиль "В корзине"
    heading.innerText = 'В корзине'; // Меняем текст
    
    // Сохраняем состояние в локальном хранилище
    localStorage.setItem(button.dataset.buttonId, 'true');
}

function remove_loader(button) {
    button.classList.remove('loader'); // Удаляем лоадер
    button.classList.remove('inCart'); // Убираем стиль "В корзине"
    button.querySelector('h4').innerText = 'Купить'; // Возвращаем текст
}

// Восстанавливаем состояние кнопок из локального хранилища
document.querySelectorAll(".btn").forEach(button => {
    const buttonId = button.dataset.buttonId;
    const storedState = localStorage.getItem(buttonId);

    if (storedState) {
        buy_complite({ target: button }); // Применяем окончательный вид кнопки
    }

    // Обработчик события для "htmx:beforeRequest" (Лоадер) и "htmx:afterRequest" (Конечный вид кнопки)
    button.addEventListener("htmx:beforeRequest", set_loader);
    button.addEventListener("htmx:afterRequest", (event) => {
        if (event.detail.xhr.status === 200) {
            buy_complite(event); // Если запрос успешен, применяем стиль "В корзине"
            console.log("Успешный запрос")
        } else {
            remove_loader(button); // Если не успешен, возвращаем обычную кнопку
            console.log("Неудачный запрос")
        }
    });
});