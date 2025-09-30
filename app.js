// ======================================================
//
//  CONFIG - HÄR ÄNDRAR DU SPELETS INNEHÅLL
//
// ======================================================

const mapStartCenter = { lat: 59.284, lng: 17.785 };
const UNLOCK_DISTANCE = 5;
const treasureLocationDescription = "under den största stenen, bakom den gamla träbänken vid fotbollsplanens östra kant.";
const ATTEMPTS_BEFORE_CHOICES = 3; 
const storyStartText = "Anden Silas är svag... Han viskar att hans första minne finns vid en plats där byns hemligheter delas. Leta efter anslagstavlan.";

const locations = [
    { position: { lat: 59.2839, lng: 17.7846 }, title: "Ett Eko vid Anslagstavlan", story: "Silas viskning är starkast här...", task: "Hur många häftstift sitter i den övre, vänstra fjärdedelen av tavlan?", answer: "7", choices: ["5", "7", "9"], nextClue: "Bra! Silas viskar: 'Jag minns skratt och lek... Jag älskade att flyga högt, högt upp mot himlen i närheten.'" },
    { position: { lat: 59.2838, lng: 17.7855 }, title: "Minnen vid Gungorna", story: "'Jag älskade att flyga högt...'", task: "Vilken färg har sätet på gungan som är längst till höger?", answer: "röd", choices: ["Grön", "Blå", "Röd"], nextClue: "Det stämmer... Silas drar sig till minnes en mur av sten som han brukade balansera på, inte långt härifrån." },
    { position: { lat: 59.2845, lng: 17.7858 }, title: "Huset med Stenmuren", story: "'Jag gick förbi det här huset varje dag'...", task: "Vilken är den tredje bokstaven i namnet som är inristat i muren?", answer: "S", choices: ["A", "L", "S"], nextClue: "Ja... Anden dras nu mot sitt gamla kungadöme..." },
    { position: { lat: 59.2848, lng: 17.7852 }, title: "Det Fallna Trädet", story: "'Det här var mitt kungadöme! ...'", task: "Räkna de stora, avbrutna grenarna som fortfarande sitter fast i huvudstammen.", answer: "4", nextClue: "Korrekt. Silas minns ett tyst spel med silverglänsande klot som de vuxna spelade i närheten." },
    { position: { lat: 59.2842, lng: 17.7845 }, title: "De Silverglänsande Kloten", story: "'De vuxna spelade ett konstigt...'", task: "Vad blir poängen om du multiplicerar antalet bänkar med antalet papperskorgar vid planen?", answer: "2", nextClue: "Precis. Silas minne hoppar till en annan lekplats, en plats där det kittlade i magen av en lång resa neråt." },
    { position: { lat: 59.2835, lng: 17.7848 }, title: "Den Långa Resan Ner", story: "'Det kittlade i magen varje gång! ...'", task: "Hur många trappsteg har stegen som leder upp till rutschkanan?", answer: "5", nextClue: "Ja! Nu minns han ett hus med en vimpel som alltid visade vindens riktning." },
    { position: { lat: 59.2839, lng: 17.7862 }, title: "Vimpeln i Vinden", story: "'Här brukade en flagga alltid vaja...'", task: "Addera de två siffrorna i husnumret. (Exempel: Nr 24 blir 2+4=6).", answer: "6", nextClue: "Rätt! Nu blir Silas minne mörkt. Han minns platsen för den tysta matchen... platsen där allt försvann." },
    { position: { lat: 59.2850, lng: 17.7865 }, title: "Den Tysta Matchen", story: "'Här var det alltid fullt av liv...'", task: "Gå till det norra målet. Hur många rostiga skruvar håller fast den vänstra stolpen i marken?", answer: "3", nextClue: "Ja, det var där. Silas viskar: 'Jag var så ledsen. Jag sprang till den sista lekplatsen för att vara ensam...'" },
    { position: { lat: 59.2847, lng: 17.7841 }, title: "Den Sista Pusselbiten", story: "'Efter att jag tappat min trähäst kom jag hit...'", task: "Jag är gjord av trä... Vad är jag?", answer: "bänken", choices: ["Gungan", "Trädet", "Bänken"], nextClue: "Det är rätt! Anden är nära nu..." },
    { position: { lat: 59.2851, lng: 17.7866 }, title: "Skatten!", story: "...", task: "...", answer: "placeholder", nextClue: "" }
];

