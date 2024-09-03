class AppManager {
    constructor() {
        this.busForm = document.getElementById('busForm');
        this.searchForm = document.getElementById('searchForm');
        this.busList = document.getElementById('busList');
        this.busDetails = document.getElementById('busDetails');

        this.busForm.addEventListener('submit', (e) => this.addOrUpdateBus(e));
        this.searchForm.addEventListener('submit', (e) => this.searchBus(e));

        this.fetchBuses();
    }

    async fetchBuses() {
        const res = await fetch('http://localhost:5000/api/buses');
        const buses = await res.json();
        this.renderBusList(buses);
    }

    async addOrUpdateBus(e) {
        e.preventDefault();
        const plate = document.getElementById('plate').value;
        const arrivalTime = document.getElementById('arrivalTime').value;

        const res = await fetch('http://localhost:5000/api/buses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ plate, arrivalTime })
        });

        if (res.ok) {
            alert('Bus registrado o actualizado con éxito');
            this.busForm.reset();
            this.fetchBuses();
        } else {
            alert('Error al registrar o actualizar el bus');
        }
    }

    async searchBus(e) {
        e.preventDefault();
        const plate = document.getElementById('searchPlate').value;

        const res = await fetch(`http://localhost:5000/api/buses/${plate}`);

        if (res.ok) {
            const bus = await res.json();
            this.renderBusDetails(bus);
        } else {
            alert('Bus no encontrado');
            this.busDetails.innerHTML = '';
        }
    }

    renderBusList(buses) {
        this.busList.innerHTML = '';
        buses.forEach(bus => {
            const li = document.createElement('li');
            li.textContent = `${bus.plate} - ${new Date(bus.arrivalTime).toLocaleString()} (Ediciones: ${bus.editCount})`;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.addEventListener('click', () => this.deleteBus(bus.plate));
            li.appendChild(deleteBtn);
            this.busList.appendChild(li);
        });
    }

    async deleteBus(plate) {
        const res = await fetch(`http://localhost:5000/api/buses/${plate}`, { method: 'DELETE' });

        if (res.ok) {
            alert('Bus eliminado con éxito');
            this.fetchBuses();
        } else {
            alert('Error al eliminar el bus');
        }
    }

    renderBusDetails(bus) {
        this.busDetails.innerHTML = `
            <h3>Detalles del Bus</h3>
            <p>Placa: ${bus.plate}</p>
            <p>Hora de llegada: ${new Date(bus.arrivalTime).toLocaleString()}</p>
            <p>Cantidad de ediciones: ${bus.editCount}</p>
        `;
    }
}

// Iniciar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    new AppManager();
});
