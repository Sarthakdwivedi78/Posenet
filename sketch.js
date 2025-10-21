// sketch.js
// Reverted to the 6 working image-based filters.

let video;
let poseNet;
let pose = null;
let superstarFace, glasses, beard, turbanBeard, jokerFace;
let activeFilter = "posture";
let buttons = [];

// Scaling constants for all filters
const FACE_SCALE = 3.0;
const FACE_ASPECT = 1.3;
const GLASSES_SCALE = 3.1;
const GLASSES_ASPECT = 0.5;
const BEARD_WIDTH_SCALE = 2.8;
const BEARD_ASPECT = 1.0;
const JOKER_SCALE = 3.8;
const JOKER_ASPECT = 1.0;
const TURBAN_SCALE = 1.6;
const TURBAN_ASPECT = 1.25;

function preload() {
  // Make sure these image files are in the 'images' folder!
  superstarFace = loadImage("images/shahrukh.png");
  glasses = loadImage("images/spects.png");
  beard = loadImage("images/santa.jpg");
  
  jokerFace = loadImage("images/joker.jpg");
}

function setup() {
  createCanvas(800, 600);
  
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", gotPoses);

  // UI buttons for the 6 filters
  const baseY = height - 60;
  buttons = [
    { x: width * 0.1,  y: baseY, r: 30, filter: "posture",   label: "🧍" },
    { x: width * 0.26, y: baseY, r: 30, filter: "superstar", label: "⭐" },
    { x: width * 0.42, y: baseY, r: 30, filter: "glasses",   label: "👓" },
    { x: width * 0.58, y: baseY, r: 30, filter: "beard",     label: "🎅" },
    
    { x: width * 0.9,  y: baseY, r: 30, filter: "joker",     label: "🥸" }
  ];
}

function modelReady() {
  console.log("PoseNet ready");
}

function gotPoses(results) {
  if (results && results.length > 0) {
    pose = results[0].pose;
  } else {
    pose = null;
  }
}

function draw() {
  image(video, 0, 0, width, height);

  if (pose) {
    if (activeFilter === "posture")   drawPosture(pose);
    if (activeFilter === "superstar") drawSuperstarFace(pose);
    if (activeFilter === "glasses")   drawGlasses(pose);
    if (activeFilter === "beard")     drawBeard(pose);
    
    if (activeFilter === "joker")     drawJokerFace(pose);
  }

  drawFilterButtons();
}

/* ---------- Helpers ---------- */
function getKP(poseObj, part) {
  if (!poseObj) return null;
  if (poseObj.keypoints) {
    const k = poseObj.keypoints.find(kp => kp.part === part);
    if (k) return { x: k.position.x, y: k.position.y, score: k.score };
  }
  return null;
}

/* ======================================================= */
/* ========== ALL 6 FILTER DRAWING FUNCTIONS ============= */
/* ======================================================= */

