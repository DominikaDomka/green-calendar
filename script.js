const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
let currentDate = new Date();

function updateCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    let dayOfWeek = firstDay.getDay() - 1; // Adjust to start on Monday
    if (dayOfWeek === -1) dayOfWeek = 6; // Sunday becomes last day
    
    const calendarDays = document.getElementById('calendarDays');
    
    // Clear all existing day cells
    while (calendarDays.children.length > 7) {
        calendarDays.removeChild(calendarDays.lastChild);
    }
    
    // Add cells for days from the previous month
    const prevMonth = new Date(year, month, 0);
    for (let i = dayOfWeek - 1; i >= 0; i--) {
        const dayElement = document.createElement('div');
        dayElement.textContent = prevMonth.getDate() - i;
        dayElement.classList.add('day', 'other-month');
        calendarDays.appendChild(dayElement);
    }
    
    // Add cells for each day of the current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = i;
        dayElement.classList.add('day');
        calendarDays.appendChild(dayElement);
    }

    // Fill in the rest of the grid with days from the next month
    let nextMonthDay = 1;
    while (calendarDays.children.length < 7 * 7) {
        const dayElement = document.createElement('div');
        dayElement.textContent = nextMonthDay++;
        dayElement.classList.add('day', 'other-month');
        calendarDays.appendChild(dayElement);
    }
}

document.getElementById('prevMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
});

updateCalendar();