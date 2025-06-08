let previousVolume = null;
let goodMinuteStreak = 0;
let numFlowers = 0;
let numButterflies = 0;

function showDeer() {
    console.log("Deer appears");
}

function hideDeer() {
    console.log("Deer disappears");
}

function growFlower(count) {
    console.log(`Flower #${count} blooms`);
}

function maybeAddButterfly(count) {
    console.log(`Butterfly #${count} added`);
}

function checkVolume(currentVolume) {
    if (previousVolume === null || currentVolume <= previousVolume) {
        goodMinuteStreak++;
        numFlowers++;
        if (goodMinuteStreak % 3 === 0) {
            numButterflies++;
        }
        showDeer();
        growFlower(numFlowers);
        if (goodMinuteStreak % 3 === 0) {
            maybeAddButterfly(numButterflies);
        }
    } else {
        goodMinuteStreak = 0;
        hideDeer();
    }

    previousVolume = currentVolume;
}

// Simulate volume changes for testing
let testVolumes = [40, 39, 38, 37, 42, 40, 39, 35, 34, 36, 33];
testVolumes.forEach((vol, index) => {
    console.log(`Minute ${index + 1}: volume = ${vol}`);
    checkVolume(vol);
});