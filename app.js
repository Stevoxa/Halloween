// ======================================================
// CONFIG - HÄR ÄNDRAR DU SPELETS INNEHÅLL
// ======================================================
const mapStartCenter = { lat: 59.284, lng: 17.785 };
const locations = [
  { position: { lat: 59.2841, lng: 17.7851 }, title: "Ett Eko vid Anslagstavlan", story: "Leos viskning är starkast här, där meddelanden delas. 'Min historia börjar här', säger han. 'Ett tecken finns kvar, om ni tittar noga...'", task: "Hur många häftstift sitter i den övre, vänstra fjärdedelen av tavlan?", answer: "7" },
  { position: { lat: 59.2838, lng: 17.7855 }, title: "Minnen vid Gungorna", story: "'Jag älskade att flyga högt, högt upp i luften här', viskar Leo. 'Så högt att jag nästan kunde nudda molnen. Men något var annorlunda med min favoritgunga.'", task: "Vilken färg har sätet på gungan som är längst till höger?", answer: "röd" },
  { position: { lat: 59.2845, lng: 17.7858 }, title: "Huset med Stenmuren", story: "'Jag gick förbi det här huset varje dag', säger Leo. 'Jag brukade balansera på den låga stenmuren. De som bodde där hade ristat in sitt namn.'", task: "Vilken är den tredje bokstaven i namnet som är inristat i muren?", answer: "S" },
  { position: { lat: 59.2848, lng: 17.7852 }, title: "Det Fallna Trädet", story: "'Det här var mitt kungadöme! Jag klättrade ända till toppen. Men en stormig natt föll det, och en del av min barndom med det. Trädet minns stormen.'", task: "Räkna de stora, avbrutna grenarna som fortfarande sitter fast i huvudstammen.", answer: "4" },
  { position: { lat: 59.2842, lng: 17.7845 }, title: "De Silverglänsande Kloten", story: "'De vuxna spelade ett konstigt, tyst spel här', minns Leo. 'Jag satt på bänken och såg kloten glänsa. Allt var så fridfullt.'", task: "Vad blir poängen om du multiplicerar antalet bänkar med antalet papperskorgar vid planen?", answer: "2" },
  { position: { lat: 59.2835, lng: 17.7848 }, title: "Den Långa Resan Ner", story: "'Det kittlade i magen varje gång! Det här var den bästa rutschkanan i hela världen.'", task: "Hur många trappsteg har stegen som leder upp till rutschkanan?", answer: "5" },
  { position: { lat: 59.2839, lng: 17.7862 }, title: "Vimpeln i Vinden", story: "'Här brukade en flagga alltid vaja', säger Leo. 'Den visade mig åt vilket håll vinden blåste. Husets nummer är en del av gåtan.'", task: "Addera de två siffrorna i husnumret. (Exempel: Nr 24 blir 2+4=6).", answer: "6" },
  { position: { lat: 59.2850, lng: 17.7865 }, title: "Den Tysta Matchen", story: "'Här var det alltid fullt av liv. Skratt och rop... Jag minns en match, jag sprang längs kanten... och plötsligt kände jag att fickan var tom. Det var här... det var här jag tappade den.'", task: "Gå till det norra målet. Hur många rostiga skruvar håller fast den vänstra stolpen i marken?", answer: "3" },
  { position: { lat: 59.2847, lng: 17.7841 }, title: "Den Sista Pusselbiten", story: "'Efter att jag tappat min trähäst kom jag hit. Jag var så ledsen. Jag satt i sandlådan och grävde, som om jag kunde hitta en ny skatt. Men jag hittade bara en sista ledtråd...'", task: "Jag är gjord av trä, men är inte ett träd. Jag har fyra ben, men kan inte gå. Jag står för evigt vid fotbollsplanens kant. Vad är jag?", answer: "bänken" },
  { position: { lat: 59.2851, lng: 17.7866 }, title: "Skatten!", story: "Detta är den sista platsen!", task: "Hitta skatten!", answer: "placeholder" }
];
const treasureLocationDescription = "under den största stenen, bakom den gamla träbänken vid fotbollsplanens östra kant.";

const UNLOCK_DISTANCE = 25; // Meter

// ======================================================
// SPELMOTOR
// ======================================================
let map;
let currentMarker;
let currentIndex = 0;
let AdvancedMarkerElement;
let userPosition = null;

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

function startLocationWatcher() {
    if (!navigator.geolocation) {
        distanceInfo.textContent = "Geopositionering stöds inte av din webbläsare.";
        return;
    }
    const options = { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 };
    navigator.geolocation.watchPosition(
        (position) => {
            userPosition = { lat: position.coords.latitude, lng: position.coords.longitude };
            updateDistance();
        },
        () => {
            distanceInfo.textContent = "Kunde inte hämta din position. Aktivera platstjänster.";
        },
        options
    );
}

function updateDistance() {
    if (!userPosition || currentIndex >= locations.length - 1) {
        distanceInfo.style.display = 'none';
        return;
    }
    distanceInfo.style.display = 'block';
    const targetPosition = locations[currentIndex].position;
    const distance = getDistance(userPosition, targetPosition);
    if (distance <= UNLOCK_DISTANCE) {
        distanceInfo.textContent = "Du är framme! Klicka på markören.";
    } else {
        distanceInfo.textContent = `Du är ${Math.round(distance)} meter bort.`;
    }
}

function getDistance(pos1, pos2) {
    const R = 6371e3;
    const φ1 = pos1.lat * Math.PI / 180;
    const φ2 = pos2.lat * Math.PI / 180;
    const Δφ = (pos2.lat - pos1.lat) * Math.PI / 180;
    const Δλ = (pos2.lng - pos1.lng) * Math.PI / 180;
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function setupEventListeners() {
    startBtn.addEventListener('click', () => {
        startScreen.classList.remove('active');
        mapScreen.classList.add('active');
        google.maps.event.trigger(map, 'resize');
        map.setCenter(mapStartCenter);
        showNextLocation();
        startLocationWatcher();
    });
    submitAnswerBtn.addEventListener('click', checkAnswer);
    taskAnswer.addEventListener('keyup', (event) => {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });
}

function showNextLocation() {
    if (currentIndex < locations.length - 1) {
        const location = locations[currentIndex];
        if (currentMarker) {
            currentMarker.map = null;
        }
        currentMarker = new AdvancedMarkerElement({
            position: location.position,
            map: map,
            title: location.title,
        });
        currentMarker.addListener('click', () => {
            if (!userPosition) {
                alert("Väntar på din position...");
                return;
            }
            const distance = getDistance(userPosition, location.position);
            if (distance <= UNLOCK_DISTANCE) {
                taskTitle.textContent = location.title;
                taskStory.textContent = location.story;
                taskQuestion.textContent = location.task;
                taskAnswer.value = '';
                feedbackText.textContent = '';
                modal.style.display = 'flex';
            } else {
                alert(`Du är för långt bort! Gå närmare, du är ${Math.round(distance)} meter ifrån.`);
            }
        });
        updateDistance();
    } else {
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

window.initMap = initMap;