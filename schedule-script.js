const trainList = document.getElementById('train-list');

if (trainList) {
    const trains = {
        'default': [
            { id: 'LIR001', origin: 'Lagos', destination: 'Ibadan', departure: '07:00 AM', arrival: '09:00 AM', economyPrice: 5000, firstClassPrice: 15000 },
            { id: 'LIR002', origin: 'Lagos', destination: 'Ibadan', departure: '10:00 AM', arrival: '12:00 PM', economyPrice: 5000, firstClassPrice: 15000 },
            { id: 'LIR003', origin: 'Lagos', destination: 'Ibadan', departure: '02:00 PM', arrival: '04:00 PM', economyPrice: 5000, firstClassPrice: 15000 }
        ],
        '2025-08-20': [
            { id: 'LIR004', origin: 'Lagos', destination: 'Ibadan', departure: '06:00 AM', arrival: '08:00 AM', economyPrice: 6000, firstClassPrice: 18000 },
            { id: 'LIR005', origin: 'Lagos', destination: 'Ibadan', departure: '01:00 PM', arrival: '03:00 PM', economyPrice: 6000, firstClassPrice: 18000 }
        ]
    };

    const urlParams = new URLSearchParams(window.location.search);
    const fareClass = urlParams.get('fareClass') || 'economy';
    const departureDate = urlParams.get('departureDate');

    // Select the correct train schedule based on the date
    const selectedTrains = trains[departureDate] || trains['default'];

    function renderTrains() {
        trainList.innerHTML = '';
        if (selectedTrains.length === 0) {
            trainList.innerHTML = '<p style="text-align: center; color: #666;">No trains available for the selected date.</p>';
            return;
        }

        selectedTrains.forEach(train => {
            const trainCard = document.createElement('div');
            trainCard.classList.add('train-card');

            trainCard.innerHTML = `
                <div class="train-info">
                    <div class="train-route">
                        <span class="origin">${train.origin}</span> to <span class="destination">${train.destination}</span>
                    </div>
                    <div class="train-time">
                        <span>${train.departure}</span> - <span>${train.arrival}</span>
                    </div>
                </div>
                <div class="train-action">
                    <div class="price">
                        <span class="economy-price">₦ ${train.economyPrice.toLocaleString()}</span>
                        <span class="first-class-price">₦ ${train.firstClassPrice.toLocaleString()}</span>
                    </div>
                    <button class="select-btn" data-train-id="${train.id}">Select</button>
                </div>
            `;
            trainList.appendChild(trainCard);
        });
        updatePricesBasedOnFareClass();
    }

    function updatePricesBasedOnFareClass() {
        const economyPrices = document.querySelectorAll('.economy-price');
        const firstClassPrices = document.querySelectorAll('.first-class-price');
        
        if (fareClass === 'first-class') {
            economyPrices.forEach(el => el.style.display = 'none');
            firstClassPrices.forEach(el => el.style.display = 'inline');
        } else {
            firstClassPrices.forEach(el => el.style.display = 'none');
            economyPrices.forEach(el => el.style.display = 'inline');
        }
    }

    trainList.addEventListener('click', (event) => {
        if (event.target.classList.contains('select-btn')) {
            window.location.href = `seat-selection.html?fareClass=${fareClass}`;
        }
    });

    renderTrains();
}