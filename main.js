document.querySelector(".start-screen span").onclick = () => {
  let name = prompt("What's your name ?");

  if (!name.replace(/\s/g, "").length) {
    document.querySelector(".info .name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".info .name span").innerHTML = name;
  }

  document.querySelector(".start-screen").remove();
  document.getElementById("song").play();
  startGame();
};

let tries = document.querySelector(".info .tries span");
let cardsContainer = document.querySelector(".cards");
let cards = Array.from(cardsContainer.children);

// Array contains numbers from 0 to cards.length
let orderRange = [...Array(cards.length).keys()];

function startGame() {
  tries.innerHTML = 0;

  shuffel(orderRange);

  cards.forEach((card, i) => {
    card.style.order = orderRange[i];
    card.classList.add("flipped");
  });
  setTimeout(() => {
    cards.forEach((card) => card.classList.remove("flipped"));
  }, 1500);
}

cards.forEach((card) => card.addEventListener("click", () => flipCard(card)));

function flipCard(card) {
  card.classList.add("flipped");

  let flippedCards = cards.filter((card) => card.classList.contains("flipped"));
  if (flippedCards.length === 2) {
    noClicking();

    isMatch(flippedCards[0], flippedCards[1]);
  }
}

function noClicking() {
  cardsContainer.classList.add("no-click");
  setTimeout(() => {
    cardsContainer.classList.remove("no-click");
  }, 1000);
}

function isMatch(first, second) {
  if (first.dataset.name !== second.dataset.name) {
    tries.innerHTML++;

    setTimeout(() => {
      first.classList.remove("flipped");
      second.classList.remove("flipped");
    }, 1000);

    document.getElementById("fail").play();
  } else {
    first.classList.remove("flipped");
    second.classList.remove("flipped");
    first.classList.add("match");
    second.classList.add("match");

    document.getElementById("success").play();
  }
}

function shuffel(arr) {
  let current = 0,
    temp,
    rand;

  while (current < arr.length) {
    rand = Math.floor(Math.random() * arr.length);
    temp = arr[current];
    arr[current] = arr[rand];
    arr[rand] = temp;
    current++;
  }
}

let restart = document.querySelector(".buttons .restart");

restart.addEventListener("click", () => {
  cards.forEach((card) => {
    card.classList.remove("match");
    card.classList.remove("flipped");
  });

  setTimeout(() => {
    startGame();
  }, 800);
});

let changePlayer = document.querySelector(".buttons .change");
changePlayer.onclick = () => location.reload();
