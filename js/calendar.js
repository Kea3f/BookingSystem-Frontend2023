import { isWeekend, getDayName } from "./date-helper.js";

const calendar = document.querySelector("#app-calendar");
const currentMonthDisplay = document.querySelector("#current-month");
const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

async function updateCalendarWithBookings() {
    try {
        const response = await fetch('http://localhost:2020/api/booking/all-bookings');
        const bookings = await response.json();

        document.querySelectorAll("#app-calendar .day").forEach(dayElement => {
            const day = parseInt(dayElement.textContent.trim(), 10);
            const currentDate = new Date(currentYear, currentMonth, day);

            const hasBookingForCurrentDay = bookings.some(booking => {
                return new Date(booking.bookingDate).getTime() === currentDate.getTime();
            });

            if (hasBookingForCurrentDay) {
                dayElement.classList.add("has-booking");
            }
        });
    } catch (error) {
        console.error('Error fetching bookings:', error);
    }
}

function updateCalendar() {
    calendar.innerHTML = ""; // Clear existing calendar

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    for (let i = 0; i < firstDayOfMonth; i++) {
        calendar.insertAdjacentHTML("beforeend", `<div class="empty-day"></div>`);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const weekend = isWeekend(new Date(currentYear, currentMonth, day).getDay());
        const dayName = getDayName(new Date(currentYear, currentMonth, day).getDay());

        calendar.insertAdjacentHTML(
            "beforeend",
            `<div class="day ${weekend ? "weekend" : ""}">
                <div class="name">${dayName}</div>${day}
            </div>`
        );
    }

    updateCalendarWithBookings(); // Call the function to mark dates with bookings

    document.querySelectorAll("#app-calendar .day").forEach(day => {
        day.addEventListener("click", event => {
            event.currentTarget.classList.toggle("selected");
        });
    });
}

function updateMonthDisplay() {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    currentMonthDisplay.textContent = `${monthNames[currentMonth]} ${currentYear}`;
}

updateCalendar();
updateMonthDisplay();

const prevButton = document.createElement("button");
prevButton.textContent = "Previous Month";
prevButton.classList.add("calendar-button");
prevButton.addEventListener("click", () => {
    currentMonth -= 1;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear -= 1;
    }
    updateCalendar();
    updateMonthDisplay();
});

const nextButton = document.createElement("button");
nextButton.textContent = "Next Month";
nextButton.classList.add("calendar-button");
nextButton.addEventListener("click", () => {
    currentMonth += 1;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear += 1;
    }
    updateCalendar();
    updateMonthDisplay();
});

document.body.insertBefore(prevButton, calendar);
document.body.insertBefore(nextButton, calendar);
