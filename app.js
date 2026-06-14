/*
  ======================================================
  RED GLASSMORPHIC TRAVEL DASHBOARD - APPLICATION LOGIC
  ======================================================
*/

// --- 1. DEFAULT ITINERARY DATA ---
const DEFAULT_ITINERARY = [
  // Day 1: June 22, 2026
  {
    id: "evt-1-1",
    day: 1,
    time: "08:30",
    title: "Suggested Check-in",
    location: "IDR Airport (2 hours before flight)",
    category: "flight"
  },
  {
    id: "evt-1-2",
    day: 1,
    time: "10:10",
    title: "Indigo Flight Departs from IDR (6E 6387)",
    location: "IndiGo 6E 6387 (Ref: W9T8NM)",
    category: "flight"
  },
  {
    id: "evt-1-3",
    day: 1,
    time: "11:50",
    title: "Arrival to BOM Airport & Meet Up",
    location: "Chhatrapati Shivaji Maharaj International Airport (T1/T2)",
    category: "flight"
  },
  {
    id: "evt-1-4",
    day: 1,
    time: "12:30",
    title: "Travel to Taj Santacruz",
    location: "Santacruz East, Mumbai",
    category: "hotel"
  },
  {
    id: "evt-1-5",
    day: 1,
    time: "13:00",
    title: "Check-in & Leave Luggage",
    location: "Taj Santacruz (Explore T1 runway views)",
    category: "hotel"
  },
  {
    id: "evt-1-6",
    day: 1,
    time: "14:00",
    title: "Lunch & Project Meeting",
    location: "Project Work Session",
    category: "work"
  },
  {
    id: "evt-1-7",
    day: 1,
    time: "17:30",
    title: "Hotel Tour & Surrounding Exploration",
    location: "Taj Santacruz Premises",
    category: "leisure"
  },
  {
    id: "evt-1-8",
    day: 1,
    time: "18:30",
    title: "Evening Work Review",
    location: "Work Session",
    category: "work"
  },
  {
    id: "evt-1-9",
    day: 1,
    time: "20:30",
    title: "Evening Snacks & Close of Day",
    location: "Taj Santacruz Lounge",
    category: "leisure"
  },

  // Day 2: June 23, 2026
  {
    id: "evt-2-1",
    day: 2,
    time: "08:00",
    title: "Breakfast",
    location: "Taj Santacruz Dining",
    category: "hotel"
  },
  {
    id: "evt-2-2",
    day: 2,
    time: "09:30",
    title: "Freshen up",
    location: "Taj Santacruz",
    category: "hotel"
  },
  {
    id: "evt-2-3",
    day: 2,
    time: "10:30",
    title: "Work Session",
    location: "Work Session",
    category: "work"
  },
  {
    id: "evt-2-4",
    day: 2,
    time: "12:00",
    title: "Checkout & Travel to Westin",
    location: "Taj Santacruz to Westin Goregaon",
    category: "hotel"
  },
  {
    id: "evt-2-5",
    day: 2,
    time: "13:30",
    title: "Check-in & Drop Bags",
    location: "Westin Goregaon East",
    category: "hotel"
  },
  {
    id: "evt-2-6",
    day: 2,
    time: "15:00",
    title: "Paradox Museum Visit",
    location: "South Mumbai (Illusion Paradox Museum)",
    category: "leisure"
  },
  {
    id: "evt-2-7",
    day: 2,
    time: "17:00",
    title: "Palladium Phoenix Mall",
    location: "Lower Parel, Mumbai",
    category: "leisure"
  },
  {
    id: "evt-2-8",
    day: 2,
    time: "20:00",
    title: "Carter Road Walk",
    location: "Bandra West Promenade",
    category: "leisure"
  },
  {
    id: "evt-2-9",
    day: 2,
    time: "21:30",
    title: "Return to Room",
    location: "Westin Goregaon East",
    category: "hotel"
  },

  // Day 3: June 24, 2026
  {
    id: "evt-3-1",
    day: 3,
    time: "08:00",
    title: "Breakfast",
    location: "Westin Goregaon Dining",
    category: "hotel"
  },
  {
    id: "evt-3-2",
    day: 3,
    time: "09:30",
    title: "Freshen up, Work Summary & Final Review",
    location: "Work Session",
    category: "work"
  },
  {
    id: "evt-3-3",
    day: 3,
    time: "12:00",
    title: "Check-out from Westin",
    location: "Westin Goregaon East",
    category: "hotel"
  },
  {
    id: "evt-3-4",
    day: 3,
    time: "12:30",
    title: "Shopping & Lunch",
    location: "Oberoi Mall, Goregaon",
    category: "leisure"
  },
  {
    id: "evt-3-5",
    day: 3,
    time: "14:00",
    title: "Travel to BOM Airport",
    location: "Goregaon to Chhatrapati Shivaji Maharaj Airport",
    category: "flight"
  },
  {
    id: "evt-3-6",
    day: 3,
    time: "16:50",
    title: "Indigo Flight Departs BOM to IDR (6E 6599)",
    location: "IndiGo 6E 6599 (Ref: H4MNRY)",
    category: "flight"
  }
];

