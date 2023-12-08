import { isWeekend, getDayName } from "./date-helper.js";

const calendar = document.querySelector("#app-calendar");
const currentMonthDisplay = document.querySelector("#current-month");
const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

async function updateCalendarWithBookings() {
    try {
        const response = await fetch('https://bookingsystem.azurewebsites.net/api/booking/bookings');
        const bookings = await response.json();

        document.querySelectorAll("#app-calendar .day").forEach(dayElement => {
            const day = parseInt(dayElement.textContent.trim(), 10);
            const currentDate = new Date(currentYear, currentMonth, day);

            const hasBookingForCurrentDay = bookings.some(booking => {
                const bookingDate = new Date(booking.bookingDate);
                return (
                    bookingDate.getFullYear() === currentYear &&
                    bookingDate.getMonth() === currentMonth &&
                    bookingDate.getDate() === day
                );
            });

            if (hasBookingForCurrentDay) {
                dayElement.classList.add("has-booking");
                dayElement.addEventListener("click", () => {
                    if (!dayElement.classList.contains("selected")) {
                        const formattedDate = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                        fetchAvailableBookingTimes(formattedDate);
                    }
                });
            } else {
                dayElement.classList.remove("has-booking");
                dayElement.removeEventListener("click", fetchAvailableBookingTimes);
            }
        });
    } catch (error) {
        console.error('Error fetching bookings:', error);
    }
}

function displayAvailableTimes(availableTimes) {
    const availableTimesList = document.getElementById("available-times-list");
    availableTimesList.innerHTML = ""; // Ryd tidligere indhold

    if (availableTimes.length > 0) {
        availableTimes.forEach(time => {
            const listItem = document.createElement("li");
            listItem.textContent = time;
            availableTimesList.appendChild(listItem);
        });
    } else {
        const noTimesListItem = document.createElement("li");
        noTimesListItem.textContent = "No available booking times";
        availableTimesList.appendChild(noTimesListItem);
    }
}

async function fetchAvailableBookingTimes(selectedDate) {
    try {
        const response = await fetch(`https://bookingsystem.azurewebsites.net/api/booking/available-times?bookingDate=${selectedDate}`);
        const availableTimes = await response.json();

        // Vis starttidspunkter i listen ved siden af kalenderen
        displayAvailableTimes(availableTimes);
    } catch (error) {
        console.error('Error fetching available booking times:', error);
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
