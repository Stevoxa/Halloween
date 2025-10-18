// ======================================================
//
//  CONFIG - HÄR ÄNDRAR DU SPELETS INNEHÅLL
//
// ======================================================

const DEVELOPER_MODE = true;

const mapStartCenter = { lat: 59.284, lng: 17.785 };
const UNLOCK_DISTANCE = 5;
const ATTEMPTS_BEFORE_CHOICES = 2;

const ACTIVE_MONSTERS_COUNT = 9;
const MONSTER_VISIBILITY_DISTANCE = 60;
const MONSTER_PROXIMITY_NEAR = 60;
const MONSTER_PROXIMITY_CLOSE = 20;
const MONSTER_HIT_DISTANCE = 1.5;
const MONSTER_CHASE_BREAK_DISTANCE = 20;

// Monster speed (m/s)
const MONSTER_SPEED_NORMAL = 1.5;
const MONSTER_SPEED_CHASE  = 3.0;



const ICON_STYLE = 'svgrepo';
const ICONS = {
    svgrepo: {
        active: '<img src="icons/halloween-ghost.svg" width="28" height="28" alt="ghost" onerror="this.replaceWith(document.createTextNode(\'👻\'))">',
        completed: '<img src="icons/tombstone.svg" width="28" height="28" alt="tombstone" onerror="this.replaceWith(document.createTextNode(\'🪦\'))">',
        treasure: '<img src="icons/gem.svg" width="28" height="28" alt="gem" onerror="this.replaceWith(document.createTextNode(\'💎\'))">',
        player: '<img src="icons/crosshair.svg" width="24" height="24" alt="player" onerror="this.replaceWith(document.createTextNode(\'👤\'))">'
    },
    emoji: {
        active: '👻',
        completed: '🪦',
        treasure: '💎',
        player: '👤'
    }
};

const storyStartText = "Känner ni mig? Jag är en viskning i vinden... Silas. Jag är fast här. Mitt minne är trasigt, men ni kan hjälpa mig att pussla ihop det. Mitt första minne finns vid en plats där byns hemligheter delas. Leta efter anslagstavlan.";
const treasureLocationDescription = "Tack... Tack för att ni hittade den. Allt godis. Jag hade sparat det till en speciell dag med mina vänner, en dag som aldrig kom. Jag vill inte att det ska förfaras. Dela det, och tänk på mig. Nu... nu kan jag äntligen vila.";

const storyStartAudio = "audio/dialogue_start.mp3";
const endScreenAudio = "audio/dialogue_end.mp3";