// --- 2. STATE MANAGEMENT ---
const STATE = {
  itinerary: [],
  currentFilter: "all",
  reminders: {
    arrivalBooked: false,
    departureBooked: false
  },
  flights: {
    arrivalStatus: "Checking...",
    departureStatus: "Checking...",
    lastChecked: null
  }
};

// --- 3. DOM ELEMENTS ---
const elements = {
  timelineDaysContainer: document.getElementById("timeline-days-container"),
  tabButtons: document.querySelectorAll(".tab-btn"),
  addEventBtn: document.getElementById("add-event-btn"),
  eventModal: document.getElementById("event-modal"),
  closeModalBtn: document.getElementById("close-modal-btn"),
  cancelModalBtn: document.getElementById("cancel-modal-btn"),
  eventForm: document.getElementById("event-form"),
  eventIdInput: document.getElementById("event-id"),
  eventDaySelect: document.getElementById("event-day"),
  eventTimeInput: document.getElementById("event-time"),
  eventTitleInput: document.getElementById("event-title"),
  eventLocationInput: document.getElementById("event-location"),
  eventCategorySelect: document.getElementById("event-category"),
  modalTitle: document.getElementById("modal-title"),
  
  // Reminder details
  arrivalCheckbox: document.getElementById("transfer-arr-checked"),
  departureCheckbox: document.getElementById("transfer-dep-checked"),
  alertBanner: document.getElementById("reminder-alert-banner"),
  
  // Flight details
  refreshFlightsBtn: document.getElementById("refresh-flights"),
  flightUpdateTime: document.getElementById("flight-update-time"),
  flightArrivalEl: document.querySelector("#flight-arrival .flight-status"),
  flightDepartureEl: document.querySelector("#flight-departure .flight-status")
};

// --- 4. INITIALIZATION ---
window.addEventListener("DOMContentLoaded", () => {
  loadData();
  setupEventListeners();
  simulateFlightStatusUpdate();
  lucide.createIcons();
  
  // Auto simulate updates every 2 hours (conceptually, we use 10 seconds for demo visual changes if clicked, plus interval)
  setInterval(simulateFlightStatusUpdate, 60000); // Check/update status checking loop
});

// Load data from Local Storage
function loadData() {
  const storedItinerary = localStorage.getItem("gungun_itinerary_v3");
  if (storedItinerary) {
    STATE.itinerary = JSON.parse(storedItinerary);
  } else {
    STATE.itinerary = [...DEFAULT_ITINERARY];
    saveToStorage();
  }

  // Load reminders
  const storedReminders = localStorage.getItem("gungun_reminders");
  if (storedReminders) {
    STATE.reminders = JSON.parse(storedReminders);
  }
  
  elements.arrivalCheckbox.checked = STATE.reminders.arrivalBooked;
  elements.departureCheckbox.checked = STATE.reminders.departureBooked;
  updateReminderUI();

  renderTimeline();
}

// Save data to Local Storage
function saveToStorage() {
  localStorage.setItem("gungun_itinerary_v3", JSON.stringify(STATE.itinerary));
}

