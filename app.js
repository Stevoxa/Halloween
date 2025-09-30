// ======================================================
//
//  CONFIG - HÄR ÄNDRAR DU SPELETS INNEHÅLL
//
// ======================================================

const mapStartCenter = { lat: 59.284, lng: 17.785 };
const UNLOCK_DISTANCE = 5;
const treasureLocationDescription = "under den största stenen, bakom den gamla träbänken vid fotbollsplanens östra kant.";

const storyStartText = "Leos ande är svag... Han viskar att hans första minne finns vid en plats där byns hemligheter delas. Leta efter anslagstavlan.";

const locations = [

    // Steg 1: Anslagstavlan
    { 
        position: { lat: 59.2839, lng: 17.7848 }, // <-- DINA UPPDATERADE KOORDINATER
        title: "Ett Eko vid Anslagstavlan",
        story: "Leos viskning är starkast här, där meddelanden delas. 'Min historia börjar här', säger han. 'Ett tecken finns kvar, om ni tittar noga...'",
        task: "Hur många häftstift sitter i den övre, vänstra fjärdedelen av tavlan?",
        answer: "7",
        nextClue: "Bra! Anden viskar: 'Jag minns skratt och lek... Jag älskade att flyga högt, högt upp mot himlen i närheten.'"
    },

    // Steg 2: Lekpark 1 (Närmast start)
    { 
        position: { lat: 59.2838, lng: 17.7855 },
        title: "Minnen vid Gungorna",
        story: "'Jag älskade att flyga högt, högt upp i luften här', viskar Leo. 'Så högt att jag nästan kunde nudda molnen. Men något var annorlunda med min favoritgunga.'",
        task: "Vilken färg har sätet på gungan som är längst till höger?",
        answer: "röd",
        nextClue: "Det stämmer... Leo drar sig till minnes en mur av sten som han brukade balansera på, inte långt härifrån."
    },

    // ... (resten av platserna är oförändrade) ...
    { position: { lat: 59.2845, lng: 17.7858 }, title: "Huset med Stenmuren", story: "'Jag gick förbi det här huset...'", task: "...", answer: "S", nextClue: "Ja... Anden dras nu mot sitt gamla kungadöme..." },
    { position: { lat: 59.2848, lng: 17.7852 }, title: "Det Fallna Trädet", story: "'Det här var mitt kungadöme! ...'", task: "...", answer: "4", nextClue: "Korrekt. Leo minns ett tyst spel..." },
    { position: { lat: 59.2842, lng: 17.7845 }, title: "De Silverglänsande Kloten", story: "'De vuxna spelade ett konstigt...'", task: "...", answer: "2", nextClue: "Precis. Leos minne hoppar till en annan lekplats..." },
    { position: { lat: 59.2835, lng: 17.7848 }, title: "Den Långa Resan Ner", story: "'Det kittlade i magen varje gång! ...'", task: "...", answer: "5", nextClue: "Ja! Nu minns han ett hus med en vimpel..." },
    { position: { lat: 59.2839, lng: 17.7862 }, title: "Vimpeln i Vinden", story: "'Här brukade en flagga alltid vaja...'", task: "...", answer: "6", nextClue: "Rätt! Nu blir Leos minne mörkt..." },
    { position: { lat: 59.2850, lng: 17.7865 }, title: "Den Tysta Matchen", story: "'Här var det alltid fullt av liv...'", task: "...", answer: "3", nextClue: "Ja, det var där. Leo viskar: 'Jag var så ledsen...'" },
    { position: { lat: 59.2847, lng: 17.7841 }, title: "Den Sista Pusselbiten", story: "'Efter att jag tappat min trähäst kom jag hit...'", task: "...", answer: "bänken", nextClue: "Det är rätt! Anden är nära nu..." },
    { position: { lat: 59.2851, lng: 17.7866 }, title: "Skatten!", story: "...", task: "...", answer: "placeholder", nextClue: "" }
];


// ======================================================
//
//  SPELMOTOR - RÖR EJ KODEN NEDANFÖR
//
// ======================================================

let map;
let currentMarker;
let currentIndex = 0;
let AdvancedMarkerElement;
let userPosition = null;
let userMarker = null;

const startScreen = document.getElementById('start-screen');
const mapScreen = document.getElementById('map-screen');
const endScreen = document.getElementById('end-screen');
const startBtn = document.getElementById('start-btn');
const modal = document.getElementById('task-modal');
const taskTitle = document.getElementById('task-title');
const taskStory = document.getElementById('task-story');
const taskQuestion = document.getElementById('task-question');
const taskAnswer = document.getElementById('task-answer');
const submitAnswerBtn = document.getElementById('submit-answer-btn');
const feedbackText = document.getElementById('feedback-text');
const distanceInfo = document.getElementById('distance-info');
const storyBanner = document.getElementById('story-banner');
const storyModal = document.getElementById('story-modal');
const storyModalText = document.getElementById('story-modal-text');
const storyModalBtn = document.getElementById('story-modal-btn');
const infoModal = document.getElementById('info-modal');
const infoModalTitle = document.getElementById('info-modal-title');
const infoModalText = document.getElementById('info-modal-text');
const infoModalBtn = document.getElementById('info-modal-btn');

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement: MarkerLibrary } = await google.maps.importLibrary("marker");
    AdvancedMarkerElement = MarkerLibrary;
    const myMapId = "e0482b82057a9b12a4579124";
    map = new Map(document.getElementById("map"), {
        center: mapStartCenter,
        zoom: 19,
        disableDefaultUI: true,
        zoomControl: true,
        mapId: myMapId
    });
    setupEventListeners();
}

