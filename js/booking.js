document.addEventListener('DOMContentLoaded', () => {
    const bookingDateInput = document.getElementById('bookingDate');
    const bookingTimeSelect = document.getElementById('bookingTime');
    const bookNowButton = document.getElementById('bookNowButton');

    // Function to fetch available times based on the selected date
    const fetchAvailableTimes = async () => {
        try {
            const selectedDate = bookingDateInput.value;
            const response = await fetch(`https://bookingsystem.azurewebsites.net/api/booking/available-times?bookingDate=${selectedDate}`);
            if (!response.ok) {
                throw new Error('Failed to fetch available times');
            }
            const availableTimes = await response.json();

            // Populate the time dropdown with available times
            populateTimeDropdown(availableTimes);
        } catch (error) {
            console.error('Error fetching available times:', error);
        }
    };

    // Function to populate the time dropdown with available times
    const populateTimeDropdown = (times) => {
        bookingTimeSelect.innerHTML = '<option value="">Select Time</option>';
        times.forEach((time) => {
            const option = document.createElement('option');
            option.value = time;
            option.textContent = time;
            bookingTimeSelect.appendChild(option);
        });
    };

    // Event listener for date selection change
    bookingDateInput.addEventListener('change', fetchAvailableTimes);

    // Event listener for "Book Now" button click
    bookNowButton.addEventListener('click', async () => {
        const selectedDate = bookingDateInput.value;
        const selectedTime = bookingTimeSelect.value;

        if (selectedDate && selectedTime) {
            try {
                // Retrieve customer ID and treatment ID from session
                const customerId = sessionStorage.getItem('customerId');
                const treatmentId = sessionStorage.getItem('treatmentId');

                const response = await fetch('https://bookingsystem.azurewebsites.net/api/booking/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        customerId: parseInt(customerId),
                        treatmentId: parseInt(treatmentId),
                        bookingDate: selectedDate,
                        startTime: selectedTime,
                    }),
                });
                if (!response.ok) {
                    throw new Error('Failed to create booking');
                }
                window.location.href = 'bookingconfirmation.html'; // Redirect to booking confirmation page
            } catch (error) {
                console.error('Error creating booking:', error);
            }
        } else {
            alert('Please select both date and time');
        }
    });
});
