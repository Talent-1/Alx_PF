const paymentForm = document.getElementById('payment-form');
const paymentSeatsList = document.getElementById('payment-seats-list');
const paymentTotalPrice = document.getElementById('payment-total-price');
const paymentDateEl = document.getElementById('payment-date'); // New line
const ewalletBalanceEl = document.getElementById('ewallet-balance');
const payWithEwalletBtn = document.getElementById('pay-with-ewallet-btn');
const addFundsBtn = document.getElementById('add-funds-btn');
const tabs = document.querySelectorAll('.tab-item');
const tabContents = document.querySelectorAll('.payment-form-card');

const urlParams = new URLSearchParams(window.location.search);
const selectedSeatsString = urlParams.get('seats');
const totalPrice = Number(urlParams.get('totalPrice'));
const departureDate = urlParams.get('departureDate'); // New line

let ewalletBalance = JSON.parse(localStorage.getItem('ewalletBalance')) || 0;

function updateEwalletBalance() {
    ewalletBalanceEl.textContent = `₦ ${ewalletBalance.toLocaleString()}`;
    localStorage.setItem('ewalletBalance', JSON.stringify(ewalletBalance));
}

updateEwalletBalance();

if (selectedSeatsString && totalPrice && departureDate) { // Updated if statement
    const seatsArray = selectedSeatsString.split(',');
    paymentSeatsList.textContent = seatsArray.join(', ');
    paymentTotalPrice.textContent = `₦ ${totalPrice.toLocaleString()}`;
    paymentDateEl.textContent = departureDate; // New line
}

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(item => item.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        tab.classList.add('active');
        const targetTabId = tab.dataset.tab;
        document.getElementById(targetTabId).classList.add('active');
    });
});

paymentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Processing card payment...');
    saveBookingAndRedirect();
});

payWithEwalletBtn.addEventListener('click', () => {
    if (ewalletBalance >= totalPrice) {
        ewalletBalance -= totalPrice;
        updateEwalletBalance();
        alert('Payment successful with e-wallet!');
        saveBookingAndRedirect();
    } else {
        alert('Insufficient funds. Please add more funds to your e-wallet.');
    }
});

addFundsBtn.addEventListener('click', () => {
    ewalletBalance += 50000;
    updateEwalletBalance();
    alert('₦50,000 has been added to your e-wallet.');
});

function saveBookingAndRedirect() {
    const newBooking = {
        date: departureDate, // Updated to use dynamic date
        train: 'Lagos to Ibadan (7:00 AM)',
        seats: selectedSeatsString,
        total: totalPrice,
        bookingNumber: 'LIR-' + Math.floor(Math.random() * 10000)
    };
    
    const existingBookings = JSON.parse(localStorage.getItem('userBookings')) || [];
    existingBookings.push(newBooking);
    localStorage.setItem('userBookings', JSON.stringify(existingBookings));

    setTimeout(() => {
        window.location.href = `dashboard.html?bookingId=${newBooking.bookingNumber}`; // Updated URL
    }, 1000);
}