function drawPosture(poseObj) {
  if (poseObj.keypoints) {
    for (let k of poseObj.keypoints) {
      if (k.score > 0.2) {
        noStroke();fill(255, 0, 0);ellipse(k.position.x, k.position.y, 8, 8);
        noFill();stroke(255, 0, 0);strokeWeight(2);ellipse(k.position.x, k.position.y, 12, 12);
      }
    }
  }
  stroke(255, 140, 0);strokeWeight(3);
  const links = [["leftShoulder", "rightShoulder"], ["leftShoulder", "leftElbow"],["leftElbow", "leftWrist"], ["rightShoulder", "rightElbow"],["rightElbow", "rightWrist"], ["leftShoulder", "leftHip"],["rightShoulder", "rightHip"], ["leftHip", "rightHip"],["leftHip", "leftKnee"], ["leftKnee", "leftAnkle"],["rightHip", "rightKnee"], ["rightKnee", "rightAnkle"]];
  for (let [a, b] of links) {
    const A = getKP(poseObj, a);const B = getKP(poseObj, b);
    if (A && B && A.score > 0.4 && B.score > 0.4) line(A.x, A.y, B.x, B.y);
  }
}
function drawSuperstarFace(poseObj) {
  const leftEye = getKP(poseObj, "leftEye"), rightEye = getKP(poseObj, "rightEye");
  if (leftEye && rightEye && leftEye.score > 0.15 && rightEye.score > 0.15) {
    const cx = (leftEye.x + rightEye.x) / 2, cy = (leftEye.y + rightEye.y) / 2;
    const eyeDist = dist(leftEye.x, leftEye.y, rightEye.x, rightEye.y);
    const faceW = eyeDist * FACE_SCALE, faceH = faceW * FACE_ASPECT;
    const angle = atan2(leftEye.y - rightEye.y, leftEye.x - rightEye.x);
    push();translate(cx, cy);rotate(angle);imageMode(CENTER);image(superstarFace, 0, 0, faceW, faceH);pop();
  }
}
function drawGlasses(poseObj) {
  const leftEye = getKP(poseObj, "leftEye"), rightEye = getKP(poseObj, "rightEye");
  if (leftEye && rightEye && leftEye.score > 0.15 && rightEye.score > 0.15) {
    const cx = (leftEye.x + rightEye.x) / 2, cy = (leftEye.y + rightEye.y) / 2;
    const eyeDist = dist(leftEye.x, leftEye.y, rightEye.x, rightEye.y);
    const glassesW = eyeDist * GLASSES_SCALE, glassesH = glassesW * GLASSES_ASPECT;
    const angle = atan2(leftEye.y - rightEye.y, leftEye.x - rightEye.x);
    push();translate(cx, cy);rotate(angle);imageMode(CENTER);image(glasses, 0, 0, glassesW, glassesH);pop();
  }
}
function drawBeard(poseObj) {
  const nose = getKP(poseObj, "nose"), leftEye = getKP(poseObj, "leftEye"), rightEye = getKP(poseObj, "rightEye");
  if (nose && leftEye && rightEye && leftEye.score > 0.2 && rightEye.score > 0.2) {
    const eyeDist = dist(leftEye.x, leftEye.y, rightEye.x, rightEye.y);
    const angle = atan2(leftEye.y - rightEye.y, leftEye.x - rightEye.x);
    const beardW = eyeDist * BEARD_WIDTH_SCALE, beardH = beardW * BEARD_ASPECT;
    const verticalOffset = eyeDist * 0.85; 
    push();translate(nose.x, nose.y + verticalOffset);rotate(angle);imageMode(CENTER);image(beard, 0, 0, beardW, beardH);pop();
  }
}
// function drawTurban(poseObj) {
//   const nose = getKP(poseObj, "nose"), leftEar = getKP(poseObj, "leftEar"), rightEar = getKP(poseObj, "rightEar");
//   if (nose && leftEar && rightEar && leftEar.score > 0.2 && rightEar.score > 0.2) {
//     const faceWidth = dist(leftEar.x, leftEar.y, rightEar.x, rightEar.y);
//     const angle = atan2(leftEar.y - rightEar.y, leftEar.x - rightEar.x);
//     const turbanW = faceWidth * TURBAN_SCALE, turbanH = turbanW * TURBAN_ASPECT;
//     const verticalOffset = faceWidth * 0.1;
//     push();translate(nose.x, nose.y + verticalOffset);rotate(angle);imageMode(CENTER);image(turbanBeard, 0, 0, turbanW, turbanH);pop();
//   }
// }
function drawJokerFace(poseObj) {
  const leftEye = getKP(poseObj, "leftEye"), rightEye = getKP(poseObj, "rightEye");
  if (leftEye && rightEye && leftEye.score > 0.15 && rightEye.score > 0.15) {
    const cx = (leftEye.x + rightEye.x) / 2, cy = (leftEye.y + rightEye.y) / 2;
    const eyeDist = dist(leftEye.x, leftEye.y, rightEye.x, rightEye.y);
    const jokerW = eyeDist * JOKER_SCALE, jokerH = jokerW * JOKER_ASPECT;
    const angle = atan2(leftEye.y - rightEye.y, leftEye.x - rightEye.x);
    const verticalOffset = eyeDist * 0.2;
    push();translate(cx, cy + verticalOffset);rotate(angle);imageMode(CENTER);image(jokerFace, 0, 0, jokerW, jokerH);pop();
  }
}

/* ---------- UI Functions ---------- */
function drawFilterButtons() {
  for (let btn of buttons) {
    stroke(0);strokeWeight(2);fill(activeFilter === btn.filter ? "yellow" : "white");ellipse(btn.x, btn.y, btn.r * 2);
    noStroke();fill(0);textAlign(CENTER, CENTER);textSize(28);text(btn.label, btn.x, btn.y);
  }
}
function mousePressed() {
  for (let btn of buttons) {
    const d = dist(mouseX, mouseY, btn.x, btn.y);
    if (d <= btn.r) {activeFilter = btn.filter;return;}
  }
}