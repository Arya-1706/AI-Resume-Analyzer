const form = document.querySelector("form");
const loader = document.getElementById("loader");

if (form) {
  form.addEventListener("submit", () => {
    loader.classList.remove("hidden");
  });
}

document.addEventListener("DOMContentLoaded", () => {
    const fill = document.querySelector(".progress-fill");
    const value = document.getElementById("score-value");

    if (!fill || !value) return;

    const target = parseInt(fill.dataset.score);
    let current = 0;

    const interval = setInterval(() => {
        if (current >= target) {
            clearInterval(interval);
            current = target;
        }
        fill.style.width = current + "%";
        value.textContent = current + "%";
        current++;
    }, 15);
});

const uploadBox = document.getElementById("uploadBox");
const resumeInput = document.getElementById("resumeInput");
const fileName = document.getElementById("fileName");

// Open file picker on click
uploadBox.addEventListener("click", () => {
  resumeInput.click();
});

// Show filename after selection
resumeInput.addEventListener("change", () => {
  if (resumeInput.files.length > 0) {
    fileName.textContent = "✔ " + resumeInput.files[0].name;
    fileName.classList.remove("hidden");
  }
});

// Drag & drop support
uploadBox.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadBox.style.borderColor = "#00ffcc";
});

uploadBox.addEventListener("dragleave", () => {
  uploadBox.style.borderColor = "#5f6cff";
});

uploadBox.addEventListener("drop", (e) => {
  e.preventDefault();
  resumeInput.files = e.dataTransfer.files;
  fileName.textContent = "✔ " + e.dataTransfer.files[0].name;
  fileName.classList.remove("hidden");
  uploadBox.style.borderColor = "#5f6cff";
});

// script.js
window.addEventListener("load", () => {
  const bar = document.querySelector(".progress-fill");
  if (!bar) return;

  const score = bar.dataset.score;
  setTimeout(() => {
    bar.style.width = score + "%";
  }, 300);
});

const scoreEl = document.getElementById("score-value");
if (scoreEl) {
  const target = parseInt(scoreEl.parentElement.dataset.score);
  let current = 0;

  const interval = setInterval(() => {
    current++;
    scoreEl.textContent = current + "%";
    if (current >= target) clearInterval(interval);
  }, 15);
}

const messages = [
  "Parsing resume...",
  "Analyzing skills...",
  "Comparing with job description...",
  "Calculating match score..."
];

let i = 0;
setInterval(() => {
  loader.textContent = messages[i++ % messages.length];
}, 1200);
