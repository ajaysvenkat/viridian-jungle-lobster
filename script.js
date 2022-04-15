const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence
const clueHoldTime = 1000; //how long to hold each clue's light/sound

var pattern = [];
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 1.03125;
var guessCounter = 0;
var mistakes = 0;
var slider = document.getElementById("rounds");
var countDown;
var x;
var lost = 0;
var win = 0;

function makeButtons() {
  var num = document.getElementById("quantity").value;
  var btns = "";

  for (let i = 0; i < num; i++) {
    btns +=
      '<button id="btn' +
      i +
      '" class="btn' +
      i +
      '" onmousedown="startTone(' +
      i +
      ')" onmouseup="stopTone()" onclick="guess(' +
      i +
      ')"></button>';
  }

  document.getElementById("gameBtnArea").innerHTML = btns;
}

// prints the Round slider's curent value
function slide() {
  var x = document.getElementById("rounds").value;
  document.getElementById("demo").innerHTML = "Rounds: " + x;
}

// prints the amount of buttons from the slider
function slideBtn() {
  var x = document.getElementById("quantity").value;
  document.getElementById("demo2").innerHTML = "Buttons: " + x + " ";
  makeButtons();
}

// sets all the initial values and starts the game
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
// stops the game
function stopGame() {
  gamePlaying = false;
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  clearInterval(x);
}

// creates a random pattern based on the amount of rounds and buttons
function makePattern() {
  var num = document.getElementById("rounds").value;
  var qty = document.getElementById("quantity").value;
  var temp = 0;
  console.log("slider is: " + num);
  for (let i = 0; i < num; i++) {
    temp = Math.floor(Math.random() * qty);
    pattern[i] = temp;
  }
}

// sets the frequency of the buttons to an A Major Arpeggio
const freqMap = {
  0: 110.00,
  1: 138.59,
  2: 164.81,
  3: 220.00,
  4: 277.18,
  5: 329.63,
  6: 440.00,
  7: 554.37,
  8: 659.25,
  9: 880.00,
};
// plays the corresponding tone to the button pressed
function playTone(btn, len) {
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  context.resume();
  tonePlaying = true;
  setTimeout(function () {
    stopTone();
  }, len);
}
// starts the tone
function startTone(btn) {
  if (!tonePlaying) {
    context.resume();
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    context.resume();
    tonePlaying = true;
  }
}
//stops the tone
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

// lights up the specified button
function lightButton(btn) {
  document.getElementById("btn" + btn).classList.add("lit");
}
// makes a specific button unlit
function clearButton(btn) {
  document.getElementById("btn" + btn).classList.remove("lit");
}

//plays a single clue based on the pattern
function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

// plays a string of clues from the pattern based on the progress
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
  // sets the timer
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

// dictates what should happen if the player loses
function loseGame() {
  stopGame();
  clearInterval(x);
  if (lost == 0 && win == 0) {
    alert("Game Over. Try Again.");
    lost++;
  }
  mistakes = 0;
}
// dictates what should happen if the player wins
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

// receives the player's guess and determines if it is correct or not
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
