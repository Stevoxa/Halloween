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

// ------------------------------------------------------
// MONSTER-INSTÄLLNINGAR
// ------------------------------------------------------

const ACTIVE_MONSTERS_COUNT = 4;

// NYTT: Hur nära måste man vara för att ett monster ska synas? (i meter)
const MONSTER_VISIBILITY_DISTANCE = 40;

const monsterTypes = [
    { id: 0, name: "zombie", icon: '🧟', jumpscareImg: 'images/zombie_jumpscare.png', sounds: { near: 'zombie_near', close: 'zombie_close', hit: 'zombie_hit' } },
    { id: 1, name: "vampire", icon: '🧛', jumpscareImg: 'images/vampire_jumpscare.png', sounds: { near: 'vampire_near', close: 'vampire_close', hit: 'vampire_hit' } },
    { id: 2, name: "clown", icon: '🤡', jumpscareImg: 'images/clown_jumpscare.png', sounds: { near: 'clown_near', close: 'clown_close', hit: 'clown_hit' } },
    { id: 3, name: "demon", icon: '👹', jumpscareImg: 'images/demon_jumpscare.png', sounds: { near: 'demon_near', close: 'demon_close', hit: 'demon_hit' } },
    { id: 4, name: "insekt", icon: '🦟', jumpscareImg: 'images/insekt_jumpscare.png', sounds: { near: 'insekt_near', close: 'insekt_close', hit: 'insekt_hit' } },
    { id: 5, name: "spindel", icon: '🕷️', jumpscareImg: 'images/spindel_jumpscare.png', sounds: { near: 'spindel_near', close: 'spindel_close', hit: 'spindel_hit' } },
    { id: 6, name: "wolf", icon: '🐺', jumpscareImg: 'images/wolf_jumpscare.png', sounds: { near: 'wolf_near', close: 'wolf_close', hit: 'wolf_hit' } },
    { id: 7, name: "hamster", icon: '🐹', jumpscareImg: 'images/hamster_jumpscare.png', sounds: { near: 'hamster_near', close: 'hamster_close', hit: 'hamster_hit' } }
];

const monsters = [
    { typeId: 0, waypoints: [{ lat: 59.2842, lng: 17.7848 }, { lat: 59.2840, lng: 17.7853 }, { lat: 59.2837, lng: 17.7850 }] }, // Zombie
    { typeId: 1, waypoints: [{ lat: 59.2846, lng: 17.7855 }, { lat: 59.2844, lng: 17.7860 }, { lat: 59.2842, lng: 17.7865 }] }, // Vampire
    { typeId: 2, waypoints: [{ lat: 59.2849, lng: 17.7850 }, { lat: 59.2851, lng: 17.7853 }] }, // Clown
    { typeId: 3, waypoints: [{ lat: 59.2835, lng: 17.7845 }, { lat: 59.2837, lng: 17.7842 }] }, // Demon
    { typeId: 4, waypoints: [{ lat: 59.2833, lng: 17.7858 }, { lat: 59.2836, lng: 17.7861 }] }, // Insekt
    { typeId: 5, waypoints: [{ lat: 59.2848, lng: 17.7842 }, { lat: 59.2851, lng: 17.7845 }] }, // Spindel
    { typeId: 6, waypoints: [{ lat: 59.2832, lng: 17.7852 }, { lat: 59.2835, lng: 17.7855 }] }, // Varulv
    { typeId: 7, waypoints: [{ lat: 59.2845, lng: 17.7840 }, { lat: 59.2842, lng: 17.7838 }] }, // Hamster
];

const MONSTER_PROXIMITY_NEAR = 10;
const MONSTER_PROXIMITY_CLOSE = 5;
const MONSTER_HIT_DISTANCE = 1.5;

// ------------------------------------------------------
// LEDTRÅDAR OCH STORY
// ------------------------------------------------------
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
let activeMonsterInstances = [];

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
const jumpscareImage = document.getElementById('jumpscare-image');

const sounds = {
    correct: new Audio('audio/correct_answer.mp3'),
    wrong: new Audio('audio/wrong_answer.mp3')
};
monsterTypes.forEach(type => {
    sounds[type.sounds.near] = new Audio(`audio/${type.sounds.near}.mp3`);
    sounds[type.sounds.close] = new Audio(`audio/${type.sounds.close}.mp3`);
    sounds[type.sounds.hit] = new Audio(`audio/${type.sounds.hit}.mp3`);
});

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

