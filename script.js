
const calendarDates = document.getElementById('calendarDates');
const monthYear = document.getElementById('monthYear');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');
const eventModal = document.getElementById('eventModal');
const closeModal = document.getElementsByClassName('close')[0];
const saveEventButton = document.getElementById('saveEvent');
const eventTitleInput = document.getElementById('eventTitle');


let currentDate = new Date();
let events = {};

function renderCalendar(date) {
    calendarDates.innerHTML = '';
    const month = date.getMonth();
    const year = date.getFullYear();
    monthYear.innerHTML = `${date.toLocaleString('es-ES', { month: 'long' })} ${year}`;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyCell = document.createElement('div');
        calendarDates.appendChild(emptyCell);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
        const dayCell = document.createElement('div');
        dayCell.innerText = day;
        dayCell.onclick = () => openEventModal(day);
        calendarDates.appendChild(dayCell);

        const eventKey = `${year}-${month + 1}-${day}`;
        if (events[eventKey]) {
            dayCell.style.backgroundColor = '#FFEB3B';
            const eventInfo = document.createElement('div');
            eventInfo.className = 'event-info'; // Aplica la clase CSS
            eventInfo.innerText = events[eventKey].title;
            dayCell.appendChild(eventInfo); // Mostrar título y descripción del evento

        }
    }
}

function openEventModal(day) {
    eventModal.style.display = 'block';
    eventTitleInput.value = '';
    saveEventButton.onclick = () => saveEvent(day);
}

function closeEventModal() {
    eventModal.style.display = 'none';
}

function saveEvent(day) {
    const eventTitle = eventTitleInput.value;
    if (eventTitle.trim()) {
        const eventKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
        events[eventKey] = { title: eventTitle};
        
        renderCalendar(currentDate);
        closeEventModal();
    }
}

prevMonthButton.onclick = () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
};

nextMonthButton.onclick = () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
};

closeModal.onclick = closeEventModal;
window.onclick = (event) => {
    if (event.target === eventModal) {
        closeEventModal();
    }
};
renderCalendar(currentDate); 
document.addEventListener('DOMContentLoaded', fetchEvents);