function showInfoModal(title, message) {
    infoModalTitle.textContent = title;
    infoModalText.textContent = message;
    infoModal.style.display = 'flex';
}

function setupEventListeners() {
    startBtn.addEventListener('click', () => {
        startScreen.classList.remove('active');
        mapScreen.classList.add('active');
        storyBanner.textContent = storyStartText;
        google.maps.event.trigger(map, 'resize');
        map.setCenter(mapStartCenter);
        showNextLocation();
        startLocationWatcher();
    });
    submitAnswerBtn.addEventListener('click', checkAnswer);
    taskAnswer.addEventListener('keyup', (event) => {
        if (event.key === "Enter") checkAnswer();
    });
    storyModalBtn.addEventListener('click', () => {
        storyModal.style.display = 'none';
        storyBanner.textContent = locations[currentIndex].nextClue;
        currentIndex++;
        showNextLocation();
    });
    infoModalBtn.addEventListener('click', () => {
        infoModal.style.display = 'none';
    });
}

function showNextLocation() {
    if (currentIndex < locations.length - 1) {
        const location = locations[currentIndex];
        currentMarker = new AdvancedMarkerElement({
            position: location.position,
            map: map,
            title: location.title,
            content: createMarkerIcon('active')
        });
        currentMarker.addListener('click', () => {
            if (!userPosition) {
                showInfoModal("Positionering", "Väntar på att hitta din position. Försök igen om en liten stund.");
                return;
            }
            const distance = getDistance(userPosition, location.position);
            if (distance <= UNLOCK_DISTANCE) {
                modal.style.display = 'flex';
                taskTitle.textContent = location.title;
                taskStory.textContent = location.story;
                taskQuestion.textContent = location.task;
                taskAnswer.value = '';
                feedbackText.textContent = '';
            } else {
                showInfoModal("Du är för långt bort", `Gå närmare ledtråden! Du är fortfarande ${Math.round(distance)} meter ifrån.`);
            }
        });
        updateDistance();
    } else {
        showEndScreen();
    }
}

function startLocationWatcher() {if (!navigator.geolocation) { distanceInfo.textContent = "Geopositionering stöds inte."; return; } navigator.geolocation.watchPosition((position) => { userPosition = { lat: position.coords.latitude, lng: position.coords.longitude }; if (!userMarker) { const userMarkerElement = document.createElement('div'); userMarkerElement.className = 'user-marker'; userMarker = new AdvancedMarkerElement({ position: userPosition, map: map, content: userMarkerElement, title: 'Din position' }); } else { userMarker.position = userPosition; } updateDistance(); }, () => { distanceInfo.textContent = "Kunde inte hämta position."; }, { enableHighAccuracy: true });}
function updateDistance() {if (!userPosition || currentIndex >= locations.length - 1) { distanceInfo.style.display = 'none'; return; } distanceInfo.style.display = 'block'; const targetPosition = locations[currentIndex].position; const distance = getDistance(userPosition, targetPosition); if (distance <= UNLOCK_DISTANCE) { distanceInfo.textContent = "Du är framme! Klicka på spöket."; } else { distanceInfo.textContent = `Du är ${Math.round(distance)} meter bort.`; }}
function getDistance(pos1, pos2) { const R = 6371e3; const φ1 = pos1.lat * Math.PI / 180; const φ2 = pos2.lat * Math.PI / 180; const Δφ = (pos2.lat - pos1.lat) * Math.PI / 180; const Δλ = (pos2.lng - pos1.lng) * Math.PI / 180; const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2); const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); return R * c; }
function createMarkerIcon(type) { const iconDiv = document.createElement('div'); iconDiv.className = 'marker-icon'; if (type === 'completed') { iconDiv.textContent = '🪦'; iconDiv.classList.add('completed'); } else { iconDiv.textContent = '👻'; } return iconDiv; }
function checkAnswer() { const userAnswer = taskAnswer.value.trim().toLowerCase(); const correctAnswer = locations[currentIndex].answer.toLowerCase(); if (userAnswer === correctAnswer) { feedbackText.textContent = "Rätt svar!"; feedbackText.style.color = "#00ff00"; if (currentMarker) { currentMarker.content = createMarkerIcon('completed'); currentMarker.gmpClickable = false; } setTimeout(() => { modal.style.display = 'none'; showStoryUpdate(); }, 1500); } else { feedbackText.textContent = "Fel svar. Försök igen!"; feedbackText.style.color = "#ff0000"; } }
function showStoryUpdate() { const nextClueText = locations[currentIndex].nextClue; if (nextClueText) { storyModalText.textContent = nextClueText; storyModal.style.display = 'flex'; } else { currentIndex++; showNextLocation(); } }
function showEndScreen() { mapScreen.classList.remove('active'); endScreen.classList.add('active'); storyBanner.style.display = 'none'; distanceInfo.style.display = 'none'; document.getElementById('treasure-location').textContent = treasureLocationDescription; }

window.initMap = initMap;