function spawnMonsters() {
    const monstersToSpawn = monsters.slice(0, ACTIVE_MONSTERS_COUNT);
    monstersToSpawn.forEach(monsterData => {
        const typeInfo = monsterTypes.find(t => t.id === monsterData.typeId);
        if (!typeInfo) return;
        const monsterIcon = document.createElement('div');
        monsterIcon.className = 'monster-icon';
        monsterIcon.textContent = typeInfo.icon;
        
        // Skapa markören men gör den osynlig från start
        const marker = new AdvancedMarkerElement({
            position: monsterData.waypoints[0],
            map: null, // Startar som osynlig
            content: monsterIcon,
            title: `Monster`
        });

        activeMonsterInstances.push({
            marker: marker,
            typeInfo: typeInfo,
            waypoints: monsterData.waypoints,
            isHit: false,
            currentWaypoint: 0,
            isVisible: false // Håller koll på om monstret är synligt
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
    activeMonsterInstances.forEach(monster => {
        if (monster.isHit || !monster.marker) return;
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
    activeMonsterInstances.forEach(monster => {
        if (monster.isHit || !monster.marker) return;

        const distance = getDistance(userPosition, monster.marker.position);

        // NY LOGIK: Hantera synlighet
        if (distance <= MONSTER_VISIBILITY_DISTANCE) {
            if (!monster.isVisible) {
                monster.marker.map = map;
                monster.isVisible = true;
            }
        } else {
            if (monster.isVisible) {
                monster.marker.map = null;
                monster.isVisible = false;
            }
        }

        // Kör bara ljud- och träfflogik om monstret är synligt
        if (monster.isVisible) {
            if (distance < MONSTER_HIT_DISTANCE) {
                handleMonsterHit(monster);
            } else if (distance < MONSTER_PROXIMITY_CLOSE) {
                sounds[monster.typeInfo.sounds.close].play();
            } else if (distance < MONSTER_PROXIMITY_NEAR) {
                sounds[monster.typeInfo.sounds.near].play();
            }
        }
    });
}

function handleMonsterHit(monster) {
    monster.isHit = true;
    sounds[monster.typeInfo.sounds.hit].play();
    jumpscareImage.src = monster.typeInfo.jumpscareImg;
    jumpscareScreen.classList.add('active');
    if (monster.marker) {
        monster.marker.map = null;
        monster.marker = null;
    }
    setTimeout(() => {
        jumpscareScreen.classList.remove('active');
    }, 2000);
}

function checkAnswer() {
    const location = locations[currentIndex];
    let userAnswer;
    const choiceIsVisible = choicesContainer.style.display === 'block';
    if (choiceIsVisible) {
        const selectedChoice = document.querySelector('input[name="choices"]:checked');
        if (selectedChoice) { userAnswer = selectedChoice.value; } else { showInfoModal("Inget val gjort", "Du måste välja ett alternativ!"); return; }
    } else {
        userAnswer = taskAnswer.value.trim();
    }
    if (userAnswer.toLowerCase() === location.answer.toLowerCase()) {
        sounds.correct.play();
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
        sounds.wrong.play();
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

// ... (resten av filen är oförändrad och kan klistras in här)
async function panToNextLocation() { storyModal.style.display = 'none'; storyBanner.textContent = locations[currentIndex].nextClue; currentIndex++; const nextLocation = locations[currentIndex]; if (!nextLocation || currentIndex >= locations.length - 1) { showEndScreen(); return; } isFollowingUser = false; map.panTo(nextLocation.position); await sleep(2500); showNextLocation(); await sleep(2000); if (userPosition) { map.panTo(userPosition); await sleep(2500); } isFollowingUser = true; }
function openTaskModal() { const location = locations[currentIndex]; modal.style.display = 'flex'; taskTitle.textContent = location.title; taskStory.textContent = location.story; taskQuestion.textContent = location.task; taskAnswer.value = ''; feedbackText.textContent = ''; taskAnswer.style.display = 'block'; choicesContainer.style.display = 'none'; choicesContainer.innerHTML = ''; wrongAnswerCount = 0; }
function showNextLocation() { if (currentIndex < locations.length - 1) { const location = locations[currentIndex]; currentMarker = new AdvancedMarkerElement({ position: location.position, map: map, title: location.title, content: createMarkerIcon('active') }); currentMarker.addListener('click', () => { if (!userPosition) { showInfoModal("Positionering", "Väntar på att hitta din position..."); return; } const distance = getDistance(userPosition, location.position); if (distance <= UNLOCK_DISTANCE) { openTaskModal(); } else { showInfoModal("Du är för långt bort", `Gå närmare! Du är ${Math.round(distance)} meter ifrån.`); } }); updateDistance(); } else { showEndScreen(); } }
function showMultipleChoice() { const location = locations[currentIndex]; taskAnswer.style.display = 'none'; choicesContainer.style.display = 'block'; choicesContainer.innerHTML = ''; feedbackText.textContent = `För svårt? Här är några alternativ...`; feedbackText.style.color = '#ffaa77'; location.choices.forEach(choice => { const id = `choice-${choice.replace(/\s+/g, '')}`; const label = document.createElement('label'); label.className = 'choice-label'; label.htmlFor = id; const input = document.createElement('input'); input.type = 'radio'; input.name = 'choices'; input.id = id; input.value = choice; label.appendChild(input); label.appendChild(document.createTextNode(choice)); choicesContainer.appendChild(label); }); }
function showStoryUpdate() { const nextClueText = locations[currentIndex].nextClue; if (nextClueText) { storyModalText.textContent = nextClueText; storyModal.style.display = 'flex'; } else { currentIndex++; showEndScreen(); } }
function updateDistance() { if (!userPosition || currentIndex >= locations.length - 1) { distanceInfo.style.display = 'none'; return; } distanceInfo.style.display = 'block'; const targetPosition = locations[currentIndex].position; const distance = getDistance(userPosition, targetPosition); if (distance <= UNLOCK_DISTANCE) { distanceInfo.textContent = "Du är framme! Klicka på spöket."; } else { distanceInfo.textContent = `Du är ${Math.round(distance)} meter bort.`; } }
function getDistance(pos1, pos2) { const R = 6371e3; const φ1 = pos1.lat * Math.PI / 180; const φ2 = pos2.lat * Math.PI / 180; const Δφ = (pos2.lat - pos1.lat) * Math.PI / 180; const Δλ = (pos2.lng - pos1.lng) * Math.PI / 180; const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2); const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); return R * c; }
function createMarkerIcon(type) { const iconDiv = document.createElement('div'); iconDiv.className = 'marker-icon'; if (type === 'completed') { iconDiv.textContent = '🪦'; iconDiv.classList.add('completed'); } else { iconDiv.textContent = '👻'; } return iconDiv; }
function showEndScreen() { mapScreen.classList.remove('active'); endScreen.classList.add('active'); storyBanner.style.display = 'none'; distanceInfo.style.display = 'none'; document.getElementById('treasure-location').textContent = treasureLocationDescription; }
window.initMap = initMap;