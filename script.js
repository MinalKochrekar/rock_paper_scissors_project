
let userscore = 0;
let compscore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const resetBtn = document.querySelector("#reset-btn");

// Fixed: match the actual element IDs (#user-score / #comp-score),
// not classes that don't exist in the markup.
const userscorepara = document.querySelector("#user-score");
const compscorepara = document.querySelector("#comp-score");
const userscorebox = document.querySelector("#user-score-box");
const compscorebox = document.querySelector("#comp-score-box");

const icons = { rock: "✊", paper: "✋", scissors: "✌️" };

const gencompchoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randomidx = Math.floor(Math.random() * 3);
  return options[randomidx];
};

const bump = (el) => {
  el.classList.remove("bump");
  void el.offsetWidth; // restart animation
  el.classList.add("bump");
};

const setMsg = (text, type) => {
  msg.innerText = text;
  msg.classList.remove("win", "lose", "draw");
  msg.classList.add(type);
};

// Fixed: showWinner now receives whether the user won and the
// computer's choice, so it reports the real result.
const showWinner = (userwin, compchoice) => {
  if (userwin) {
    userscore++;
    userscorepara.innerText = userscore;
    bump(userscorebox);
    setMsg(`You win! ${icons[compchoice]} lost to you.`, "win");
  } else {
    compscore++;
    compscorepara.innerText = compscore;
    bump(compscorebox);
    setMsg(`You lose. Computer played ${icons[compchoice]}.`, "lose");
  }
};

const drawgame = (choice) => {
  setMsg(`It's a draw — both played ${icons[choice]}. Go again!`, "draw");
};

const playgame = (userchoice) => {
  const compchoice = gencompchoice();

  if (userchoice === compchoice) {
    drawgame(userchoice);
    return;
  }

  let userwin;
  if (userchoice === "rock") {
    userwin = compchoice === "scissors";
  } else if (userchoice === "paper") {
    userwin = compchoice === "rock";
  } else {
    // scissors
    userwin = compchoice === "paper";
  }

  // Fixed: userwin (and the computer's choice) are now actually passed in,
  // so the message correctly reflects win / lose instead of always "lose".
  showWinner(userwin, compchoice);
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    bump(choice);
    choice.classList.add("flash");
    setTimeout(() => choice.classList.remove("flash"), 500);
    const userchoice = choice.getAttribute("id");
    playgame(userchoice);
  });

  choice.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choice.click();
    }
  });
});

resetBtn.addEventListener("click", () => {
  userscore = 0;
  compscore = 0;
  userscorepara.innerText = 0;
  compscorepara.innerText = 0;
  setMsg("Play your move", "draw");
  msg.classList.remove("draw");
});