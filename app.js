// ======================================================
//
//  CONFIG - HÄR ÄNDRAR DU SPELETS INNEHÅLL
//
// ======================================================

const mapStartCenter = { lat: 59.284, lng: 17.785 };
const UNLOCK_DISTANCE = 5;
const treasureLocationDescription = "Tack... Tack för att ni hittade den. Allt godis. Jag hade sparat det till en speciell dag med mina vänner, en dag som aldrig kom. Jag vill inte att det ska förfaras. Dela det, och tänk på mig. Nu... nu kan jag äntligen vila.";
const ATTEMPTS_BEFORE_CHOICES = 3; 

const DEVELOPER_MODE = true;

const storyStartText = "Känner ni mig? Jag är en viskning i vinden... Silas. Jag är fast här. Mitt minne är trasigt, men ni kan hjälpa mig att pussla ihop det. Mitt första minne finns vid en plats där byns hemligheter delas. Leta efter anslagstavlan.";

const locations = [
    { position: { lat: 59.2839, lng: 17.7846 }, title: "Ett Eko vid Anslagstavlan", story: "Silas röst är tydligast här. 'Här börjar det... där byns hemligheter viskas. Men mitt minne är som ett trasigt papper, fäst med ett fåtal nålar.'", task: "Hur många häftstift sitter i den övre, vänstra fjärdedelen av tavlan?", answer: "7", choices: ["5", "7", "9"], nextClue: "Ja... en bit av minnet är tillbaka! Jag minns glädje. Känslan av att flyga. Följ efter..." },
    { position: { lat: 59.2838, lng: 17.7855 }, title: "Minnen vid Gungorna", story: "'Jag flög så högt här... så högt att jag kunde se över alla tak. Men glädjen är bara ett eko nu. En färg är allt som finns kvar av minnet.'", task: "Vilken färg har sätet på gungan som är längst till höger?", answer: "röd", choices: ["Grön", "Blå", "Röd"], nextClue: "Det stämmer... Men efter leken kom skuggorna. Vägen hem var lång och mörk. De kallade den Dödens allé..." },
    { position: { lat: 59.2845, lng: 17.7858 }, title: "Dödens allé", story: "'Träden här har sett allt', viskar Silas. 'Deras grenar är som fingrar. Men några av dem är äldre och mörkare än de andra... de är vridna av sorg.'", task: "Hur många av de stora träden längs alléns västra sida har förvridna, dubbla stammar?", answer: "2", choices: ["1", "2", "3"], nextClue: "Ni ser dem... Vägen leder till en plats med ett hemskt förflutet. En plats där ingen fick ro. Galgbacken." },
    { position: { lat: 59.2848, lng: 17.7852 }, title: "Galgbacken", story: "'De säger att marken här minns. Att de orättvist dömda fortfarande väntar... Jag känner deras sorg. Det finns ett ord inristat här, ett ord av varning.'", task: "Vilket är det enskilda ordet som är inristat på den lilla minnesplaketten?", answer: "Glöm", choices: ["Minns", "Glöm", "Vila"], nextClue: "Ni känner sorgen ni med... Men det fanns ett hus som såg allt. Ett kråkslott på höjden, som en tyst väktare." },
    { position: { lat: 59.2839, lng: 17.7862 }, title: "Kråkslottet på höjden", story: "'Från detta hus såg jag hela världen', säger Silas. 'En mörk vimpel på taket visade mig vart vinden, och ödet, skulle blåsa.'", task: "Addera de två siffrorna i husnumret. (Exempel: Nr 24 blir 2+4=6).", answer: "6", choices: ["5", "6", "8"], nextClue: "Vinden för mig nu till en mörkare plats... en bro över en tyst bäck där man inte skulle gå ensam. Trollbron." },
    { position: { lat: 59.2842, lng: 17.7845 }, title: "Trollbron", story: "'Skynda er över', väser Silas. 'Gå inte för långsamt. Något lyssnar under plankorna. Räkna dem snabbt!'", task: "Hur många träplankor utgör själva gångbanan på bron?", answer: "12", choices: ["10", "12", "15"], nextClue: "Puh... det var nära. Jag minns en lugnare plats. En plats för tystnad och silverklot." },
    { position: { lat: 59.2835, lng: 17.7848 }, title: "De Silverglänsande Kloten", story: "'Här var det tyst. Bara det mjuka klickandet från kloten. En paus från skuggorna.'", task: "Vad blir poängen om du multiplicerar antalet bänkar med antalet papperskorgar vid planen?", answer: "2", choices: ["1", "2", "4"], nextClue: "Men friden varade inte. Jag minns elden. Röken. En plats som brännmärkts av historien... Offerplatsen." },
    { position: { lat: 59.2850, lng: 17.7865 }, title: "Offerplatsen", story: "'De säger att det bara var en majbrasa. Men jag känner den gamla askan. Jag känner rädslan. Rädslan påminner mig om en annan plats... en plats full av liv.'", task: "Hur många stora steg tar det att gå tvärs över den brända cirkeln?", answer: "8", choices: ["5", "8", "11"], nextClue: "Rädslan... den hjälper mig minnas. Jag minns platsen med alla ropen. Där jag planerade allt." },
    { position: { lat: 59.2847, lng: 17.7841 }, title: "Den Tysta Matchen", story: "'Jag sprang här, skrattade... Jag planerade en överraskning för mina vänner här. En skattjakt. Men jag hann aldrig avsluta den. Allt blev tyst. Den sista ledtråden fanns på en plats för vila.'", task: "Gå till det norra målet. Hur många rostiga skruvar håller fast den vänstra stolpen i marken?", answer: "3", choices: ["2", "3", "4"], nextClue: "Ja, den sista viloplatsen... bänken. Det var den sista gåtan... och nu... nu minns jag! Jag minns var jag gömde skatten. Till mitt kungadöme! Trädet som föll. Skynda er!" },
    { position: { lat: 59.2851, lng: 17.7866 }, title: "Silas Sista Gömställe", story: "Silas viskar: 'Den är här, vid foten av stammen. Snälla, hitta den.'", task: "", answer: "", nextClue: "" }
];
const ACTIVE_MONSTERS_COUNT = 3;
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
    { typeId: 0, waypoints: [{ lat: 59.2842, lng: 17.7848 }, { lat: 59.2839, lng: 17.7846 }, { lat: 59.2837, lng: 17.7850 }] },
    { typeId: 1, waypoints: [{ lat: 59.2846, lng: 17.7855 }, { lat: 59.2844, lng: 17.7860 }, { lat: 59.2842, lng: 17.7865 }] },
    { typeId: 2, waypoints: [{ lat: 59.2849, lng: 17.7850 }, { lat: 59.2851, lng: 17.7853 }] },
    { typeId: 3, waypoints: [{ lat: 59.2835, lng: 17.7845 }, { lat: 59.2837, lng: 17.7842 }] },
    { typeId: 4, waypoints: [{ lat: 59.2833, lng: 17.7858 }, { lat: 59.2836, lng: 17.7861 }] },
    { typeId: 5, waypoints: [{ lat: 59.2848, lng: 17.7842 }, { lat: 59.2851, lng: 17.7845 }] },
    { typeId: 6, waypoints: [{ lat: 59.2832, lng: 17.7852 }, { lat: 59.2835, lng: 17.7855 }] },
    { typeId: 7, waypoints: [{ lat: 59.2845, lng: 17.7840 }, { lat: 59.2842, lng: 17.7838 }] },
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
let activeMonsterInstances = [];
let completedMarkers = [];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const startScreen = document.getElementById('start-screen');
const introScreen = document.getElementById('intro-screen');
const introText = document.getElementById('intro-text');
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
const treasureModal = document.getElementById('treasure-modal');
const treasureModalBtn = document.getElementById('treasure-modal-btn');

