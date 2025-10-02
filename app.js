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

const storyStartText = "Jag är en viskning i vinden... jag är Silas. Jag är fast här och kommer inte vidare. Mitt minne är trasigt, men ni kan hjälpa mig att pussla ihop det. Mitt första minne finns vid en plats där byns hemligheter delas. Leta efter anslagstavlan.";

const locations = [
    { 
        position: { lat: 59.2839, lng: 17.7846 }, 
        title: "Ett Eko vid Anslagstavlan", 
        story: "Här börjar det... där byns hemligheter viskas. Men mitt minne är som ett trasigt papper, fäst med ett fåtal nålar.", 
        task: "Jag föds i det tysta, i skuggornas vrå, ett ord blir till många och börjar att gå. Jag växer med viskningar, blir större än sant, och kan krossa ett rykte i byn med min hand. Vad är jag –  ett ord som sprids utan källor?", 
        taskImage: "images/task_anslagstavlan.png",
        answer: "Skvaller", 
        choices: ["Förbannelse", "Ande", "Skvaller"], 
        nextClue: "Ja... en bit av minnet är tillbaka! Jag minns glädje. Känslan av att flyga. Följ efter..." 
    },
    { 
        position: { lat: 59.2838, lng: 17.7855 }, 
        title: "Minnen vid Gungorna", 
        story: "Jag flög så högt här... så högt att jag kunde se över alla tak. Men glädjen är bara ett eko nu. En färg är allt som finns kvar av minnet.", 
        task: "I rött och vitt bär han sitt skratt, från mörka brunnar har han ofta skatt. Han lockar med ballonger och ett löfte så lent – men mötet med honom blir sällan skönt. Vem väntar vid gungornas minne i nattens sken?", 
        taskImage: "images/task_gungorna.png",
        answer: "Pennywise", 
        choices: ["Pennywise", "Jokern", "Merry Poppins"], 
        nextClue: "Det stämmer... Men efter leken kom skuggorna. Vägen hem var lång och mörk. De kallade den Dödens allé..." 
    },
    { 
        position: { lat: 59.2845, lng: 17.7858 }, 
        title: "Dödens allé", 
        story: "Träden här har sett allt', viskar Silas. 'Deras grenar är som fingrar. Men några av dem är äldre och mörkare än de andra... de är vridna av sorg.", 
        task: "När månen är rund och natten är kall, hörs ett yl från skogen, mörkt och kallt. Människa om dagen, men i nattens tid – vilket odjur lurar i Dödens allé?", 
        taskImage: "images/task_dödensallé.png",
        answer: "Varulv", 
        choices: ["Troll", "Varulv", "Gast"], 
        nextClue: "Fort tillbaka... mot en plats med ett hemskt förflutet. En plats där ingen fick ro... galgbacken." 
    },
    { 
        position: { lat: 59.2848, lng: 17.7852 }, 
        title: "Galgbacken", 
        story: "De säger att marken här minns. Att de orättvist dömda fortfarande väntar... Jag känner deras sorg. ", 
        task: "En plats där dom föll för sitt brott, där livet tog slut med ett rep så kort. Här slutade vägen för många en stackare – vad kallas platsen? Jo, en …", 
        taskImage: "images/task_galgbacken.png",
        answer: "Galgbacke", 
        choices: ["Avrättningsplats", "Galgbacke", "Lekplats"], 
        nextClue: "Ni känner sorgen ni med... Men det fanns ett hus som såg allt. Ett kråkslott på höjden, som en tyst väktare." 
    },
    { 
        position: { lat: 59.2839, lng: 17.7862 }, 
        title: "Kråkslottet på höjden", 
        story: "Från detta hus såg jag hela världen. En mörk vimpel på taket visade mig vart vinden, och ödet, skulle blåsa.", 
        task: "De sover om dagen men jagar i natt, med huggtänder redo och mörkret som skatt. De törstar efter blod i sin eviga jakt – vad är det för varelse som lever på detta sätt?", 
        taskImage: "images/task_kråkslottet.png",
        answer: "Vampyr", 
        choices: ["Gast", "Varulv", "Vampyr"], 
        nextClue: "Vinden för mig nu till en mörkare plats... en bro över en tyst bäck där man inte skulle gå ensam. Trollbron." 
    },
    { 
        position: { lat: 59.2842, lng: 17.7845 }, 
        title: "Trollbron", 
        story: "Skynda er över. Gå inte för långsamt. Något lyssnar under plankorna. Räkna dem snabbt!", 
        task: "Hur många träplankor utgör själva gångbanan på bron?", 
        taskImage: "images/task_trollbron.png",
        answer: "2", 
        choices: ["2", "3", "1"], 
        nextClue: "Puh... det var nära. Jag minns en lugnare plats. En plats för tystnad och silverklot." 
    },
    { 
        position: { lat: 59.2835, lng: 17.7848 }, 
        title: "De Silverglänsande Kloten", 
        story: "'Här var det tyst. Bara det mjuka klickandet från kloten. En paus i skuggorna.'", 
        task: "Här klotens klick i tystnaden slår, en paus från skuggor som annars består. Men öppna nu ögonen, räkna med hand – hur många vilsamma bänkar syns från grusets land?", 
        taskImage: "images/task_bouleplanen.png",
        answer: "3", 
        choices: ["5", "1", "3"], 
        nextClue: "Men friden varade inte. Jag minns elden. Röken. En plats som brännmärkts av historien... Offerplatsen." 
    },
    { 
        position: { lat: 59.2850, lng: 17.7865 }, 
        title: "Offerplatsen", 
        story: "'De säger att det bara var en majbrasa. Men jag känner den gamla askan. Jag känner rädslan. Rädslan påminner mig om en annan plats... en plats full av liv.'", 
        task: "En stjärna i natten, ett mörkrets tecken, i gamla ritualer har den funnits i seklen. Med uddarna vassa som ondska och far, hur många spetsar djävulens stjärna har?", 
        taskImage: "images/task_offerplatsen.png",
        answer: "5", 
        choices: ["5", "6", "7"], 
        nextClue: "Rädslan... den hjälper mig minnas. Jag minns platsen med alla ropen. Där jag planerade allt." 
    },
    { 
        position: { lat: 59.2847, lng: 17.7841 }, 
        title: "Den Tysta Matchen", 
        story: "Jag sprang här, skrattade... Jag planerade en överraskning för mina vänner här. En skattjakt. Men jag hann aldrig avsluta den. Allt blev tyst. Den sista ledtråden fanns på en plats för vila.", 
        task: "Där matcherna spelas och bollen far, finns platsen där trötta sin vila tar. Vad finns här vid planen där man slår sig ner?", 
        taskImage: "images/task_fotbollsplanen.png",
        answer: "Bänken", 
        choices: ["Bänken", "Gräset", "Stenen"], 
        nextClue: "Ja, den sista viloplatsen... bänken. Det var den sista gåtan... och nu... nu minns jag! Jag minns var jag gömde skatten. Till mitt kungadöme! Trädet som föll. Skynda er!" 
    },
    { 
        position: { lat: 59.2851, lng: 17.7866 }, 
        title: "Silas Sista Gömställe", 
        story: "Den är här, vid foten av stammen. Snälla, hitta den.", 
        task: "", answer: "", nextClue: "" 
    }
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
    { typeId: 0, spawnOnClue: 0, waypoints: [{ lat: 59.2842, lng: 17.7848 }, { lat: 59.2840, lng: 17.7853 }, { lat: 59.2837, lng: 17.7850 }] },
    { typeId: 1, spawnOnClue: 2, waypoints: [{ lat: 59.2846, lng: 17.7855 }, { lat: 59.2844, lng: 17.7860 }, { lat: 59.2842, lng: 17.7865 }] },
    { typeId: 2, spawnOnClue: 4, waypoints: [{ lat: 59.2849, lng: 17.7850 }, { lat: 59.2851, lng: 17.7853 }] },
    { typeId: 3, spawnOnClue: 6, waypoints: [{ lat: 59.2835, lng: 17.7845 }, { lat: 59.2837, lng: 17.7842 }] },
    { typeId: 4, spawnOnClue: 7, waypoints: [{ lat: 59.2833, lng: 17.7858 }, { lat: 59.2836, lng: 17.7861 }] },
    { typeId: 5, spawnOnClue: 8, waypoints: [{ lat: 59.2848, lng: 17.7842 }, { lat: 59.2851, lng: 17.7845 }] },
    { typeId: 6, spawnOnClue: 1, waypoints: [{ lat: 59.2832, lng: 17.7852 }, { lat: 59.2835, lng: 17.7855 }] },
    { typeId: 7, spawnOnClue: 5, waypoints: [{ lat: 59.2845, lng: 17.7840 }, { lat: 59.2842, lng: 17.7838 }] },
];
const MONSTER_PROXIMITY_NEAR = 10;
const MONSTER_PROXIMITY_CLOSE = 5;
const MONSTER_HIT_DISTANCE = 1.5;
const MONSTER_CHASE_BREAK_DISTANCE = 4;

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
let isProcessingAnswer = false;
let onStoryModalConfirm = null;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const startScreen = document.getElementById('start-screen');
const introScreen = document.getElementById('intro-screen');
const introText = document.getElementById('intro-text');
const mapScreen = document.getElementById('map-screen');
const endScreen = document.getElementById('end-screen');
const startBtn = document.getElementById('start-btn');
const modal = document.getElementById('task-modal');
const taskTitle = document.getElementById('task-title');
const taskImageElement = document.getElementById('task-image');
const taskStory = document.getElementById('task-story');
const taskQuestion = document.getElementById('task-question');
const taskAnswer = document.getElementById('task-answer');
const submitAnswerBtn = document.getElementById('submit-answer-btn');
const feedbackText = document.getElementById('feedback-text');
const distanceInfo = document.getElementById('distance-info');
const storyBanner = document.getElementById('story-banner');
const storyModal = document.getElementById('story-modal');
const storyModalTitle = document.getElementById('story-modal-title');
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
const choicesPrompt = document.getElementById('choices-prompt');

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
        checkAndSpawnMonsters(0);
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
    submitAnswerBtn.addEventListener('click', () => {
        if (submitAnswerBtn.textContent === "Fortsätt...") {
            modal.style.display = 'none';
            showStoryUpdate();
        } else {
            checkAnswer();
        }
    });
    taskAnswer.addEventListener('keyup', (event) => {
        if (event.key === "Enter") {
            submitAnswerBtn.click();
        }
    });
    storyModalBtn.addEventListener('click', () => {
        storyModal.style.display = 'none';
        if (onStoryModalConfirm) {
            onStoryModalConfirm();
        }
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

function showSilasModal(text, buttonText, callback) {
    storyModalTitle.textContent = "";
    storyModalText.textContent = text;
    storyModalBtn.textContent = buttonText;
    onStoryModalConfirm = callback;
    storyModal.style.display = 'flex';
}

async function panToNextLocation() {
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
    taskImageElement.src = location.taskImage;
    taskQuestion.textContent = location.task;
    taskAnswer.value = '';
    feedbackText.textContent = '';
    feedbackText.className = '';
    taskAnswer.style.display = 'block';
    taskAnswer.disabled = false;
    choicesPrompt.textContent = '';
    choicesContainer.style.display = 'none';
    choicesContainer.innerHTML = '';
    wrongAnswerCount = 0;
    isProcessingAnswer = false;
    submitAnswerBtn.disabled = false;
    submitAnswerBtn.textContent = "Skicka svar";
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
                showSilasModal(location.story, "Visa gåtan", () => {
                    openTaskModal();
                });
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
    choicesPrompt.textContent = 'För svårt? Här är några alternativ...';
    choicesContainer.style.display = 'block';
    choicesContainer.innerHTML = '';
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
    if (isProcessingAnswer) return;
    isProcessingAnswer = true;
    submitAnswerBtn.disabled = true;
    const location = locations[currentIndex];
    let userAnswer;
    const choiceIsVisible = choicesContainer.style.display === 'block';
    if (choiceIsVisible) {
        const selectedChoice = document.querySelector('input[name="choices"]:checked');
        if (selectedChoice) { userAnswer = selectedChoice.value; } else {
            showInfoModal("Inget val gjort", "Du måste välja ett alternativ!");
            isProcessingAnswer = false;
            submitAnswerBtn.disabled = false;
            return;
        }
    } else {
        userAnswer = taskAnswer.value.trim();
    }
    if (userAnswer.toLowerCase() === location.answer.toLowerCase()) {
        sounds.correct.play();
        feedbackText.textContent = "Rätt svar!";
        feedbackText.className = 'feedback-success';
        taskAnswer.disabled = true;
        document.querySelectorAll('input[name="choices"]').forEach(radio => radio.disabled = true);
        submitAnswerBtn.textContent = "Fortsätt...";
        isProcessingAnswer = false;
        submitAnswerBtn.disabled = false;
        if (currentMarker) {
            currentMarker.content = createMarkerIcon('completed');
            currentMarker.gmpClickable = false;
            completedMarkers.push(currentMarker);
            currentMarker = null;
        }
    } else {
        sounds.wrong.play();
        if (!choiceIsVisible) {
            wrongAnswerCount++;
            feedbackText.textContent = `Fel svar. Försök igen. (${wrongAnswerCount}/${ATTEMPTS_BEFORE_CHOICES})`;
            feedbackText.className = 'feedback-error';
            if (wrongAnswerCount >= ATTEMPTS_BEFORE_CHOICES) {
                showMultipleChoice();
            }
        } else {
            feedbackText.textContent = "Fel svar. Försök igen.";
            feedbackText.className = 'feedback-error';
        }
        setTimeout(() => {
            isProcessingAnswer = false;
            submitAnswerBtn.disabled = false;
        }, 1000);
    }
}

function showStoryUpdate() {
    const nextClueText = locations[currentIndex].nextClue;
    if (nextClueText) {
        showSilasModal(nextClueText, "Fortsätt...", () => {
            const justCompletedIndex = currentIndex;
            panToNextLocation();
            checkAndSpawnMonsters(justCompletedIndex + 1);
        });
    } else {
        showEndScreen();
    }
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

function checkAndSpawnMonsters(clueIndex) {
    const monstersToSpawn = monsters.filter(m => m.spawnOnClue === clueIndex);
    monstersToSpawn.forEach(monsterData => {
        if (activeMonsterInstances.length >= ACTIVE_MONSTERS_COUNT) return;
        const typeInfo = monsterTypes.find(t => t.id === monsterData.typeId);
        if (!typeInfo) return;
        const monsterIcon = document.createElement('div');
        monsterIcon.className = 'monster-icon monster-idle';
        monsterIcon.textContent = typeInfo.icon;
        const marker = new AdvancedMarkerElement({ position: monsterData.waypoints[0], map: DEVELOPER_MODE ? map : null, content: monsterIcon, title: `Monster` });
        activeMonsterInstances.push({ marker: marker, typeInfo: typeInfo, waypoints: monsterData.waypoints, isHit: false, currentWaypoint: 0, isVisible: DEVELOPER_MODE, isChasing: false, proximityState: 'idle', lastNearSoundTime: 0, hasPlayedCloseSound: false });
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
        const moveFactor = monster.isChasing ? 0.4 : 0.1;
        let targetPosition;
        if (monster.isChasing && userPosition) {
            targetPosition = userPosition;
        } else {
            targetPosition = monster.waypoints[monster.currentWaypoint];
            if (getDistance(monster.marker.position, targetPosition) < 1) {
                monster.currentWaypoint = (monster.currentWaypoint + 1) % monster.waypoints.length;
                targetPosition = monster.waypoints[monster.currentWaypoint];
            }
        }
        const currentPos = monster.marker.position;
        monster.marker.position = {
            lat: currentPos.lat + (targetPosition.lat - currentPos.lat) * moveFactor,
            lng: currentPos.lng + (targetPosition.lng - currentPos.lng) * moveFactor
        };
    });
}

function checkMonsterProximity() {
    if (!userPosition) return;
    activeMonsterInstances.forEach(monster => {
        if (monster.isHit || !monster.marker) return;
        const distance = getDistance(userPosition, monster.marker.position);
        let newState = 'idle';
        if (distance < MONSTER_HIT_DISTANCE) newState = 'hit';
        else if (distance < MONSTER_PROXIMITY_CLOSE) newState = 'close';
        else if (distance < MONSTER_PROXIMITY_NEAR) newState = 'near';
        if (!DEVELOPER_MODE) {
            if (distance <= MONSTER_VISIBILITY_DISTANCE) {
                if (!monster.isVisible) { monster.marker.map = map; monster.isVisible = true; }
            } else {
                if (monster.isVisible) { monster.marker.map = null; monster.isVisible = false; }
            }
        }
        monster.isChasing = (newState === 'near' || newState === 'close');
        if (distance > MONSTER_PROXIMITY_NEAR + MONSTER_CHASE_BREAK_DISTANCE) {
            monster.isChasing = false;
        }
        if (newState !== 'close' && newState !== 'hit') {
            monster.hasPlayedCloseSound = false;
        }
        if (monster.isVisible) {
            if (newState === 'hit') {
                handleMonsterHit(monster);
            } else if (newState === 'close') {
                if (!monster.hasPlayedCloseSound) {
                    sounds[monster.typeInfo.sounds.close].play();
                    monster.hasPlayedCloseSound = true;
                }
            } else if (newState === 'near') {
                const now = Date.now();
                if (now - monster.lastNearSoundTime > 60000) {
                    sounds[monster.typeInfo.sounds.near].play();
                    monster.lastNearSoundTime = now;
                }
            }
        } else {
            monster.isChasing = false;
        }
        if (DEVELOPER_MODE && monster.marker && newState !== monster.proximityState) {
            monster.proximityState = newState;
            const iconElement = monster.marker.content;
            iconElement.classList.remove('monster-idle', 'monster-chasing-near', 'monster-chasing-close');
            if (monster.isChasing) {
                if (newState === 'close') {
                    iconElement.classList.add('monster-chasing-close');
                } else {
                    iconElement.classList.add('monster-chasing-near');
                }
            } else {
                iconElement.classList.add('monster-idle');
            }
        }
    });
}

function handleMonsterHit(monster) {
    if (monster.isHit) return;
    monster.isHit = true;
    if (navigator.vibrate) {
        navigator.vibrate(500);
    }
    jumpscareImage.src = monster.typeInfo.jumpscareImg;
    jumpscareScreen.classList.add('active');
    setTimeout(() => {
        sounds[monster.typeInfo.sounds.hit].play();
    }, 200);
    if (monster.marker) {
        monster.marker.map = null;
        monster.marker = null;
    }
    setTimeout(() => {
        jumpscareScreen.classList.remove('active');
    }, 2000);
}

window.initMap = initMap;