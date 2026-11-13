const btnOpenModal = document.getElementById("btnOpenModal");
const modalBlock = document.getElementById("modalBlock");
const closeModal = document.getElementById("closeModal");
const formAnswers = document.getElementById("formAnswers");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const burgerName = "Стандарт";
const burgerImage = "./image/burger.png";

let numberQuestion = 0;

formAnswers.innerHTML = `
  <div class="answers-item d-flex flex-column">
    <input type="radio" id="answerItem1" name="answer" class="d-none">
    <label for="answerItem1" class="d-flex flex-column justify-content-between">
      <img class="answerImg" src="${burgerImage}" alt="${burgerName}">
      <span>${burgerName}</span>
    </label>
  </div>
`;

const renderQuestion = () => {
  switch (numberQuestion) {
    case 0:
      prevBtn.style.display = "none";
      nextBtn.style.display = "inline-block";
      break;

    case questions.length - 1:
      prevBtn.style.display = "inline-block";
      nextBtn.style.display = "none";
      break;

    default:
      prevBtn.style.display = "inline-block";
      nextBtn.style.display = "inline-block";
  }
};

renderQuestion();

nextBtn.onclick = () => {
  numberQuestion++;
  renderQuestion();
};

prevBtn.onclick = () => {
  numberQuestion--;
  renderQuestion();
};

btnOpenModal.addEventListener("click", () => {
  modalBlock.classList.add("d-block");
});

closeModal.addEventListener("click", () => {
  modalBlock.classList.remove("d-block");
});
