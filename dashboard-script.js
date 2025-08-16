const bookingsList = document.getElementById('bookings-list');
const upcomingBooking = document.getElementById('upcoming-booking');

function renderBookings() {
    const bookings = JSON.parse(localStorage.getItem('userBookings')) || [];
    
    // Clear existing content
    bookingsList.innerHTML = '';
    upcomingBooking.innerHTML = '';

    if (bookings.length === 0) {
        bookingsList.innerHTML = '<p style="text-align: center; color: #666;">You have no past bookings.</p>';
        upcomingBooking.innerHTML = '<p style="text-align: center; color: #666;">You have no upcoming trips booked.</p>';
        return;
    }

    // Sort bookings by date (or by booking number for this prototype)
    const sortedBookings = bookings.sort((a, b) => b.bookingNumber.localeCompare(a.bookingNumber));
    
    // Display the most recent booking as "Upcoming"
    const latestBooking = sortedBookings[0];
    upcomingBooking.innerHTML = `
        <div class="booking-card">
            <div class="booking-details">
                <p><strong>Booking #:</strong> ${latestBooking.bookingNumber}</p>
                <p><strong>Train:</strong> ${latestBooking.train}</p>
                <p><strong>Date:</strong> ${latestBooking.date}</p>
                <p><strong>Seats:</strong> ${latestBooking.seats}</p>
            </div>
            <div class="booking-actions">
                <a href="e-ticket.html?bookingId=${latestBooking.bookingNumber}" class="view-ticket-btn">View Ticket</a>
            </div>
        </div>
    `;

    // Display all bookings in the history list
    sortedBookings.forEach(booking => {
        const bookingCard = document.createElement('div');
        bookingCard.classList.add('booking-card');
        
        bookingCard.innerHTML = `
            <div class="booking-details">
                <p><strong>Booking #:</strong> ${booking.bookingNumber}</p>
                <p><strong>Train:</strong> ${booking.train}</p>
                <p><strong>Date:</strong> ${booking.date}</p>
                <p><strong>Seats:</strong> ${booking.seats}</p>
            </div>
            <div class="booking-price">
                <strong>₦ ${Number(booking.total).toLocaleString()}</strong>
            </div>
        `;
        bookingsList.appendChild(bookingCard);
    });
}

// Render bookings on page load
renderBookings();