const locations = [
    { 
        position: { lat: 59.283843, lng: 17.789477 }, 
        title: "Ett Eko vid Anslagstavlan", 
        story: "Här börjar det... där byns hemligheter viskas. Men mitt minne är som ett trasigt papper, fäst med ett fåtal nålar.", 
        storyAudio: "audio/dialogue_1_story.mp3",
        task: "Jag föds i det tysta, i skuggornas vrå, ett ord blir till många och börjar att gå. Jag växer med viskningar, blir större än sant, och kan krossa ett rykte i byn med min hand. Vad är jag –  ett ord som sprids utan källor?", 
        taskAudio: "audio/task_1.mp3",
        taskImage: "images/task_anslagstavlan.png",
        answer: "Skvaller", 
        choices: ["Förbannelse", "Ande", "Skvaller"], 
        nextClue: "Ja... en bit av minnet är tillbaka! Jag minns glädje. Känslan av att flyga. Följ efter...",
        nextClueAudio: "audio/dialogue_1_next.mp3",
        nextClueImage: "images/task_gungorna.png"
    },
    { 
        position: { lat: 59.284182, lng: 17.789266 }, 
        title: "Minnen vid Gungorna", 
        story: "Jag flög så högt här... så högt att jag kunde se över alla tak. Men glädjen från gungorna är bara ett eko nu. En röd balong är allt som finns kvar av minnet.", 
        storyAudio: "audio/dialogue_2_story.mp3",
        task: "I rött och vitt bär han sitt skratt, från mörka brunnar har han ofta skatt. Han lockar med ballonger och ett löfte så lent – men mötet med honom blir sällan skönt. Vem väntar vid gungornas minne i nattens sken?", 
        taskAudio: "audio/task_2.mp3",
        taskImage: "images/task_gungorna.png",
        answer: "Pennywise", 
        choices: ["Pennywise", "Jokern", "Merry Poppins"], 
        nextClue: "Det stämmer... Men efter leken kom skuggorna. Vägen hem var lång och mörk. De kallade den Dödens allé...",
        nextClueAudio: "audio/dialogue_2_next.mp3",
        nextClueImage: "images/task_dodensalle.png"
    },
    { 
        position: { lat: 59.282083, lng: 17.783727 }, 
        title: "Dödens allé", 
        story: "Träden här har sett allt', viskar Silas. 'Deras grenar är som fingrar. Men några av dem är äldre och mörkare än de andra... de är vridna av sorg.", 
        storyAudio: "audio/dialogue_3_story.mp3",
        task: "När månen är rund och natten är kall, hörs ett yl från skogen, mörkt och kallt. Människa om dagen, men i nattens tid – vilket odjur lurar i Dödens allé?", 
        taskAudio: "audio/task_3.mp3",
        taskImage: "images/task_dodensalle.png",
        answer: "Varulv", 
        choices: ["Troll", "Varulv", "Gast"], 
        nextClue: "Fort tillbaka... mot en plats med ett hemskt förflutet. En plats där ingen fick ro... galgbacken.",
        nextClueAudio: "audio/dialogue_3_next.mp3",
        nextClueImage: "images/task_galgbacken.png"
    },
    { 
        position: { lat: 59.28321, lng: 17.786663 }, 
        title: "Galgbacken", 
        story: "De säger att marken här minns. Att de orättvist dömda fortfarande väntar... Jag känner deras sorg. ", 
        storyAudio: "audio/dialogue_4_story.mp3",
        task: "En plats där dom föll för sitt brott, där livet tog slut med ett rep så kort. Här slutade vägen för många en stackare – vad kallas platsen? Jo, en …", 
        taskAudio: "audio/task_4.mp3",
        taskImage: "images/task_galgbacken.png",
        answer: "Galgbacke", 
        choices: ["Avrättningsplats", "Galgbacke", "Lekplats"], 
        nextClue: "Ni känner sorgen ni med... Men det fanns ett hus som såg allt. Ett kråkslott på höjden, som en tyst väktare.",
        nextClueAudio: "audio/dialogue_4_next.mp3",
        nextClueImage: "images/task_krakslottet.png"
    },
    { 
        position: { lat: 59.282161, lng: 17.787237 }, 
        title: "Kråkslottet på höjden", 
        story: "Från detta hus såg jag hela världen. En mörk vimpel på taket visade mig vart vinden, och ödet, skulle blåsa.", 
        storyAudio: "audio/dialogue_5_story.mp3",
        task: "De sover om dagen men jagar i natt, med huggtänder redo och mörkret som skatt. De törstar efter blod i sin eviga jakt – vad är det för varelse som lever på detta sätt?", 
        taskAudio: "audio/task_5.mp3",
        taskImage: "images/task_krakslottet.png",
        answer: "Vampyr", 
        choices: ["Gast", "Varulv", "Vampyr"], 
        nextClue: "Vinden för mig nu till en mörkare plats... en bro över en tyst bäck där man inte skulle gå ensam. Trollbron.",
        nextClueAudio: "audio/dialogue_5_next.mp3",
        nextClueImage: "images/task_trollbron.png"
    },
    { 
        position: { lat: 59.283275, lng: 17.784597 }, 
        title: "Trollbron", 
        story: "Skynda er över. Gå inte för långsamt. Något lyssnar under plankorna. Räkna dem snabbt!", 
        storyAudio: "audio/dialogue_6_story.mp3",
        task: "Bron bär dig över där skuggorna bor, plankor på rad visar vägen du tror. Men för att gå vidare i nattens plan – hur många plankor bildar gångbanans span?", 
        taskAudio: "audio/task_6.mp3",
        taskImage: "images/task_trollbron.png",
        answer: "3", 
        choices: ["2", "3", "1"], 
        nextClue: "Puh... det var nära. Jag minns en lugnare plats. En plats för tystnad och silverklot.",
        nextClueAudio: "audio/dialogue_6_next.mp3",
        nextClueImage: "images/task_bouleplanen.png"
    },
    { 
        position: { lat: 59.28494, lng: 17.785026 }, 
        title: "De Silverglänsande Kloten", 
        story: "Här var det tyst. Bara det mjuka klickandet från kloten. En paus i skuggorna.", 
        storyAudio: "audio/dialogue_7_story.mp3",
        task: "Här klotens klick i tystnaden slår, en paus från skuggor som annars består. Men öppna nu ögonen, räkna med hand – hur många vilsamma bänkar syns från grusets land?", 
        taskAudio: "audio/task_7.mp3",
        taskImage: "images/task_bouleplanen.png",
        answer: "2", 
        choices: ["1", "2", "6"], 
        nextClue: "Men friden varade inte. Jag minns elden. Röken. En plats som brännmärkts av historien... Offerplatsen.",
        nextClueAudio: "audio/dialogue_7_next.mp3",
        nextClueImage: "images/task_offerplatsen.png" 
    },
    { 
        position: { lat: 59.286526, lng: 17.783697 }, 
        title: "Offerplatsen", 
        story: "De säger att det bara var en majbrasa. Men jag känner den gamla askan. Jag känner rädslan. Rädslan påminner mig om en annan plats... en plats full av liv.", 
        storyAudio: "audio/dialogue_8_story.mp3",
        task: "En stjärna i natten, ett mörkrets tecken, i gamla ritualer har den funnits i seklen. Med uddarna vassa som ondska och far, hur många spetsar djävulens stjärna har?", 
        taskAudio: "audio/task_8.mp3",
        taskImage: "images/task_offerplatsen.png",
        answer: "5", 
        choices: ["5", "6", "7"], 
        nextClue: "Rädslan... den hjälper mig minnas. Jag minns platsen med alla ropen. Där jag planerade allt.",
        nextClueAudio: "audio/dialogue_8_next.mp3",
        nextClueImage: "images/task_fotbollsplanen.png" 
    },
    { 
        position: { lat: 59.285058, lng: 17.784211 }, 
        title: "Den Tysta Matchen", 
        story: "Jag sprang här, skrattade... Jag planerade en överraskning för mina vänner. En skattjakt. Men jag hann aldrig avsluta den. Allt blev tyst.", 
        storyAudio: "audio/dialogue_9_story.mp3",
        task: "Där matcherna spelas och bollen far, finns platsen där trötta sin vila tar. Vad finns här vid planen där man slår sig ner?", 
        taskAudio: "audio/task_9.mp3",
        taskImage: "images/task_fotbollsplanen.png",
        answer: "Bänken", 
        choices: ["Bänken", "Gräset", "Stenen"], 
        nextClue: "Ja, den sista viloplatsen... bänken. Det var den sista gåtan... och nu... nu minns jag! Jag minns var jag gömde skatten. Till mitt kungadöme! Trädet som föll. Skynda er!",
        nextClueAudio: "audio/dialogue_9_next.mp3",
        nextClueImage: "images/task_trad.png"
    },
    { 
        position: { lat: 59.283716, lng: 17.783577 }, 
        title: "Silas Sista Gömställe", 
        story: "Den är här, vid foten av stammen. Snälla, hitta den.", 
        storyAudio: "audio/dialogue_10_story.mp3",
        taskImage: "images/task_trad.png",
        task: "", answer: "", nextClue: "" 
    }
];

