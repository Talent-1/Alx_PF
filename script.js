// Get the booking form element
const bookingForm = document.getElementById('booking-form');

// Add an event listener for the form submission
bookingForm.addEventListener('submit', function(event) {
    // Prevent the default form submission behavior (page reload)
    event.preventDefault();

    // In a real application, you would collect the form data here:
    // const departureDate = document.getElementById('date').value;
    // const numberOfPassengers = document.getElementById('passengers').value;

    // For our prototype, we will just navigate to the schedule page
    window.location.href = 'schedule.html';
});