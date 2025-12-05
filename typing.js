const words = [
  "Multimedia Creator",
  "Game Developer",
  "Web Developerr",
  "Artist",
  "Story Director",
  "Author"
];

let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;
let speed = 120;

function type() {
  currentWord = words[i];

  if (isDeleting) {
    j--;
  } else {
    j++;
  }

  document.getElementById("typing").textContent = currentWord.substring(0, j);

  if (!isDeleting && j === currentWord.length) {
    isDeleting = true;
    speed = 900; // pause before deleting
  } else if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % words.length;
    speed = 150;
  } else {
    speed = isDeleting ? 50 : 120;
  }

  setTimeout(type, speed);
}

type();