const monsterTypes = [
    { id: 0, name: "zombie", icon: '<img src="icons/zombie-hand.svg" width="28" height="28" alt="zombie" onerror="this.replaceWith(document.createTextNode(\'🧟\'))">', jumpscareImg: 'images/zombie_jumpscare.png', sounds: { near: 'zombie_near', close: 'zombie_close', hit: 'zombie_hit' } },
    { id: 1, name: "vampire", icon: '<img src="icons/vampire.svg" width="28" height="28" alt="vampire" onerror="this.replaceWith(document.createTextNode(\'🧛\'))">', jumpscareImg: 'images/vampire_jumpscare.png', sounds: { near: 'vampire_near', close: 'vampire_close', hit: 'vampire_hit' } },
    { id: 2, name: "clown", icon: '<img src="icons/clown.svg" width="28" height="28" alt="clown" onerror="this.replaceWith(document.createTextNode(\'🤡\'))">', jumpscareImg: 'images/clown_jumpscare.png', sounds: { near: 'clown_near', close: 'clown_close', hit: 'clown_hit' } },
    { id: 3, name: "demon", icon: '<img src="icons/devil.svg" width="28" height="28" alt="demon" onerror="this.replaceWith(document.createTextNode(\'😈\'))">', jumpscareImg: 'images/demon_jumpscare.png', sounds: { near: 'demon_near', close: 'demon_close', hit: 'demon_hit' } },
    { id: 4, name: "insekt", icon: '<img src="icons/mosquito.svg" width="28" height="28" alt="insekt" onerror="this.replaceWith(document.createTextNode(\'🪰\'))">', jumpscareImg: 'images/insekt_jumpscare.png', sounds: { near: 'insekt_near', close: 'insekt_close', hit: 'insekt_hit' } },
    { id: 5, name: "spindel", icon: '<img src="icons/spider.svg" width="28" height="28" alt="spindel" onerror="this.replaceWith(document.createTextNode(\'🕷️\'))">', jumpscareImg: 'images/spindel_jumpscare.png', sounds: { near: 'spindel_near', close: 'spindel_close', hit: 'spindel_hit' } },
    { id: 6, name: "wolf", icon: '<img src="icons/wolf.svg" width="28" height="28" alt="wolf" onerror="this.replaceWith(document.createTextNode(\'🐺\'))">', jumpscareImg: 'images/wolf_jumpscare.png', sounds: { near: 'wolf_near', close: 'wolf_close', hit: 'wolf_hit' } },
    { id: 7, name: "hamster", icon: '<img src="icons/hamster.svg" width="28" height="28" alt="hamster" onerror="this.replaceWith(document.createTextNode(\'🐹\'))">', jumpscareImg: 'images/hamster_jumpscare.png', sounds: { near: 'hamster_near', close: 'hamster_close', hit: 'hamster_hit' } }
];

