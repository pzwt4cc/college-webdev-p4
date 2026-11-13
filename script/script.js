const btnOpenModal = document.getElementById('btnOpenModal');
const modalBlock = document.getElementById('modalBlock');
const closeModal = document.getElementById('closeModal');
const formAnswers = document.getElementById('formAnswers');

const burgerName = 'Стандарт';
const burgerImage = './image/burger.png';

formAnswers.innerHTML = `
  <div class="answers-item d-flex flex-column">
    <input type="radio" id="answerItem1" name="answer" class="d-none">
    <label for="answerItem1" class="d-flex flex-column justify-content-between">
      <img class="answerImg" src="${burgerImage}" alt="${burgerName}">
      <span>${burgerName}</span>
    </label>
  </div>
`;

btnOpenModal.addEventListener('click', () => {
  modalBlock.classList.add('d-block');
});

closeModal.addEventListener('click', () => {
  modalBlock.classList.remove('d-block');
});
