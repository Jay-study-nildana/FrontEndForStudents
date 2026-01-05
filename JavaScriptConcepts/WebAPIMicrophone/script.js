// Microphone Web API — Interactive demo (lots of logs)
// Features:
//  - enumerateDevices & device selection
//  - navigator.mediaDevices.getUserMedia (audio)
//  - MediaRecorder for recording to blobs
//  - Web Audio API for visualization (AnalyserNode) and gain control
//  - simple UI: open/close mic, start/stop record, play, download
//  - many console.log and in-page logs for learning

const deviceSelect = document.getElementById('device-select');
const btnOpen = document.getElementById('btn-open');
const btnClose = document.getElementById('btn-close');
const btnStart = document.getElementById('btn-start');
const btnStop = document.getElementById('btn-stop');
const btnPlay = document.getElementById('btn-play');
const btnClear = document.getElementById('btn-clear');
const downloadLink = document.getElementById('download-link');

const canvas = document.getElementById('wave-canvas');
const levelBar = document.getElementById('level-bar');
const statusEl = document.getElementById('status');
const timerEl = document.getElementById('recording-timer');
const logArea = document.getElementById('log-area');
const btnClearLogs = document.getElementById('btn-clear-logs');
const btnCopyLogs = document.getElementById('btn-copy-logs');
const gainRange = document.getElementById('gain-range');

let audioStream = null;           // MediaStream from getUserMedia
let mediaRecorder = null;         // MediaRecorder instance
let recordedChunks = [];          // Array of Blob parts
let lastBlobUrl = null;           // URL for last recorded blob
let audioCtx = null;              // AudioContext for visualization
let analyser = null;              // AnalyserNode for waveform
let sourceNode = null;            // MediaStreamAudioSourceNode
let gainNode = null;              // GainNode to adjust volume pre-recorder (affects visualization only)
let rafId = null;                 // requestAnimationFrame id for drawing
let recordStartTs = null;         // timestamp when recording started
let timerInterval = null;

// Helpers for logging (both console and in-page)
function log(...args) {
  console.log('[mic-demo]', ...args);
  const line = `[${new Date().toLocaleTimeString()}] ${args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ')}`;
  const div = document.createElement('div');
  div.textContent = line;
  logArea.prepend(div);
}
function clearLogs() {
  logArea.innerHTML = '';
  console.clear();
  log('Logs cleared');
}

// Populate device list
async function enumerateDevices() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    log('enumerateDevices() returned', devices.length, 'devices');
    const inputs = devices.filter(d => d.kind === 'audioinput');
    deviceSelect.innerHTML = '';
    if (inputs.length === 0) {
      const opt = document.createElement('option');
      opt.value = '';
      opt.textContent = 'No input devices found';
      deviceSelect.appendChild(opt);
      return;
    }
    for (const d of inputs) {
      const opt = document.createElement('option');
      opt.value = d.deviceId;
      opt.textContent = d.label || `Microphone ${deviceSelect.length + 1}`;
      deviceSelect.appendChild(opt);
    }
    // keep the currently selected if present, otherwise select first
    if (!deviceSelect.value) deviceSelect.selectedIndex = 0;
  } catch (err) {
    log('enumerateDevices() failed:', err);
  }
}

// Open microphone with selected device
async function openMic() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    log('getUserMedia not supported in this browser');
    alert('getUserMedia not supported in this browser.');
    return;
  }

  // constrain by selected deviceId if present
  const deviceId = deviceSelect.value || undefined;
  const constraints = { audio: deviceId ? { deviceId: { exact: deviceId } } : true };
  log('Requesting microphone with constraints:', constraints);

  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    log('getUserMedia -> success, stream tracks:', stream.getAudioTracks().length);
    audioStream = stream;
    setupAudioGraph(stream);
    status('mic open');
    // Re-enumerate devices to get labels (some browsers only show labels after permission)
    await enumerateDevices();
  } catch (err) {
    log('getUserMedia failed:', err);
    status('mic error');
  }
}

// Close microphone and clean up audio graph
function closeMic() {
  if (mediaRecorder && mediaRecorder.state === 'recording') {
    log('Stopping recorder before closing mic');
    stopRecording();
  }

  if (audioStream) {
    for (const t of audioStream.getTracks()) {
      t.stop();
    }
    audioStream = null;
    log('Stopped all microphone tracks');
  }

  teardownAudioGraph();
  status('mic closed');
}