const monsters = [
    { typeId: 0, spawnOnClue: 4, deSpawnOnClue: 5, waypoints: [{ lat: 59.283081, lng: 17.785847 }, { lat: 59.283497, lng: 17.78669 }] },
    { typeId: 0, spawnOnClue: 4, deSpawnOnClue: 5, waypoints: [{ lat: 59.283234, lng: 17.787072 }, { lat: 59.283234, lng: 17.787072 }, { lat: 59.28299, lng: 17.785545 }, { lat: 59.282583, lng: 17.786196 }] },
    { typeId: 1, spawnOnClue: 5, waypoints: [{ lat: 59.282347, lng: 17.787538 }, { lat: 59.282175, lng: 17.787238 }, { lat: 59.282901, lng: 17.785694 }, { lat: 59.283421, lng: 17.785122 }] },
    { typeId: 2, spawnOnClue: 2, waypoints: [{ lat: 59.284661, lng: 17.789192 }, { lat: 59.28383, lng: 17.789582 }, { lat: 59.283194, lng: 17.788026 }, { lat: 59.284411, lng: 17.786624 }, { lat: 59.284721, lng: 17.788799 }], speed: 1.5 },
    { typeId: 3, spawnOnClue: 8, waypoints: [{ lat: 59.286589, lng: 17.782764 }, { lat: 59.286545, lng: 17.783724 }, { lat: 59.285611, lng: 17.784158 }, { lat: 59.286542, lng: 17.783694 }] },
    { typeId: 4, spawnOnClue: 9, waypoints: [{ lat: 59.285126, lng: 17.783892 }, { lat: 59.28456, lng: 17.784091 }, { lat: 59.284034, lng: 17.783404 }] },
    { typeId: 5, spawnOnClue: 0, deSpawnOnClue: 1, waypoints: [{ lat: 59.283887, lng: 17.786043 }, { lat: 59.284185, lng: 17.786832 }, { lat: 59.28321, lng: 17.788021 }] },
    { typeId: 5, spawnOnClue: 0, deSpawnOnClue: 1, waypoints: [{ lat: 59.286177, lng: 17.783747 }, { lat: 59.283525, lng: 17.785139 }, { lat: 59.282476, lng: 17.786449 }, { lat: 59.282957, lng: 17.787568 }], speed: 1.0 },
    { typeId: 5, spawnOnClue: 0, deSpawnOnClue: 1, waypoints: [{ lat: 59.283168, lng: 17.788025 }, { lat: 59.282445, lng: 17.786460 }, { lat: 59.283006, lng: 17.785513 }, { lat: 59.284572, lng: 17.784544 }] },
    { typeId: 6, spawnOnClue: 3, waypoints: [{ lat: 59.28239, lng: 17.783594 }, { lat: 59.282551, lng: 17.785003 }, { lat: 59.281735, lng: 17.785316 }] },
    { typeId: 7, spawnOnClue: 6, deSpawnOnClue: 9, waypoints: [{ lat: 59.2833, lng: 17.784059 }, { lat: 59.283277, lng: 17.784526 }, { lat: 59.284047, lng: 17.786477 }] }
    
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
let completedMarkers = [];
let isProcessingAnswer = false;
let onStoryModalConfirm = null;
let currentPlayingAudio = null;

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

function showTopFeedback(message, isSuccess) {
    if (!storyBanner) return;
    storyBanner.textContent = message;
    storyBanner.style.display = 'block';
    storyBanner.style.color = isSuccess ? '#ffffff' : '#ff6600';
    const oldZ = storyBanner.style.zIndex;
    storyBanner.style.zIndex = '9999';
    clearTimeout(window.__feedbackHideTimer);
    window.__feedbackHideTimer = setTimeout(() => {
        storyBanner.style.display = 'none';
        storyBanner.style.zIndex = oldZ || '';
    }, 2500);
    // also clear inline feedback text if present
    if (feedbackText) { feedbackText.textContent = ''; }
}
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

if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
  navigator.serviceWorker.register('service-worker.js')
    .then(registration => {
      console.log('ServiceWorker registered:', registration);
    })
    .catch(err => {
      console.log('ServiceWorker registration failed:', err);
    });
} else {
  console.log('ServiceWorker skipped: not http(s) or localhost');

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
        gestureHandling: "greedy", // ← tillåter ett finger att flytta, två för att zooma
        zoomControl: true,
        mapId: myMapId
    });
    map.addListener('dragstart', () => { isFollowingUser = false; });
    setupEventListeners();
}

