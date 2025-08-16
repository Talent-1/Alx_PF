const seatMap = document.getElementById('seat-map');
const selectedSeatsList = document.getElementById('selected-seats-list');
const selectedSeatsCount = document.getElementById('selected-seats-count');
const totalPriceElement = document.getElementById('total-price');
const continueBtn = document.getElementById('continue-btn');

// Get the fare class from the URL
const urlParams = new URLSearchParams(window.location.search);
const fareClass = urlParams.get('fareClass');

let seatPrice = 0;
let seats = [];

// Define seat maps and prices based on fare class
if (fareClass === 'first-class') {
    seatPrice = 15000;
    seats = [
        { id: 'A1', status: 'available' }, { id: 'A2', status: 'available' },
        { id: 'B1', status: 'available' }, { id: 'B2', status: 'booked' },
        { id: 'C1', status: 'booked' }, { id: 'C2', status: 'available' }
    ];
    // Adjust grid for First Class
    seatMap.style.gridTemplateColumns = 'repeat(2, 1fr)';
} else { // Default to Economy
    seatPrice = 5000;
    seats = [
        { id: 'A1', status: 'available' }, { id: 'A2', status: 'available' }, { id: 'A3', status: 'available' }, { id: 'A4', status: 'available' }, { id: 'A5', status: 'available' }, { id: 'A6', status: 'available' },
        { id: 'B1', status: 'booked' }, { id: 'B2', status: 'available' }, { id: 'B3', status: 'available' }, { id: 'B4', status: 'booked' }, { id: 'B5', status: 'available' }, { id: 'B6', status: 'available' },
        { id: 'C1', status: 'available' }, { id: 'C2', status: 'available' }, { id: 'C3', status: 'available' }, { id: 'C4', status: 'available' }, { id: 'C5', status: 'booked' }, { id: 'C6', status: 'available' },
        { id: 'D1', status: 'available' }, { id: 'D2', status: 'booked' }, { id: 'D3', status: 'available' }, { id: 'D4', status: 'available' }, { id: 'D5', status: 'available' }, { id: 'D6', status: 'available' }
    ];
    // Reset grid for Economy
    seatMap.style.gridTemplateColumns = 'repeat(6, 1fr)';
}

let selectedSeats = [];

function renderSeats() {
    seatMap.innerHTML = '';
    seats.forEach(seat => {
        const seatElement = document.createElement('div');
        seatElement.classList.add('seat', seat.status);
        seatElement.textContent = seat.id;
        seatElement.dataset.seatId = seat.id;
        seatMap.appendChild(seatElement);
    });
}

function updateSummary() {
    selectedSeatsList.innerHTML = '';
    selectedSeats.forEach(seatId => {
        const listItem = document.createElement('li');
        listItem.textContent = seatId;
        selectedSeatsList.appendChild(listItem);
    });
    selectedSeatsCount.textContent = selectedSeats.length;
    const totalPrice = selectedSeats.length * seatPrice;
    totalPriceElement.textContent = `₦ ${totalPrice.toLocaleString()}`;
    
    // Update the 'Continue' button's href attribute to pass seat details and price
    continueBtn.href = `payment.html?fareClass=${fareClass}&seats=${selectedSeats.join(',')}&totalPrice=${totalPrice}`;
}

seatMap.addEventListener('click', (event) => {
    const clickedSeat = event.target;
    const seatId = clickedSeat.dataset.seatId;
    const isBooked = clickedSeat.classList.contains('booked');
    
    if (seatId && !isBooked) {
        const isSelected = clickedSeat.classList.toggle('selected');
        
        if (isSelected) {
            selectedSeats.push(seatId);
            clickedSeat.classList.remove('available');
        } else {
            selectedSeats = selectedSeats.filter(id => id !== seatId);
            clickedSeat.classList.add('available');
        }
        updateSummary();
    }
});

renderSeats();