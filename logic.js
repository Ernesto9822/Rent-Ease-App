//const flats = [];
const LOCAL_STORAGE_KEY = "flatsData"; //key for storing flats in localstorage

const saveFlatsToLocalStorage = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(flats));
};

//function to load flats from local storage
const loadFlatsFromLocalStorage = () => {
    const storedFlats = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedFlats ? JSON.parse(storedFlats) : [];
};

//Load flats on page load
let flats = loadFlatsFromLocalStorage();

// Function to render flats table
const renderFlatsTable = (data = flats) => {
    const tableBody = document.getElementById("flats-table-body");
    
    // Clear the table body
    tableBody.innerHTML = "";

    // Render rows for each flat in the data array
    data.forEach((flat, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${flat.city}</td>
            <td>${flat.streetName}</td>
            <td>${flat.streetNumber}</td>
            <td>${flat.areaSize} sq ft</td>
            <td>${flat.hasAC ? "Yes" : "No"}</td>
            <td>${flat.yearBuilt}</td>
            <td>$${flat.rentPrice}</td>
            <td>${flat.dateAvailable}</td>
            <td><button onclick="toggleFavorite(${index})">${flat.favorite ? "Unmark" : "Mark"}</button></td>
        `;
        tableBody.appendChild(row);
    });
};

//Save Updated flats data after render.
//saveFlatsToLocalStorage();

// Function to toggle favorite status
const toggleFavorite = (index) => {
    flats[index].favorite = !flats[index].favorite;  // Toggle the boolean value
    localStorage.setItem("flatsData", JSON.stringify(flats));
    renderFlatsTable();  // Re-render the table
};

// Function to handle filtering
document.getElementById("filter-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get filter values
    const city = document.getElementById("filter-city").value.toLowerCase().trim();
    const priceMin = parseInt(document.getElementById("filter-price-min").value) || 0;
    const priceMax = parseInt(document.getElementById("filter-price-max").value) || Infinity;
    const areaMin = parseInt(document.getElementById("filter-area-min").value) || 0;
    const areaMax = parseInt(document.getElementById("filter-area-max").value) || Infinity;
 

    // Debugging: Log filter criteria
    console.log("Filter Criteria:", { city, priceMin, priceMax, areaMin, areaMax });

    // Filter flats
    const filteredFlats = flats.filter(flat =>
        (!city || flat.city.toLowerCase().includes(city)) &&
        flat.rentPrice >= priceMin && flat.rentPrice <= priceMax &&
        flat.areaSize >= areaMin && flat.areaSize <= areaMax
    );

    // Debugging: Log filtered flats
    console.log("Filtered Flats:", filteredFlats);

    // Render filtered flats
    renderFlatsTable(filteredFlats);
});

// Function to handle new flat form submission
document.getElementById("add-flat-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const newFlat = {
        city: document.getElementById("new-city").value,
        streetName: document.getElementById("new-street-name").value,
        streetNumber: parseInt(document.getElementById("new-street-number").value),
        areaSize: parseInt(document.getElementById("new-area-size").value),
        hasAC: document.getElementById("new-has-ac").value === "true",
        yearBuilt: parseInt(document.getElementById("new-year-built").value),
        rentPrice: parseInt(document.getElementById("new-rent-price").value),
        dateAvailable: document.getElementById("new-date-available").value,
        favorite: false,
    };

    flats.push(newFlat);
    saveFlatsToLocalStorage(); // <--- This ensures new data is saved
    renderFlatsTable();
}); 

// Initial render
renderFlatsTable();

    const user = JSON.parse(localStorage.getItem('user'));

// Display user's name if logged in
    if (user && user.firstName && user.lastName) {
    document.getElementById('userGreeting').innerText = `Welcome, ${user.firstName} ${user.lastName}`;
        } else {
      document.getElementById('userGreeting').innerText = 'Hello, Guest';
    }