function startGame() {
    // Direkt switch utan blink
    introScreen.classList.remove('active');
    mapScreen.classList.add('active');
    storyBanner.textContent = "Hitta anslagstavlan som markerats av ett spöke.";

    // När kartcontainern är synlig: trigga resize och centrera
    try { google.maps.event.trigger(map, 'resize'); } catch (e) {}
    map.setCenter(mapStartCenter);

    showNextLocation();
    startLocationWatcher();
    checkAndSpawnMonsters(0);
    startGameLoop();
}

function setupEventListeners() {
    startBtn.addEventListener('click', () => {
        startScreen.classList.remove('active');
        introText.textContent = storyStartText;
        playDialogueAudio(storyStartAudio);
        introScreen.classList.add('active');
        setTimeout(startGame, 23000);
    });
    submitAnswerBtn.addEventListener('click', () => {
        stopCurrentAudio();
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
        stopCurrentAudio();
        storyModal.style.display = 'none';
        if (onStoryModalConfirm) {
            onStoryModalConfirm();
        }
    });
    if (infoModalBtn) if (infoModalBtn) infoModalBtn.addEventListener('click', () => {
        infoModal.style.display = 'none';
    });
    if (treasureModalBtn) if (treasureModalBtn) treasureModalBtn.addEventListener('click', () => {
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
            userMarkerElement.className = 'user-marker-icon';
            userMarkerElement.innerHTML = ICONS[ICON_STYLE].player;
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
    const location = locations[currentIndex];
    // Show last story with the tree image and custom confirm text
    showSilasModal(
        location.story,
        "Ja, vi har hittat skatten",
        () => { showFinalFarewell(); },
        location.storyAudio,
        location.taskImage, /* imageSrc */
        true /* fullBleed */,
        ""  /* no title */
    );
}

function showSilasModal(text, buttonText, callback, audioFile, imageSrc, fullBleed, titleText) {
    // Title
    if (typeof titleText === 'string') {
        storyModalTitle.textContent = titleText;
    } else {
        storyModalTitle.textContent = "";
    }
    // Body + button
    storyModalText.textContent = text;
    storyModalBtn.textContent = buttonText;
    onStoryModalConfirm = callback;

    // Image handling
    const img = document.getElementById('silas-modal-image');
    const modalEl = document.getElementById('story-modal');
    if (img) {
        if (imageSrc) {
            img.src = imageSrc;
            img.classList.add('story-image-full');
            if (modalEl) modalEl.classList.add('next-image');
        } else {
            img.src = 'images/silas.png';
            img.classList.remove('story-image-full');
            if (modalEl) modalEl.classList.remove('next-image');
        }
    }

    playDialogueAudio(audioFile);
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
    playDialogueAudio(location.taskAudio);
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
    submitAnswerBtn.style.display = "";
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
                }, location.storyAudio);
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
        showTopFeedback("Ni har löst gåtan och svarat rätt! Välj fortsätt när ni är redo.", true);
        taskAnswer.disabled = true;
        document.querySelectorAll('input[name="choices"]').forEach(radio => radio.disabled = true);
        // Visa topp-feedback (den anropar du redan strax innan)
	submitAnswerBtn.style.display = 'none';        // dölj knappen
	isProcessingAnswer = false;
	submitAnswerBtn.disabled = true;

	clearTimeout(window.__autoNextTimer);
	window.__autoNextTimer = setTimeout(() => {
    	modal.style.display = 'none';
    	showStoryUpdate();

    	// återställ för nästa uppgift
    	submitAnswerBtn.style.display = '';
    	submitAnswerBtn.disabled = false;
    	submitAnswerBtn.textContent = 'Skicka svar';
	}, 1500);
        
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
            showTopFeedback("Ni har svarat fel. Försök igen!", false);
            if (wrongAnswerCount >= ATTEMPTS_BEFORE_CHOICES) {
                showMultipleChoice();
            }
        } else {
            showTopFeedback("Ni har svarat fel. Försök igen!", false);
        }
        setTimeout(() => {
            isProcessingAnswer = false;
            submitAnswerBtn.disabled = false;
        }, 1000);
    }
}

