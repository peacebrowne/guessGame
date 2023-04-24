const findEle = (ele) => {
  return document.querySelector(`${ele}`);
};

const toggleEle = (ele, clas) => {
  ele.classList.toggle(clas);
};

const generateRandomNumber = (n) => {
  return Math.floor(Math.random() * n);
};

const main = findEle("main");
const summary = findEle("summary");
const statistics = findEle(".status");
const lives = findEle(".lives");

const numbers = [...Array(101).keys()];
const backup = [];
const GENERAL_RANDOM_NUMBER = generateRandomNumber(100);

const audioBox = [
  "./audio/apostle.m4a",
  "./audio/basic1plus1.m4a",
  "./audio/chants-2.m4a",
  "./audio/chants.m4a",
  "./audio/cutting-grass.m4a",
  "./audio/dinner-man.m4a",
  "./audio/funke.m4a",
  "./audio/jesus-is-lord.m4a",
  "./audio/jezuz.m4a",
  "./audio/macdonalds.m4a",
  "./audio/no-future.m4a",
  "./audio/persecuted.m4a",
  "./audio/pregnancy.m4a",
  "./audio/think-about-your-life.m4a",
  "./audio/you-are-a-failure.m4a",
  "./audio/you-can-never-make-it-1.m4a",
  "./audio/you-can-never-make-it-full.mp3",
];

const selected_audio = () => {
  const rn = generateRandomNumber(audioBox.length);
  const audio = new Audio(audioBox[rn]);
  audio.play();
};

const display = () => {
  const section = document.createElement("section");

  for (let i = 0; i < 100; i++) {
    const rn = generateRandomNumber(numbers.length);
    const button = `<button class="number" data-value="${numbers[rn]}">${numbers[rn]}</button>`;
    section.innerHTML += button;
    backup.push(numbers[rn]);
    numbers.splice(rn, 1);
  }

  main.appendChild(section);
};
display();

const start = document.querySelector(".start");
start.addEventListener("click", (ev) => {
  const targetEl = ev.target;
  if (targetEl.dataset.start === "false") {
    targetEl.textContent = "restart";
    targetEl.dataset.start = true;
    toggleEle(summary, "hidden");
    toggleEle(main, "hidden");
    chances(7);
  } else restart();
});

const restart = () => {
  numbers = backup;
  backup = [];
  main.innerHTML = "";
  statistics.innerHTML = "";
  lives.innerHTML = 7;
  display();
  main.addEventListener("click", check);
};

const check = (ev) => {
  const btn = ev.target;
  if (btn.className.includes("number")) {
    const value = +btn.dataset.value;
    value === GENERAL_RANDOM_NUMBER ? correct(btn) : wrong(btn, value);
  }
};

const correct = (btn) => {
  btn.classList.toggle("correct");
  main.removeEventListener("click", check);
};

const wrong = (btn, val) => {
  if (btn.className.includes("wrong")) return;
  btn.classList.toggle("wrong");
  selected_audio();
  chances();
  checkStatus(val);
};

const checkStatus = (val) => {
  if (val > GENERAL_RANDOM_NUMBER) statistics.innerHTML = "Too Hign";
  else if (val < GENERAL_RANDOM_NUMBER) statistics.innerHTML = "Too Low";
};

main.addEventListener("click", check);

const chances = (n) => {
  isNaN(+lives.innerText)
    ? (lives.innerText = n)
    : (lives.innerText = +lives.innerText - 1);
  if (+lives.innerText <= 0) {
    main.removeEventListener("click", check);
    toggleEle(main, "game-over");
    gameOver(GENERAL_RANDOM_NUMBER);
  }
};

const gameOver = (n) => {
  setTimeout(() => {
    const section = findEle("section");
    const element = Array.from(section.children).find(
      (ele) => +ele.dataset.value === n
    );
    element.classList.add("correct");
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 3000);
};

const timer = () => {};