// Set up Web Audio nodes for visualization & gain
function setupAudioGraph(stream) {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      log('Created AudioContext:', audioCtx.sampleRate ? `sampleRate=${audioCtx.sampleRate}` : '(no sample info)');
    }

    // create/replace source node
    if (sourceNode) {
      sourceNode.disconnect();
    }
    sourceNode = audioCtx.createMediaStreamSource(stream);

    // gain node (controlled by UI)
    gainNode = audioCtx.createGain();
    gainNode.gain.value = Number(gainRange.value || 1);

    // analyser node for waveform
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;

    // connect chain: source -> gain -> analyser -> destination (destination is omitted so we don't create echo)
    sourceNode.connect(gainNode);
    gainNode.connect(analyser);
    // NOTE: we intentionally do NOT connect to audioCtx.destination to avoid live playback/feedback

    startVisualization();
  } catch (err) {
    log('setupAudioGraph error:', err);
  }
}

function teardownAudioGraph() {
  stopVisualization();
  if (sourceNode) {
    try { sourceNode.disconnect(); } catch {}
    sourceNode = null;
  }
  if (gainNode) {
    try { gainNode.disconnect(); } catch {}
    gainNode = null;
  }
  if (analyser) {
    try { analyser.disconnect(); } catch {}
    analyser = null;
  }
  // do not close audioCtx here to allow re-use (optional)
}

// Visualization: draw waveform and update level meter
function startVisualization() {
  const canvasCtx = canvas.getContext('2d');
  const bufLen = analyser.fftSize;
  const data = new Uint8Array(bufLen);

  function draw() {
    rafId = requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(data);

    // clear
    canvasCtx.fillStyle = '#000';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    // draw waveform
    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = '#06b6d4'; // teal-ish
    canvasCtx.beginPath();

    const sliceWidth = canvas.width / bufLen;
    let x = 0;
    let sum = 0;
    for (let i = 0; i < bufLen; i++) {
      const v = data[i] / 128.0; // 0..2
      const y = (v * canvas.height) / 2;
      if (i === 0) canvasCtx.moveTo(x, y);
      else canvasCtx.lineTo(x, y);
      x += sliceWidth;

      // accumulate for level meter (RMS approximation)
      const norm = (data[i] - 128) / 128;
      sum += norm * norm;
    }
    canvasCtx.stroke();

    // compute RMS -> level 0..1
    const rms = Math.sqrt(sum / bufLen);
    const level = Math.min(1, rms * 1.4); // scale to be visible
    levelBar.style.width = `${Math.round(level * 100)}%`;
  }

  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(draw);
  log('Visualization started (raf id)', rafId);
}

function stopVisualization() {
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
    log('Visualization stopped');
  }
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  levelBar.style.width = '0%';
}

// Start recording via MediaRecorder
function startRecording() {
  if (!audioStream) {
    log('No audio stream — call Open Mic first');
    alert('Open the microphone first.');
    return;
  }
  if (!window.MediaRecorder) {
    log('MediaRecorder API not supported');
    alert('MediaRecorder API not supported in this browser.');
    return;
  }
  recordedChunks = [];
  try {
    mediaRecorder = new MediaRecorder(audioStream, { mimeType: 'audio/webm;codecs=opus' });
  } catch (err) {
    // fallback without mimeType
    log('MediaRecorder constructor with mimeType failed:', err, '-> Trying without options');
    mediaRecorder = new MediaRecorder(audioStream);
  }
  log('Created MediaRecorder, state:', mediaRecorder.state);

  mediaRecorder.ondataavailable = (ev) => {
    if (ev.data && ev.data.size > 0) {
      recordedChunks.push(ev.data);
      log('ondataavailable: chunk size', ev.data.size, 'chunks total', recordedChunks.length);
    } else {
      log('ondataavailable: empty chunk');
    }
  };

  mediaRecorder.onstart = () => {
    recordStartTs = Date.now();
    startTimer();
    status('recording', true);
    log('mediaRecorder.onstart');
  };

  mediaRecorder.onstop = () => {
    stopTimer();
    status('record stopped', false);
    log('mediaRecorder.onstop. chunks:', recordedChunks.length);
    assembleBlob();
  };

  mediaRecorder.onerror = (ev) => {
    log('mediaRecorder.onerror', ev);
  };

  mediaRecorder.start();
  log('mediaRecorder.start() called. state now:', mediaRecorder.state);
}

// Stop recording (if running)
function stopRecording() {
  if (!mediaRecorder) {
    log('No active mediaRecorder to stop');
    return;
  }
  if (mediaRecorder.state === 'recording') {
    mediaRecorder.stop();
    log('mediaRecorder.stop() called');
  } else {
    log('mediaRecorder not in recording state (state =', mediaRecorder.state, ')');
  }
}

