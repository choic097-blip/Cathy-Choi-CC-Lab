const words = [
  "a multi-content creator",
  "a game developer",
  "a web developer",
  "an artist",
  "a story director",
  "an author"
];

let i = 0;
let j = 0;
let isDeleting = false;
let speed = 120;

function type() {
  const current = words[i];

  if (!isDeleting) {
    j++;
  } else {
    j--;
  }

  document.getElementById("typing").textContent = current.substring(0, j);

  if (!isDeleting && j === current.length) {
    isDeleting = true;
    speed = 900;
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
