'use strict'

var AudioContext = window.AudioContext || window.webkitAudioContext

var context = new AudioContext
var tempo = 100
var beatDuration = 0.6
var bigBeatNumber = document.querySelector('.js-beat-number')
var beatAccentsContainer = document.querySelector('.js-beat-accents')
var beatsPerBar = 4
var metronomeRunning = false
var accentedNotes = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var totalBeats = 0
var nextNoteTime = 0
var timerID = 0

var source = null
var audioBufferA = null
var audioBufferB = null

const tempoInput = document.querySelector('.js-tempo-input')
tempoInput.addEventListener('change', updateTempo, false)

const tempoSelect = document.querySelector('.js-tempo-select')
tempoSelect.addEventListener('change', updateTempo, false)

const beatsInput = document.querySelector('.js-beats-input')
beatsInput.addEventListener('change', updateBeatsPerBar, false)

const startButton = document.querySelector('.js-start-button')
startButton.addEventListener('click', toggleMetronome, false)

const accentInputs = document.querySelector('.js-beat-accents')
accentInputs.addEventListener('click', updateAccentedNotes, false)

function initSound (arrayBuffer, sampleType) {
  context.decodeAudioData(arrayBuffer, function (buffer) {
    switch (sampleType) {
      case 0:
        audioBufferA = buffer
        break
      case 1:
        audioBufferB = buffer
    }
    console.log('Sample loaded')
  }, function (e) {
    console.log('Error decoding file', e)
  })
}

function loadSoundFile (url, sampleType) {
  var request = new window.XMLHttpRequest()
  request.open('GET', url, true)
  request.responseType = 'arraybuffer'
  request.onload = function (e) {
    initSound(this.response, sampleType) // this.response is an ArrayBuffer.
  }
  request.send()
}

function playAccentedNote (time) {
  source = context.createBufferSource()
  source.buffer = audioBufferA
  source.loop = false
  source.connect(context.destination)
  source.start(time)
}

function playNote (time) {
  source = context.createBufferSource()
  source.buffer = audioBufferB
  source.loop = false
  source.connect(context.destination)
  source.start(time)
}

function updateTempo (e) {
  tempo = e.target.value
  tempoInput.value = tempo
  beatDuration = 60 / tempo
  totalBeats = 0
}

function updateBeatsPerBar (e) {
  beatsPerBar = e.target.value
  beatAccentsContainer.innerHTML = ''
  for (var i = 0; i < beatsPerBar; i++) {
    beatAccentsContainer.innerHTML += `<input type="checkbox" id="beatAccents[${i}]" name="beatAccents[]" value="${i}" class="beat-accent__checkbox js-accent-checkbox" ${accentedNotes[i] === 1 ? ' checked' : ''}>`
    beatAccentsContainer.innerHTML += `<label for="beatAccents[${i}]" class="beat-accent__label"><span class="visually-hidden">Beat ${i + 1}</span></label>`
  }
}

function updateAccentedNotes (e) {
  if (e.target.tagName.toLowerCase() === 'input') {
    let checkboxes = document.querySelectorAll('.js-accent-checkbox')

    checkboxes.forEach(function (checkbox) {
      setAccent(checkbox.value, checkbox.checked ? 1 : 0)
    })
  }
}

function setAccent (beatNumber, accent) {
  accentedNotes[beatNumber] = accent
}

function toggleMetronome () {
  if (metronomeRunning === false) {
    metronomeRunning = true
    totalBeats = 0
    nextNoteTime = context.currentTime
    scheduler()
    startButton.innerHTML = 'Stop'
    bigBeatNumber.style.display = 'block'
  } else {
    metronomeRunning = false
    window.clearTimeout(timerID)
    startButton.innerHTML = 'Start'
    bigBeatNumber.style.display = 'none'
  }
}

function nextNote () {
  nextNoteTime += beatDuration

  totalBeats++
}

function scheduler () {
  while (nextNoteTime < context.currentTime + 0.05) {
    scheduleNote(totalBeats, nextNoteTime)
    nextNote()
  }
  // Check for note
  timerID = window.setTimeout(scheduler, 25)
}

function scheduleNote (beatNumber, startTime) {
  if (accentedNotes[totalBeats % beatsPerBar] === 1) {
    playAccentedNote(startTime)
    bigBeatNumber.classList.add('accent')
  } else {
    playNote(startTime)
    bigBeatNumber.classList.remove('accent')
  }

  bigBeatNumber.innerHTML = totalBeats % beatsPerBar + 1
}

function init () {
  loadSoundFile('../samples/click_high.wav', 0)
  loadSoundFile('../samples/click_low.wav', 1)
}

init()