const sounds = {
    correct: new Audio('audio/correct_answer.mp3'),
    wrong: new Audio('audio/wrong_answer.mp3')
};
monsterTypes.forEach(type => {
    sounds[type.sounds.near] = new Audio(`audio/${type.sounds.near}.mp3`);
    sounds[type.sounds.close] = new Audio(`audio/${type.sounds.close}.mp3`);
    sounds[type.sounds.hit] = new Audio(`audio/${type.sounds.hit}.mp3`);
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('ServiceWorker registrerad: ', registration);
        }).catch(registrationError => {
            console.log('ServiceWorker-registrering misslyckades: ', registrationError);
        });
    });
}

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

function startGame() {
    introScreen.style.opacity = '0';
    setTimeout(() => {
        introScreen.classList.remove('active');
        mapScreen.classList.add('active');
        storyBanner.textContent = "Hitta anslagstavlan som markerats av ett spöke.";
        google.maps.event.trigger(map, 'resize');
        map.setCenter(mapStartCenter);
        showNextLocation();
        startLocationWatcher();
        spawnMonsters();
        startGameLoop();
    }, 1000);
}

function setupEventListeners() {
    startBtn.addEventListener('click', () => {
        startScreen.classList.remove('active');
        introText.textContent = storyStartText;
        introScreen.classList.add('active');
        setTimeout(startGame, 6000);
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
    treasureModalBtn.addEventListener('click', () => {
        treasureModal.style.display = 'none';
        showEndScreen();
    });
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

function showTreasureConfirmation() {
    treasureModal.style.display = 'flex';
}

async function panToNextLocation() {
    storyModal.style.display = 'none';
    storyBanner.textContent = locations[currentIndex].nextClue;
    currentIndex++;
    const nextLocation = locations[currentIndex];
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
    if (currentIndex >= locations.length) return;
    const location = locations[currentIndex];
    const isTreasure = currentIndex === locations.length - 1;
    let markerContent = createMarkerIcon(isTreasure ? 'treasure' : 'active');
    currentMarker = new AdvancedMarkerElement({ position: location.position, map: map, title: location.title, content: markerContent });
    currentMarker.addListener('click', () => {
        if (!userPosition && !DEVELOPER_MODE) {
            showInfoModal("Positionering", "Väntar på att hitta din position...");
            return;
        }
        const distance = DEVELOPER_MODE ? 0 : getDistance(userPosition, location.position);
        if (distance <= UNLOCK_DISTANCE) {
            if (isTreasure) {
                showTreasureConfirmation();
            } else {
                openTaskModal();
            }
        } else {
            const targetName = isTreasure ? "skatten" : "ledtråden";
            showInfoModal("Du är för långt bort", `Gå närmare ${targetName}! Du är ${Math.round(distance)} meter ifrån.`);
        }
    });
    if (isTreasure) {
        storyBanner.textContent = location.story;
    }
    updateDistance();
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
            completedMarkers.push(currentMarker);
            currentMarker = null;
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

function showStoryUpdate() {
    const nextClueText = locations[currentIndex].nextClue;
    storyModalText.textContent = nextClueText;
    storyModal.style.display = 'flex';
}

function updateDistance() {
    if (!userPosition) return;
    const target = locations[currentIndex];
    if (!target) return;
    distanceInfo.style.display = 'block';
    const distance = getDistance(userPosition, target.position);
    const targetName = (currentIndex === locations.length - 1) ? "skatten" : "spöket";
    if (distance <= UNLOCK_DISTANCE || DEVELOPER_MODE) {
        distanceInfo.textContent = `Ni är framme! Klicka på ${targetName}.`;
    } else {
        distanceInfo.textContent = `Ni är ${Math.round(distance)} meter från ${targetName}.`;
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
    if (type === 'completed') {
        iconDiv.className = 'marker-icon completed';
        iconDiv.textContent = '🪦';
    } else if (type === 'treasure') {
        iconDiv.className = 'treasure-icon';
        iconDiv.textContent = '💎';
    } else {
        iconDiv.className = 'marker-icon';
        iconDiv.textContent = '👻';
    }
    return iconDiv;
}

function showEndScreen() {
    activeMonsterInstances.forEach(monster => { if (monster.marker) monster.marker.map = null; });
    activeMonsterInstances = [];
    mapScreen.classList.remove('active');
    endScreen.classList.add('active');
    storyBanner.style.display = 'none';
    distanceInfo.style.display = 'none';
    document.getElementById('treasure-location').textContent = treasureLocationDescription;
}

function spawnMonsters() {
    const monstersToSpawn = monsters.slice(0, ACTIVE_MONSTERS_COUNT);
    monstersToSpawn.forEach(monsterData => {
        const typeInfo = monsterTypes.find(t => t.id === monsterData.typeId);
        if (!typeInfo) return;
        const monsterIcon = document.createElement('div');
        monsterIcon.className = 'monster-icon';
        monsterIcon.textContent = typeInfo.icon;
        const marker = new AdvancedMarkerElement({ position: monsterData.waypoints[0], map: null, content: monsterIcon, title: `Monster` });
        activeMonsterInstances.push({ marker: marker, typeInfo: typeInfo, waypoints: monsterData.waypoints, isHit: false, currentWaypoint: 0, isVisible: false });
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
        monster.marker.position = { lat: currentPos.lat + (nextTarget.lat - currentPos.lat) * 0.1, lng: currentPos.lng + (nextTarget.lng - currentPos.lng) * 0.1 };
    });
}

function checkMonsterProximity() {
    if (!userPosition) return;
    activeMonsterInstances.forEach(monster => {
        if (monster.isHit || !monster.marker) return;
        const distance = getDistance(userPosition, monster.marker.position);
        if (distance <= MONSTER_VISIBILITY_DISTANCE) {
            if (!monster.isVisible) { monster.marker.map = map; monster.isVisible = true; }
        } else {
            if (monster.isVisible) { monster.marker.map = null; monster.isVisible = false; }
        }
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
    if(monster.marker) {
        monster.marker.map = null;
        monster.marker = null;
    }
    setTimeout(() => {
        jumpscareScreen.classList.remove('active');
    }, 2000);
}

window.initMap = initMap;