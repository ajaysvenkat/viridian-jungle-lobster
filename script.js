const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence
const clueHoldTime = 1000; //how long to hold each clue's light/sound

var pattern = [];
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 1;
var guessCounter = 0;
var mistakes = 0;
var slider = document.getElementById("rounds");
var countDown;
var x;
var lost = 0;
var win = 0;

function slide() {
  var x = document.getElementById("rounds").value;
  document.getElementById("demo").innerHTML = "Rounds: " + x;
}

function startGame() {
  progress = 0;
  lost = 0;
  win = 0;
  gamePlaying = true;
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  makePattern();
  playClueSequence();
  document.getElementById("c1").classList.add("hidden");
  document.getElementById("c2").classList.add("hidden");
  document.getElementById("c3").classList.add("hidden");
}
function stopGame() {
  //initialize game variables
  gamePlaying = false;
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  clearInterval(x);
}

function makePattern() {
  var num = document.getElementById("rounds").value;
  var temp = 0;
  console.log("slider is: " + num);
  for (let i = 0; i < num; i++) {
    temp = Math.floor(Math.random() * 6) + 1;
    pattern[i] = temp;
  }
}

const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 530,
  5: 660,
  6: 790,
};
function playTone(btn, len) {
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  context.resume();
  tonePlaying = true;
  setTimeout(function () {
    stopTone();
  }, len);
}
function startTone(btn) {
  if (!tonePlaying) {
    context.resume();
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    context.resume();
    tonePlaying = true;
  }
}
function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}

// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);

function lightButton(btn) {
  document.getElementById("btn" + btn).classList.add("lit");
}
function clearButton(btn) {
  document.getElementById("btn" + btn).classList.remove("lit");
}

function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

function playClueSequence() {
  context.resume();
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for (let i = 0; i <= progress; i++) {
    // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i]); // set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime;
  }
  if (gamePlaying) {
    countDown =
      new Date().getTime() +
      15000 +
      document.getElementById("rounds").value * 1000;
    x = setInterval(function down() {
      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDown - now;

      // Time calculations for days, hours, minutes and seconds
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      document.getElementById("time").innerHTML = seconds + "s ";
      // If the count down is finished, write some text
      if (distance < 0 || mistakes == 3) {
        clearInterval(x);
        document.getElementById("time").innerHTML = 0;
        loseGame();
      }
    }, 1000);
  }
}

function loseGame() {
  stopGame();
  clearInterval(x);
  if (lost == 0 && win == 0) {
    alert("Game Over. Try Again.");
    lost++;
  }
  mistakes = 0;
}
function winGame() {
  stopGame();
  clearInterval(x);
  alert("Congrats! You Win!");
  win++;
  mistakes = 0;
  document.getElementById("c1").classList.add("hidden");
  document.getElementById("c2").classList.add("hidden");
  document.getElementById("c3").classList.add("hidden");
}

function guess(btn) {
  console.log("user guessed: " + btn);
  if (!gamePlaying) {
    clearInterval(x);
    return;
  }
  if (pattern[guessCounter] != btn && mistakes == 2) {
    document.getElementById("c3").classList.remove("hidden");
    clearInterval(x);
    loseGame();
    mistakes++;
  } else if (pattern[guessCounter] != btn && mistakes == 1) {
    document.getElementById("c2").classList.remove("hidden");
    mistakes++;
    if (guessCounter != progress) guessCounter++;
    else if (progress == pattern.length - 1) winGame();
    else {
      progress++;
      playClueSequence();
    }
  } else if (pattern[guessCounter] != btn && mistakes == 0) {
    document.getElementById("c1").classList.remove("hidden");
    mistakes++;
    if (guessCounter != progress) guessCounter++;
    else if (progress == pattern.length - 1) winGame();
    else {
      progress++;
      playClueSequence();
    }
  } else if (guessCounter != progress) guessCounter++;
  else if (progress == pattern.length - 1) winGame();
  else {
    progress++;
    playClueSequence();
  }
}
