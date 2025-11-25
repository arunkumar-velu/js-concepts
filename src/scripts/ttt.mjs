import "../ttt.css";

function init() {
  let currentPlayer = "X";
  let results = ["", "", "", "", "", "", "", "", ""];
  const winningRes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const container = document.querySelector(".container");
  const item = document.querySelectorAll(".container .item");
  const message = document.querySelector(".message");
  const reset = document.querySelector("button");
  message.innerText = `${currentPlayer} its your turn`;
  let isGameOver = false;
  reset.addEventListener("click", () => {
    results = ["", "", "", "", "", "", "", "", ""];
    isGameOver = false;
    currentPlayer = "X";
    item.forEach((e) => {
      e.innerText = "";
    });
  });
  const checkStatus = () => {
    for (const ele of winningRes) {
      if (
        results[ele[0]] !== "" &&
        results[ele[1]] != "" &&
        results[ele[2]] != "" &&
        results[ele[0]] == results[ele[1]] &&
        results[ele[1]] == results[ele[2]]
      ) {
        return true;
      }
    }
    return false;
  };

  container.addEventListener("click", (e) => {
    if (isGameOver) {
      return;
    }
    const currentItem = e.target.dataset.item;
    if (currentItem && !e.target.innerText) {
      e.target.innerText = currentPlayer;
      results[currentItem - 1] = currentPlayer;
      isGameOver = checkStatus();
      if (!results.includes("")) {
        message.innerText = `Match Draw`;
      } else if (!isGameOver) {
        currentPlayer = currentPlayer == "X" ? "O" : "X";
        message.innerText = `${currentPlayer} its your turn`;
      } else {
        message.innerText = `${currentPlayer} is the winner`;
      }
    }
  });
}
init();