function showStoryUpdate() {
    const nextClueText = locations[currentIndex].nextClue;
    const nextClueAudio = locations[currentIndex].nextClueAudio;
    if (nextClueText) {
        showSilasModal(nextClueText, "Fortsätt...", () => {const justCompletedIndex = currentIndex;
            deSpawnOnClue(justCompletedIndex + 1);
            panToNextLocation();
            checkAndSpawnMonsters(justCompletedIndex + 1);
        }, nextClueAudio, locations[currentIndex].nextClueImage);
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
        iconDiv.innerHTML = ICONS[ICON_STYLE].completed;
    } else if (type === 'treasure') {
        iconDiv.className = 'treasure-icon';
        iconDiv.innerHTML = ICONS[ICON_STYLE].treasure;
    } else {
        iconDiv.className = 'marker-icon';
        iconDiv.innerHTML = ICONS[ICON_STYLE].active;
    }
    return iconDiv;
}

function showEndScreen() {
    // Show the final farewell dialog instead of the old end screen.
    showFinalFarewell();
}

function checkAndSpawnMonsters(clueIndex) {
    const monstersToSpawn = monsters.filter(m => m.spawnOnClue === clueIndex);
    monstersToSpawn.forEach(monsterData => {
        if (activeMonsterInstances.length >= ACTIVE_MONSTERS_COUNT) return;
        const typeInfo = monsterTypes.find(t => t.id === monsterData.typeId);
        if (!typeInfo) return;
        const monsterIcon = document.createElement('div');
        monsterIcon.className = 'monster-icon monster-idle';
        monsterIcon.innerHTML = typeInfo.icon;
        const marker = new AdvancedMarkerElement({ position: monsterData.waypoints[0], map: DEVELOPER_MODE ? map : null, content: monsterIcon, title: `Monster` });
        activeMonsterInstances.push({ marker: marker, typeInfo: typeInfo, waypoints: monsterData.waypoints, isHit: false, currentWaypoint: 0, isVisible: DEVELOPER_MODE, isChasing: false, proximityState: 'idle', lastNearSoundTime: 0, hasPlayedCloseSound: false, despawnAt: (typeof monsterData.deSpawnOnClue === 'number' ? monsterData.deSpawnOnClue : null) });
    });
}