function saveRemindersToStorage() {
  localStorage.setItem("gungun_reminders", JSON.stringify(STATE.reminders));
}

// --- 5. RENDER TIMELINE ---
function renderTimeline() {
  elements.timelineDaysContainer.innerHTML = "";
  
  // Filter events
  const filteredEvents = STATE.itinerary.filter(event => {
    if (STATE.currentFilter === "all") return true;
    return event.category === STATE.currentFilter;
  });

  // Group events by day
  const days = {
    1: { name: "Day 1: June 22, 2026", sub: "Arrival & Setup at Taj Santacruz", events: [] },
    2: { name: "Day 2: June 23, 2026", sub: "Shift to Westin & South Mumbai Tour", events: [] },
    3: { name: "Day 3: June 24, 2026", sub: "Review, Shopping & Departure", events: [] }
  };

  filteredEvents.forEach(event => {
    if (days[event.day]) {
      days[event.day].events.push(event);
    }
  });

  // Sort events chronologically inside each day
  for (const dayKey in days) {
    days[dayKey].events.sort((a, b) => a.time.localeCompare(b.time));
  }

  // Generate HTML
  let totalRenderedEvents = 0;
  for (const dayKey in days) {
    const day = days[dayKey];
    if (day.events.length === 0) continue; // Skip day if no matching events

    totalRenderedEvents += day.events.length;

    const dayBlock = document.createElement("div");
    dayBlock.className = "day-block";
    dayBlock.innerHTML = `
      <div class="day-header">
        <div class="day-badge-marker">${dayKey}</div>
        <div class="day-title-info">
          <h2>${day.name}</h2>
          <span>${day.sub}</span>
        </div>
      </div>
      <div class="day-events"></div>
    `;

    const eventsContainer = dayBlock.querySelector(".day-events");
    
    day.events.forEach(event => {
      const eventCard = document.createElement("div");
      eventCard.className = "event-card";
      
      // Determine node color for map nodes
      let nodeColor = "var(--accent-red)";
      if (event.category === "flight") nodeColor = "var(--accent-cyan)";
      else if (event.category === "hotel") nodeColor = "var(--accent-red)";
      else if (event.category === "work") nodeColor = "var(--accent-orange)";
      else if (event.category === "leisure") nodeColor = "var(--accent-gold)";
      
      eventCard.style.setProperty("--node-color", nodeColor);

      // Format time to 12-hour format for premium readability
      const formattedTime = format12Hour(event.time);

      eventCard.innerHTML = `
        <div class="event-time">${formattedTime}</div>
        <div class="event-details-main">
          <div class="event-title-row">
            <span class="event-title">${escapeHTML(event.title)}</span>
            <span class="event-badge badge-${event.category}">${event.category}</span>
          </div>
          <div class="event-location">
            <i data-lucide="map-pin"></i>
            <span>${escapeHTML(event.location)}</span>
          </div>
        </div>
        <div class="event-actions">
          <button class="icon-btn-small edit-btn" data-id="${event.id}" title="Edit Activity">
            <i data-lucide="edit-2"></i>
          </button>
          <button class="icon-btn-small delete-btn" data-id="${event.id}" title="Delete Activity">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      `;

      eventsContainer.appendChild(eventCard);
    });

    elements.timelineDaysContainer.appendChild(dayBlock);
  }

  if (totalRenderedEvents === 0) {
    elements.timelineDaysContainer.innerHTML = `
      <div class="alert-banner warning" style="margin-top: 20px;">
        <i data-lucide="info"></i>
        <span>No activities scheduled in this category. Click 'Add Activity' to create one!</span>
      </div>
    `;
  }

  lucide.createIcons();
  bindEventCardButtons();
}

