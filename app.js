// ======================================================
// CONFIG - HÄR ÄNDRAR DU SPELETS INNEHÅLL
// ======================================================

const mapStartCenter = { lat: 57.708870, lng: 11.974560 };

const locations = [
  {
    position: { lat: 57.707, lng: 11.975 },
    title: "Den gamla statyn",
    story: "Anden dras till denna plats. Statyn bär på en hemlighet från det förflutna.",
    task: "Vilket årtal står ingraverat på statyns sockel?",
    answer: "1923"
  },
  {
    position: { lat: 57.709, lng: 11.972 },
    title: "Den ekande bron",
    story: "Varje steg du tar ekar som spöklika viskningar. Anden vill att du räknar noga.",
    task: "Hur många gatlyktor finns det på brons västra sida?",
    answer: "5"
  },
  {
    position: { lat: 57.708, lng: 11.978 },
    title: "Klocktornet",
    story: "Tiden står stilla för anden, men inte för det gamla klocktornet. Dess visare pekar mot din sista ledtråd.",
    task: "Vilken siffra pekar den lilla visaren närmast mot?",
    answer: "9"
  }
];

const treasureLocationDescription = "under den största boken i parkens mitt.";

// ======================================================
// SPELMOTOR
// ======================================================

let map;
let currentMarker;
let currentIndex = 0;
let AdvancedMarkerElement; // Deklareras här för att vara tillgänglig i hela filen

// Hämta alla HTML-element
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

// Asynkron huvudfunktion som startar hela applikationen
async function init() {
    // Steg 1: Importera de Google Maps-bibliotek som behövs
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement: MarkerLibrary } = await google.maps.importLibrary("marker");
    
    // Tilldela den importerade markörklassen till vår variabel
    AdvancedMarkerElement = MarkerLibrary; 

    // Steg 2: Skapa kartan med det korrekta Map ID:t
    const myMapId = "e0482b62097a9124"; 

    map = new Map(document.getElementById("map"), {
        center: mapStartCenter,
        zoom: 15,   
        disableDefaultUI: true,
        zoomControl: true,
        mapId: myMapId 
    });

    // Steg 3: Sätt upp alla klick-lyssnare nu när kartan är garanterat laddad
    setupEventListeners();
}

function setupEventListeners() {
    startBtn.addEventListener('click', () => {
        startScreen.classList.remove('active');
        mapScreen.classList.add('active');
        
        // Trigger en 'resize' för kartan när den blir synlig för att undvika gråa rutor
        google.maps.event.trigger(map, 'resize'); 
        map.setCenter(mapStartCenter);
        
        showNextLocation();
    });

    submitAnswerBtn.addEventListener('click', checkAnswer);

    taskAnswer.addEventListener('keyup', (event) => {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });
}

function showNextLocation() {
    if (currentIndex < locations.length) {
        const location = locations[currentIndex];
        
        // Ta bort föregående markör om den finns
        if (currentMarker) {
            currentMarker.map = null;
        }

        // Skapa en ny avancerad markör
        currentMarker = new AdvancedMarkerElement({
            position: location.position,
            map: map,
            title: location.title,
        });

        // Lägg till en klick-lyssnare för den nya markören
        currentMarker.addListener('click', () => {
            taskTitle.textContent = location.title;
            taskStory.textContent = location.story;
            taskQuestion.textContent = location.task;
            taskAnswer.value = '';
            feedbackText.textContent = '';
            modal.style.display = 'flex';
        });

    } else {
        // Inga fler platser kvar, visa slutet
        showEndScreen();
    }
}

function checkAnswer() {
    const userAnswer = taskAnswer.value.trim().toLowerCase();
    const correctAnswer = locations[currentIndex].answer.toLowerCase();

    if (userAnswer === correctAnswer) {
        feedbackText.textContent = "Rätt svar!";
        feedbackText.style.color = "#00ff00";
        
        setTimeout(() => {
            modal.style.display = 'none';
            currentIndex++;
            showNextLocation();
        }, 1500);

    } else {
        feedbackText.textContent = "Fel svar. Försök igen!";
        feedbackText.style.color = "#ff0000";
    }
}

function showEndScreen() {
    mapScreen.classList.remove('active');
    endScreen.classList.add('active');
    document.getElementById('treasure-location').textContent = treasureLocationDescription;
}

// Kör huvudfunktionen för att starta hela appen
init();