const monsters = [
    { id: 1, marker: null, isHit: false, currentWaypoint: 0, waypoints: [{ lat: 59.2842, lng: 17.7848 }, { lat: 59.2840, lng: 17.7853 }, { lat: 59.2837, lng: 17.7850 }] },
    { id: 2, marker: null, isHit: false, currentWaypoint: 0, waypoints: [{ lat: 59.2846, lng: 17.7855 }, { lat: 59.2844, lng: 17.7860 }, { lat: 59.2842, lng: 17.7865 }] },
    { id: 3, marker: null, isHit: false, currentWaypoint: 0, waypoints: [{ lat: 59.2849, lng: 17.7850 }, { lat: 59.2851, lng: 17.7853 }] },
];

const MONSTER_PROXIMITY_NEAR = 10;
const MONSTER_PROXIMITY_CLOSE = 5;
const MONSTER_HIT_DISTANCE = 1.5;

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
let isFollowingUser = true;
let wrongAnswerCount = 0;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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
const choicesContainer = document.getElementById('choices-container');
const jumpscareScreen = document.getElementById('jumpscare-screen');

const soundNear = new Audio('audio/monster_near.mp3');
const soundClose = new Audio('audio/monster_close.mp3');
const soundHit = new Audio('audio/monster_hit.mp3');

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
    map.addListener('dragstart', () => { isFollowingUser = false; });
    setupEventListeners();
}

function startLocationWatcher() {
    if (!navigator.geolocation) {
        distanceInfo.textContent = "Geopositionering stöds inte.";
        return;
    }
    navigator.geolocation.watchPosition((position) => {
        userPosition = { lat: position.coords.latitude, lng: position.coords.longitude };
        if (!userMarker) {
            const userMarkerElement = document.createElement('div');
            userMarkerElement.innerHTML = '👤';
            userMarkerElement.className = 'user-marker-icon';
            userMarker = new AdvancedMarkerElement({ position: userPosition, map: map, content: userMarkerElement, title: 'Din position' });
        } else {
            userMarker.position = userPosition;
        }
        if (isFollowingUser) {
            map.panTo(userPosition);
        }
        updateDistance();
    }, () => {
        distanceInfo.textContent = "Kunde inte hämta position.";
    }, { enableHighAccuracy: true });
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
        spawnMonsters();
        startGameLoop();
    });
    submitAnswerBtn.addEventListener('click', checkAnswer);
    taskAnswer.addEventListener('keyup', (event) => {
        if (event.key === "Enter") checkAnswer();
    });
    storyModalBtn.addEventListener('click', () => {
        panToNextLocation();
    });
    infoModalBtn.addEventListener('click', () => {
        infoModal.style.display = 'none';
    });
}

async function panToNextLocation() {
    storyModal.style.display = 'none';
    storyBanner.textContent = locations[currentIndex].nextClue;
    currentIndex++;
    const nextLocation = locations[currentIndex];
    if (!nextLocation || currentIndex >= locations.length - 1) {
        showEndScreen();
        return;
    }
    isFollowingUser = false;
    map.panTo(nextLocation.position);
    await sleep(2500);
    showNextLocation();
    await sleep(2000);
    if (userPosition) {
        map.panTo(userPosition);
        await sleep(2500);
    }
    isFollowingUser = true;
}

function openTaskModal() {
    const location = locations[currentIndex];
    modal.style.display = 'flex';
    taskTitle.textContent = location.title;
    taskStory.textContent = location.story;
    taskQuestion.textContent = location.task;
    taskAnswer.value = '';
    feedbackText.textContent = '';
    taskAnswer.style.display = 'block';
    choicesContainer.style.display = 'none';
    choicesContainer.innerHTML = '';
    wrongAnswerCount = 0;
}

function showNextLocation() {
    if (currentIndex < locations.length - 1) {
        const location = locations[currentIndex];
        currentMarker = new AdvancedMarkerElement({ position: location.position, map: map, title: location.title, content: createMarkerIcon('active') });
        currentMarker.addListener('click', () => {
            if (!userPosition) {
                showInfoModal("Positionering", "Väntar på att hitta din position...");
                return;
            }
            const distance = getDistance(userPosition, location.position);
            if (distance <= UNLOCK_DISTANCE) {
                openTaskModal();
            } else {
                showInfoModal("Du är för långt bort", `Gå närmare! Du är ${Math.round(distance)} meter ifrån.`);
            }
        });
        updateDistance();
    } else {
        showEndScreen();
    }
}

function showMultipleChoice() {
    const location = locations[currentIndex];
    taskAnswer.style.display = 'none';
    choicesContainer.style.display = 'block';
    choicesContainer.innerHTML = '';
    feedbackText.textContent = `För svårt? Här är några alternativ...`;
    feedbackText.style.color = '#ffaa77';
    location.choices.forEach(choice => {
        const id = `choice-${choice.replace(/\s+/g, '')}`;
        const label = document.createElement('label');
        label.className = 'choice-label';
        label.htmlFor = id;
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'choices';
        input.id = id;
        input.value = choice;
        label.appendChild(input);
        label.appendChild(document.createTextNode(choice));
        choicesContainer.appendChild(label);
    });
}

