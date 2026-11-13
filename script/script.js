document.addEventListener("DOMContentLoaded", () => {
  const btnOpenModal = document.querySelector("#btnOpenModal");
  const modalBlock = document.querySelector("#modalBlock");
  const closeModal = document.querySelector("#closeModal");
  const questionTitle = document.querySelector("#question");
  const formAnswers = document.querySelector("#formAnswers");
  const nextButton = document.querySelector("#next");
  const prevButton = document.querySelector("#prev");
  const sendButton = document.querySelector("#send");

  const firebaseConfig = {
    databaseURL:
      "https://quiz-8cb90-default-rtdb.europe-west1.firebasedatabase.app/",
  };

  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();

  const getData = () => {
    formAnswers.textContent = "LOAD";
    questionTitle.textContent = "";
    nextButton.classList.add("d-none");
    prevButton.classList.add("d-none");
    sendButton.classList.add("d-none");

    setTimeout(() => {
      database
        .ref()
        .child("questions")
        .once("value")
        .then((snapshot) => {
          if (snapshot.exists() && snapshot.val()) {
            playTest(snapshot.val());
          } else {
            fetch("./questions.json")
              .then((res) => res.json())
              .then((obj) => playTest(obj.questions));
          }
        })
        .catch((err) => {
          console.error(err);
          fetch("./questions.json")
            .then((res) => res.json())
            .then((obj) => playTest(obj.questions))
            .catch(() => {
              formAnswers.textContent = "Помилка завантаження даних!";
            });
        });
    }, 500);
  };

  btnOpenModal.addEventListener("click", () => {
    modalBlock.classList.add("d-block");
    getData();
  });

  closeModal.addEventListener("click", () => {
    modalBlock.classList.remove("d-block");
  });

  modalBlock.addEventListener("click", (event) => {
    if (event.target === modalBlock) {
      modalBlock.classList.remove("d-block");
    }
  });

  const playTest = (questions) => {
    const finalAnswers = [];
    let numberQuestion = 0;

    const renderAnswers = (index) => {
      questions[index].answers.forEach((answer) => {
        const answerItem = document.createElement("div");
        answerItem.classList.add(
          "answers-item",
          "d-flex",
          "justify-content-center",
        );
        answerItem.innerHTML = `
          <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
          <label for="${answer.title}" class="d-flex flex-column justify-content-between">
            <img class="answerImg" src="${answer.url}" alt="${answer.title}">
            <span>${answer.title}</span>
          </label>
        `;
        formAnswers.appendChild(answerItem);
      });
    };

    const renderQuestions = (indexQuestion) => {
      formAnswers.innerHTML = "";

      if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
        questionTitle.textContent = `${questions[indexQuestion].question}`;
        renderAnswers(indexQuestion);
        nextButton.classList.remove("d-none");
        prevButton.classList.remove("d-none");
        sendButton.classList.add("d-none");
      }

      if (numberQuestion === 0) {
        prevButton.classList.add("d-none");
      }

      if (numberQuestion === questions.length) {
        questionTitle.textContent = "";
        nextButton.classList.add("d-none");
        prevButton.classList.add("d-none");
        sendButton.classList.remove("d-none");
        formAnswers.innerHTML = `
          <div class="form-group w-100">
            <label for="numberPhone" class="d-block mb-2">Номер телефону:</label>
            <input type="phone" class="form-control" id="numberPhone" placeholder="+380...">
          </div>
        `;
      }

      if (numberQuestion === questions.length + 1) {
        formAnswers.textContent = "Дякуємо за пройдений тест!";
        sendButton.classList.add("d-none");
        setTimeout(() => {
          modalBlock.classList.remove("d-block");
        }, 2000);
      }
    };

    renderQuestions(numberQuestion);

    const checkAnswer = () => {
      const obj = {};
      const inputs = [...formAnswers.elements].filter(
        (input) => input.checked || input.id === "numberPhone",
      );

      inputs.forEach((input, index) => {
        if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
          obj[`${index}_${questions[numberQuestion].question}`] = input.value;
        }
        if (numberQuestion === questions.length) {
          obj["Номер телефону"] = input.value;
        }
      });

      finalAnswers.push(obj);
    };

    nextButton.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
    };

    prevButton.onclick = () => {
      numberQuestion--;
      renderQuestions(numberQuestion);
    };

    sendButton.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
      database.ref("contacts").push(finalAnswers);
    };
  };
});