// --- 6. EVENT ACTION HANDLERS (CRUD) ---
function setupEventListeners() {
  // Tabs filtering
  elements.tabButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      elements.tabButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      STATE.currentFilter = button.getAttribute("data-category");
      renderTimeline();
    });
  });

  // Modal display toggles
  elements.addEventBtn.addEventListener("click", () => {
    openModal();
  });

  elements.closeModalBtn.addEventListener("click", closeModal);
  elements.cancelModalBtn.addEventListener("click", closeModal);

  // Form submission
  elements.eventForm.addEventListener("submit", (e) => {
    e.preventDefault();
    saveFormValues();
  });

  // Reminder Toggles
  elements.arrivalCheckbox.addEventListener("change", (e) => {
    STATE.reminders.arrivalBooked = e.target.checked;
    saveRemindersToStorage();
    updateReminderUI();
  });

  elements.departureCheckbox.addEventListener("change", (e) => {
    STATE.reminders.departureBooked = e.target.checked;
    saveRemindersToStorage();
    updateReminderUI();
  });

  // Flight refresh simulator
  elements.refreshFlightsBtn.addEventListener("click", () => {
    const icon = elements.refreshFlightsBtn.querySelector("i");
    icon.style.animation = "spin 1s linear infinite";
    
    // Simulate lookup delay
    setTimeout(() => {
      simulateFlightStatusUpdate();
      icon.style.animation = "none";
    }, 800);
  });
}

function bindEventCardButtons() {
  // Bind Edit button
  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const eventId = btn.getAttribute("data-id");
      const eventToEdit = STATE.itinerary.find(evt => evt.id === eventId);
      if (eventToEdit) {
        openModal(eventToEdit);
      }
    });
  });

  // Bind Delete button
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const eventId = btn.getAttribute("data-id");
      if (confirm("Are you sure you want to delete this activity from Gungun's itinerary?")) {
        deleteEvent(eventId);
      }
    });
  });
}

function deleteEvent(id) {
  STATE.itinerary = STATE.itinerary.filter(evt => evt.id !== id);
  saveToStorage();
  renderTimeline();
}

function openModal(eventObj = null) {
  elements.eventModal.classList.add("active");
  
  if (eventObj) {
    elements.modalTitle.textContent = "Edit Activity";
    elements.eventIdInput.value = eventObj.id;
    elements.eventDaySelect.value = eventObj.day;
    elements.eventTimeInput.value = eventObj.time;
    elements.eventTitleInput.value = eventObj.title;
    elements.eventLocationInput.value = eventObj.location;
    elements.eventCategorySelect.value = eventObj.category;
  } else {
    elements.modalTitle.textContent = "Add New Activity";
    elements.eventIdInput.value = "";
    elements.eventForm.reset();
  }
}

function closeModal() {
  elements.eventModal.classList.remove("active");
}

function saveFormValues() {
  const id = elements.eventIdInput.value;
  const day = parseInt(elements.eventDaySelect.value, 10);
  const time = elements.eventTimeInput.value;
  const title = elements.eventTitleInput.value;
  const location = elements.eventLocationInput.value;
  const category = elements.eventCategorySelect.value;

  if (id) {
    // Edit existing
    const index = STATE.itinerary.findIndex(evt => evt.id === id);
    if (index !== -1) {
      STATE.itinerary[index] = { id, day, time, title, location, category };
    }
  } else {
    // Add new
    const newId = "evt-" + Date.now();
    STATE.itinerary.push({ id: newId, day, time, title, location, category });
  }

  saveToStorage();
  closeModal();
  renderTimeline();
}

// --- 7. REMINDERS WIDGET LOGIC ---
function updateReminderUI() {
  const arrival = STATE.reminders.arrivalBooked;
  const departure = STATE.reminders.departureBooked;

  if (arrival && departure) {
    elements.alertBanner.className = "alert-banner success";
    elements.alertBanner.innerHTML = `
      <i data-lucide="check-circle"></i>
      <span>All Airport Transfers Booked! (June 21 reminder cleared)</span>
    `;
  } else {
    elements.alertBanner.className = "alert-banner warning";
    elements.alertBanner.innerHTML = `
      <i data-lucide="alert-triangle"></i>
      <span>Action Required: Set transfer bookings!</span>
    `;
  }
  lucide.createIcons();
}