function checkAnswer() {
    const location = locations[currentIndex];
    let userAnswer;
    const choiceIsVisible = choicesContainer.style.display === 'block';
    if (choiceIsVisible) {
        const selectedChoice = document.querySelector('input[name="choices"]:checked');
        if (selectedChoice) {
            userAnswer = selectedChoice.value;
        } else {
            showInfoModal("Inget val gjort", "Du måste välja ett alternativ!");
            return;
        }
    } else {
        userAnswer = taskAnswer.value.trim();
    }
    if (userAnswer.toLowerCase() === location.answer.toLowerCase()) {
        feedbackText.textContent = "Rätt svar!";
        feedbackText.style.color = "#00ff00";
        if (currentMarker) {
            currentMarker.content = createMarkerIcon('completed');
            currentMarker.gmpClickable = false;
        }
        setTimeout(() => {
            modal.style.display = 'none';
            showStoryUpdate();
        }, 1500);
    } else {
        if (!choiceIsVisible) {
            wrongAnswerCount++;
            feedbackText.textContent = `Fel svar. Försök igen. (${wrongAnswerCount}/${ATTEMPTS_BEFORE_CHOICES})`;
            feedbackText.style.color = "#ff0000";
            if (wrongAnswerCount >= ATTEMPTS_BEFORE_CHOICES) {
                showMultipleChoice();
            }
        } else {
            feedbackText.textContent = "Fel svar. Försök igen.";
            feedbackText.style.color = "#ff0000";
        }
    }
}

function showStoryUpdate() {
    const nextClueText = locations[currentIndex].nextClue;
    if (nextClueText) {
        storyModalText.textContent = nextClueText;
        storyModal.style.display = 'flex';
    } else {
        currentIndex++;
        showEndScreen();
    }
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
        distanceInfo.textContent = "Du är framme! Klicka på spöket.";
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

function createMarkerIcon(type) {
    const iconDiv = document.createElement('div');
    iconDiv.className = 'marker-icon';
    if (type === 'completed') {
        iconDiv.textContent = '🪦';
        iconDiv.classList.add('completed');
    } else {
        iconDiv.textContent = '👻';
    }
    return iconDiv;
}

function showEndScreen() {
    mapScreen.classList.remove('active');
    endScreen.classList.add('active');
    storyBanner.style.display = 'none';
    distanceInfo.style.display = 'none';
    document.getElementById('treasure-location').textContent = treasureLocationDescription;
}

function spawnMonsters() {
    monsters.forEach(monster => {
        const monsterIcon = document.createElement('div');
        monsterIcon.className = 'monster-icon';
        monsterIcon.textContent = '👹';
        monster.marker = new AdvancedMarkerElement({
            position: monster.waypoints[0],
            map: map,
            content: monsterIcon,
            title: `Monster ${monster.id}`
        });
    });
}

function startGameLoop() {
    setInterval(() => {
        updateMonsterPositions();
        checkMonsterProximity();
    }, 1000);
}

function updateMonsterPositions() {
    monsters.forEach(monster => {
        if (monster.isHit) return;
        const targetWaypoint = monster.waypoints[monster.currentWaypoint];
        const currentPos = monster.marker.position;
        if (getDistance(currentPos, targetWaypoint) < 1) {
            monster.currentWaypoint = (monster.currentWaypoint + 1) % monster.waypoints.length;
        }
        const nextTarget = monster.waypoints[monster.currentWaypoint];
        monster.marker.position = {
            lat: currentPos.lat + (nextTarget.lat - currentPos.lat) * 0.1,
            lng: currentPos.lng + (nextTarget.lng - currentPos.lng) * 0.1
        };
    });
}

function checkMonsterProximity() {
    if (!userPosition) return;
    monsters.forEach(monster => {
        if (monster.isHit) return;
        const distance = getDistance(userPosition, monster.marker.position);
        if (distance < MONSTER_HIT_DISTANCE) {
            handleMonsterHit(monster);
        } else if (distance < MONSTER_PROXIMITY_CLOSE) {
            soundClose.play();
        } else if (distance < MONSTER_PROXIMITY_NEAR) {
            soundNear.play();
        }
    });
}

function handleMonsterHit(monster) {
    monster.isHit = true;
    soundHit.play();
    jumpscareScreen.classList.add('active');
    if(monster.marker) {
        monster.marker.map = null;
        monster.marker = null;
    }
    setTimeout(() => {
        jumpscareScreen.classList.remove('active');
    }, 2000);
}

window.initMap = initMap;