function deSpawnOnClue(clueIndex) {
    // Remove any active monster whose despawnAt is defined and <= clueIndex
    if (!Array.isArray(activeMonsterInstances) || activeMonsterInstances.length === 0) return;
    for (let i = activeMonsterInstances.length - 1; i >= 0; i--) {
        const inst = activeMonsterInstances[i];
        if (typeof inst?.despawnAt === 'number' && clueIndex >= inst.despawnAt) {
            try { if (inst.marker) inst.marker.map = null; } catch (e) {}
            activeMonsterInstances.splice(i, 1);
        }
    }
}



function startGameLoop() {
    setInterval(() => {
        updateMonsterPositions();
        checkMonsterProximity();
    }, 1000);
}

function startGameLoop() {
    let last = performance.now();
    setInterval(() => {
        const now = performance.now();
        let dt = (now - last) / 1000;
        if (!Number.isFinite(dt) || dt <= 0) dt = 1.0;
        last = now;

        updateMonsterPositions(dt);
        checkMonsterProximity();
    }, 1000);
}

function updateMonsterPositions(dt) {
    activeMonsterInstances.forEach(monster => {
        if (monster.isHit || !monster.marker) return;

        // Välj mål
        let targetPosition;
        if (monster.isChasing && userPosition) {
            targetPosition = userPosition;
        } else {
            targetPosition = monster.waypoints[monster.currentWaypoint];
            // Byt waypoint när vi är ~1 m ifrån
            if (getDistance(monster.marker.position, targetPosition) < 1) {
                monster.currentWaypoint = (monster.currentWaypoint + 1) % monster.waypoints.length;
                targetPosition = monster.waypoints[monster.currentWaypoint];
            }
        }

        // Hur långt kvar i meter?
        const currentPos = monster.marker.position;
        const distanceMeters = getDistance(currentPos, targetPosition);

        // Hastighet (m/s): per-instans override eller default
        const base = (typeof monster.speed === 'number' ? monster.speed : MONSTER_SPEED_NORMAL);
        const speed = monster.isChasing ? Math.max(base * 2, MONSTER_SPEED_CHASE) : base;
        const maxStep = speed * dt; // meter detta tick

        if (!Number.isFinite(distanceMeters) || distanceMeters <= maxStep) {
            monster.marker.position = { lat: targetPosition.lat, lng: targetPosition.lng };
            return;
        }

        // Flytta en proportion av vektorn motsv. maxStep meter
        const frac = maxStep / distanceMeters;
        monster.marker.position = {
            lat: currentPos.lat + (targetPosition.lat - currentPos.lat) * frac,
            lng: currentPos.lng + (targetPosition.lng - currentPos.lng) * frac
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
            const iconElement = monster.marker.content;
            iconElement.className = 'monster-icon';
            switch(newState) {
                case 'near':
                    iconElement.classList.add('monster-chasing-near');
                    break;
                case 'close':
                    iconElement.classList.add('monster-chasing-close');
                    break;
                default:
                    iconElement.classList.add('monster-idle');
                    break;
            }
            monster.proximityState = newState;
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

function playDialogueAudio(filename) {
    stopCurrentAudio();
    if (!filename) return;
    const newAudio = new Audio(filename);
    newAudio.play();
    currentPlayingAudio = newAudio;
}

function stopCurrentAudio() {
    if (currentPlayingAudio) {
        currentPlayingAudio.pause();
        currentPlayingAudio.currentTime = 0;
        currentPlayingAudio = null;
    }
}

window.initMap = initMap;

function showFinalFarewell() {
    showSilasModal(treasureLocationDescription, "Avsluta", () => {
        storyModal.style.display = "none";
    }, endScreenAudio, "images/silas_happy.png");
    const titleEl = document.getElementById("story-modal-title");
    if (titleEl) titleEl.textContent = "Farväl";
}