// Assemble recorded chunks into blob and prepare playback/download
function assembleBlob() {
  if (recordedChunks.length === 0) {
    log('No recorded chunks to assemble');
    return;
  }
  const blob = new Blob(recordedChunks, { type: recordedChunks[0].type || 'audio/webm' });
  log('Assembled blob', blob, 'size', blob.size, 'type', blob.type);

  if (lastBlobUrl) {
    URL.revokeObjectURL(lastBlobUrl);
  }
  lastBlobUrl = URL.createObjectURL(blob);
  downloadLink.href = lastBlobUrl;
  downloadLink.download = `recording_${Date.now()}.webm`;
  downloadLink.textContent = `Download (${Math.round(blob.size / 1024)} KB)`;
  btnPlay.disabled = false;
  btnClear.disabled = false;
}

// Play last recorded blob
function playLast() {
  if (!lastBlobUrl) {
    log('No recording available to play');
    alert('No recording available. Record something first.');
    return;
  }
  const audio = new Audio(lastBlobUrl);
  audio.onended = () => log('Playback ended');
  audio.onplay = () => log('Playback started');
  audio.play().catch(err => log('Playback failed:', err));
  log('Playing back last blob:', lastBlobUrl);
}

// Clear last recording
function clearLast() {
  if (lastBlobUrl) {
    URL.revokeObjectURL(lastBlobUrl);
    lastBlobUrl = null;
    downloadLink.href = '#';
    downloadLink.textContent = 'Download';
    btnPlay.disabled = true;
    btnClear.disabled = true;
    recordedChunks = [];
    log('Cleared last recording');
  } else {
    log('No recording to clear');
  }
}

// Timer helpers: show recording duration
function startTimer() {
  timerEl.textContent = 'Recording time: 00:00';
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (!recordStartTs) return;
    const s = Math.floor((Date.now() - recordStartTs) / 1000);
    const mm = String(Math.floor(s / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    timerEl.textContent = `Recording time: ${mm}:${ss}`;
  }, 300);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  timerEl.textContent = 'Recording time: 00:00';
  recordStartTs = null;
}

// UI status
function status(text, isRecording = false) {
  statusEl.innerHTML = isRecording ? `<span class="recording-indicator"></span> ${text}` : text;
}

// Device select change: restart mic with new device if open
deviceSelect.addEventListener('change', async () => {
  log('Device selection changed to', deviceSelect.value);
  // if mic is open, re-open to switch device
  if (audioStream) {
    log('Audio stream is active — reopening with new device');
    closeMic();
    // small delay to ensure tracks are stopped before re-requesting
    setTimeout(() => openMic(), 200);
  }
});

// Gain range changes adjust gainNode if present
gainRange.addEventListener('input', () => {
  const v = Number(gainRange.value);
  if (gainNode) {
    gainNode.gain.value = v;
    log('Gain changed to', v);
  } else {
    log('Gain changed (no audio graph yet):', v);
  }
});

/* ---------- Attach button handlers ---------- */
btnOpen.addEventListener('click', async () => {
  log('Open Mic clicked');
  await openMic();
});

btnClose.addEventListener('click', () => {
  log('Close Mic clicked');
  closeMic();
});

btnStart.addEventListener('click', () => {
  log('Start Recording clicked');
  startRecording();
});

btnStop.addEventListener('click', () => {
  log('Stop Recording clicked');
  stopRecording();
});

btnPlay.addEventListener('click', () => {
  log('Play Last clicked');
  playLast();
});

btnClear.addEventListener('click', () => {
  log('Clear Last clicked');
  clearLast();
});

btnClearLogs.addEventListener('click', () => {
  clearLogs();
});

btnCopyLogs.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(logArea.innerText);
    log('Copied logs to clipboard');
  } catch (err) {
    log('Failed to copy logs:', err);
  }
});

// Download link initial state
downloadLink.href = '#';
btnPlay.disabled = true;
btnClear.disabled = true;

// When the page loads, enumerate devices (labels may be empty until permission granted)
enumerateDevices().catch(err => log('enumerateDevices initial failed:', err));

// Also, when devicechange happens, re-enumerate
navigator.mediaDevices?.addEventListener?.('devicechange', () => {
  log('devicechange event fired — re-enumerating devices');
  enumerateDevices();
});

// Clean up on unload: stop tracks and revoke blob URL
window.addEventListener('beforeunload', () => {
  log('beforeunload — cleaning up');
  closeMic();
  if (lastBlobUrl) URL.revokeObjectURL(lastBlobUrl);
});

/* Notes for learning (console-friendly):
 - navigator.mediaDevices.getUserMedia({ audio: true }) requests mic permission and returns a MediaStream.
 - MediaRecorder records the MediaStream into chunks which you can assemble into a Blob.
 - The Web Audio API (AudioContext, AnalyserNode) lets you visualize the audio in real-time.
 - enumerateDevices() lists available audioinput devices; labels may be blank until permission is granted.
 - Some browsers use different codecs/container (resulting file may be .webm or other).
 - Always stop tracks to release the microphone (track.stop()).
*/