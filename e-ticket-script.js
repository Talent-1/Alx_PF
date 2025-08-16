const ticketBookingNumber = document.getElementById('ticket-booking-number');
const ticketDate = document.getElementById('ticket-date');
const ticketTime = document.getElementById('ticket-time');
const ticketSeats = document.getElementById('ticket-seats');

// Get the bookingId from the URL
const urlParams = new URLSearchParams(window.location.search);
const bookingId = urlParams.get('bookingId');

// Load all bookings from local storage
const allBookings = JSON.parse(localStorage.getItem('userBookings')) || [];

// Find the specific booking that matches the bookingId
const currentBooking = allBookings.find(booking => booking.bookingNumber === bookingId);

// Populate the page with the booking details
if (currentBooking) {
    ticketBookingNumber.textContent = currentBooking.bookingNumber;
    ticketDate.textContent = currentBooking.date;
    ticketTime.textContent = currentBooking.train.split('(')[1].replace(')', ''); // Extracts time from the train string
    ticketSeats.textContent = currentBooking.seats;
} else {
    // Handle the case where the booking is not found
    document.querySelector('.ticket-container').innerHTML = '<p style="text-align: center; color: red;">Booking not found.</p>';
}