// --- 8. FLIGHT STATUS SIMULATOR ---
function simulateFlightStatusUpdate() {
  const now = new Date();
  
  // Flight dates
  const flightDateArrival = new Date(2026, 5, 22); // June 22, 2026 (0-indexed month 5 is June)
  const flightDateDeparture = new Date(2026, 5, 24); // June 24, 2026
  
  // Reset time parts of dates for accurate date comparison
  const todayDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const arrivalDateOnly = new Date(flightDateArrival.getFullYear(), flightDateArrival.getMonth(), flightDateArrival.getDate());
  const departureDateOnly = new Date(flightDateDeparture.getFullYear(), flightDateDeparture.getMonth(), flightDateDeparture.getDate());
  
  let arrivalStatus = { label: "Scheduled", class: "badge-on-time" };
  let departureStatus = { label: "Scheduled", class: "badge-on-time" };
  
  const liveStatuses = [
    { label: "On Time", class: "badge-on-time" },
    { label: "On Time", class: "badge-on-time" },
    { label: "Delayed 15m", class: "badge-delayed" },
    { label: "On Time", class: "badge-on-time" },
    { label: "Boarding", class: "badge-on-time" },
    { label: "Delayed 30m", class: "badge-delayed" }
  ];
  
  // Arrival Flight (June 22)
  if (todayDateOnly < arrivalDateOnly) {
    arrivalStatus = { label: "Confirmed", class: "badge-on-time" };
  } else if (todayDateOnly.getTime() === arrivalDateOnly.getTime()) {
    arrivalStatus = liveStatuses[Math.floor(Math.random() * liveStatuses.length)];
  } else {
    arrivalStatus = { label: "Arrived", class: "badge-on-time" };
  }
  
  // Departure Flight (June 24)
  if (todayDateOnly < departureDateOnly) {
    departureStatus = { label: "Confirmed", class: "badge-on-time" };
  } else if (todayDateOnly.getTime() === departureDateOnly.getTime()) {
    departureStatus = liveStatuses[Math.floor(Math.random() * liveStatuses.length)];
  } else {
    departureStatus = { label: "Departed", class: "badge-on-time" };
  }
  
  STATE.flights.arrivalStatus = arrivalStatus;
  STATE.flights.departureStatus = departureStatus;
  
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  STATE.flights.lastChecked = timeString;

  // Render Flight status UI
  elements.flightArrivalEl.textContent = arrivalStatus.label;
  elements.flightArrivalEl.className = `flight-status ${arrivalStatus.class}`;

  elements.flightDepartureEl.textContent = departureStatus.label;
  elements.flightDepartureEl.className = `flight-status ${departureStatus.class}`;

  elements.flightUpdateTime.textContent = `Last Checked: Today, ${timeString}`;
}

// --- 9. HELPERS ---
function format12Hour(time24) {
  const [hourStr, minStr] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  hour = hour ? hour : 12; // the hour '0' should be '12'
  return `${hour.toString().padStart(2, '0')}:${minStr} ${ampm}`;
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// --- 10. CLICK TAKEOFF ANIMATION ---
document.addEventListener("click", (e) => {
  // Exclude form controls or action buttons to keep interfaces clean
  if (e.target.closest("input") || e.target.closest("select") || e.target.closest("button") || e.target.closest("a") || e.target.closest(".close-btn")) {
    return;
  }
  
  const plane = document.createElement("div");
  plane.className = "click-airplane";
  plane.style.left = `${e.clientX}px`;
  plane.style.top = `${e.clientY}px`;
  
  // Custom high-contrast SVG airplane icon
  plane.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3.5c-.5-.5-2.5 0-4 1.5L13.5 8.5 5.3 6.7c-.9-.2-1.9.3-2.1 1.2a1.8 1.8 0 0 0 .5 1.7l6.5 4.5-4 4-2.5-.5c-.6-.2-1.3 0-1.7.5-.5.5-.5 1.3 0 1.8l2.5 2.5c.3.3.7.5 1.2.5.2 0 .5 0 .6-.2l4-4 4.5 6.5c.3.5.9.8 1.5.8.1 0 .2 0 .4-.1.9-.2 1.4-1.2 1.2-2.1Z"/>
    </svg>
  `;
  
  document.body.appendChild(plane);
  
  // Remove element after animation completes
  setTimeout(() => {
    plane.remove();
  }, 900);
});
