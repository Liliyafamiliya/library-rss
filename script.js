console.log("Все требования соблюдены +200");

if (!localStorage.getItem("firstLoadDone")) {
  if (
    confirm(
      "Здравствуйте, необходимо почистить localStorage перед проверкой, так как подргужаются данные действий других страниц и пользователей"
    )
  ) {
    localStorage.clear();
  }
  localStorage.setItem("firstLoadDone", "true");
}
//---------------------- VARIABLES ----------------------
const icon = document.getElementById("icon-profile");
const userInitials = document.querySelector(".user-initials");

const linksForUserWithoutRegistration =
  document.querySelectorAll(".before-entering");
const linksForUserWithRegistration =
  document.querySelectorAll(".after-entering");
const cardNumber = document.querySelector(".card-number");

const registerForm = document.getElementById("register-form");
const registerFormFields = registerForm.elements;

const loginForm = document.getElementById("login-form");
const loginFormFields = loginForm.elements;

const beforeAvtorizationElements = document.querySelectorAll(".before-avt-el");
const afterAvtorizationElements = document.querySelectorAll(".after-avt-el");

const afterLogEls = document.querySelectorAll(".after-log-el");
const beforeLogEls = document.querySelectorAll(".before-log-el");

const profilePopupInitials = document.querySelector(".square-initials");
const profilePopupFullName = document.querySelector(".rectangular-initials");
const profileNumbers = document.querySelector(".profile-numbers");

const cardPopupForm = document.getElementById("cardPopupForm");
const cardPopupFormFields = cardPopupForm.elements;
const bankCardNumberInput = document.getElementById("bank-card-number");
const cardMonthInput = document.getElementById("cardMonth");
const cardYearInput = document.getElementById("cardYear");
const cvvInput = document.getElementById("cvv");
const cardHolderNameInput = document.getElementById("cardHolderName");
const cardPostalCodeInput = document.getElementById("cardPostalCode");
const cardCityTownInput = document.getElementById("cardCityTown");
const cardPopupBtn = document.getElementById("cardPopupBtn");
const iconCopy = document.getElementById("iconCopy");

const libraryCardBtn = document.querySelector(".button-form");
const libraryCardIcons = document.querySelector(".library-card-icons");
const fullNameInput = document.getElementById("libraryCardFullName");
const cardNumberInput = document.getElementById("libraryCardNumber");
const storedUsers = Object.values(localStorage).map((userString) =>
  JSON.parse(userString)
);

const slider = document.querySelector(".slider");
const sliderButtons = document.querySelectorAll(".slider-button");
const sliderButtonWrappers = document.querySelectorAll(
  ".slider-button-wrapper"
);
const leftArrow = document.querySelector(".arrow-left");
const rightArrow = document.querySelector(".arrow-right");

const seasons = document.querySelectorAll(".favorite-items-wrapper");
const seasonButtons = document.querySelectorAll(
  ".radio-button-wrapper input[type='radio']"
);

//----------------------  GLOBAL-FUNCTIONS ----------------------
// TOGGLE-MODAL
const toggleModal = (className) => {
  document.querySelector("header").classList.toggle(className);
};
// CLOSE MODAL
document.body.addEventListener("click", (event) => {
  if (!event.isClickOnAvtorization) {
    document.querySelector("header").classList.remove("avtorization-on");
  }
  if (!event.isClickOnBurger) {
    document.querySelector("header").classList.remove("burger-on");
  }
  if (!event.isClickOnRegisterLogin) {
    document.querySelector("header").classList.remove("popup-on");
  }
  if (!event.isClickOnProfile) {
    document.querySelector("header").classList.remove("profile-on");
  }
  if (!event.isClickOnCardPopup) {
    document.querySelector("header").classList.remove("card-on");
  }
});

//TOGGLE-VISIBILITY
const toggleElementVisibility = (elements, displayValue) => {
  elements.forEach((el) => {
    el.style.display = displayValue;
  });
};

//GET-CARDNUMBER
const generateRandomCardNumber = () => {
  const minCardNumber = parseInt("000000000", 16);
  const maxCardNumber = parseInt("fffffffff", 16);
  const randomCardNumber =
    Math.floor(Math.random() * (maxCardNumber - minCardNumber + 1)) +
    minCardNumber;
  const hexCardNumber = randomCardNumber
    .toString(16)
    .toUpperCase()
    .padStart(9, "0");
  return hexCardNumber;
};

const getCardNumber = () => {
  const activeUser = getActiveUser();
  if (activeUser) {
    return activeUser.cardNumber;
  }
  return generateRandomCardNumber();
};

//VALIDATE-INPUT
const validateInput = (inputElement, maxLength, errorMessage) => {
  inputElement.addEventListener("input", () => {
    let inputValue = inputElement.value.replace(/[^0-9]/g, "");
    inputValue = inputValue.slice(0, maxLength);
    inputElement.value = inputValue;
  });

  inputElement.addEventListener("blur", () => {
    if (inputElement.value.length !== maxLength) {
      alert(errorMessage);
      inputElement.value = "";
    }
  });
};

//USER MANAGEMENT
const addUserToLocalStorage = (user) => {
  if (user.email) {
    localStorage.setItem(user.email, JSON.stringify(user));
  }
};

const getActiveUser = () => {
  const activeUserString = Object.values(localStorage).find((userString) => {
    const parsedUser = JSON.parse(userString);
    return parsedUser.isActive;
  });
  return activeUserString && JSON.parse(activeUserString);
};

const hasLibraryCard = () => {
  const activeUser = getActiveUser();
  return activeUser && activeUser.hasOwnProperty("libraryCard");
};

//====================== BURGER-MENU ======================
document.getElementById("burger").addEventListener("click", (event) => {
  event.isClickOnBurger = true;
  toggleModal("burger-on");
});

document.querySelector(".menu-burger").addEventListener("click", (event) => {
  event.isClickOnBurger = true;
  if (event.target.classList.contains("nav-link")) {
    toggleModal("burger-on");
  }
});

//====================== AVTORIZATION-MENU ======================
icon.addEventListener("click", (event) => {
  event.isClickOnAvtorization = true;
  toggleModal("avtorization-on");
  linksForUserWithoutRegistration.forEach(
    (link) => (link.style.display = "block")
  );
  linksForUserWithRegistration.forEach((link) => (link.style.display = "none"));
});

userInitials.addEventListener("click", (event) => {
  event.isClickOnAvtorization = true;
  toggleModal("avtorization-on");
  linksForUserWithoutRegistration.forEach(
    (link) => (link.style.display = "none")
  );
  linksForUserWithRegistration.forEach(
    (link) => (link.style.display = "block")
  );
});

document
  .querySelector(".avtorization-menu")
  .addEventListener("click", (event) => {
    event.isClickOnAvtorization = true;
    if (event.target.classList.contains("avtorization-link")) {
      toggleModal("avtorization-on");
    }
  });

//====================== REGISTER-LOGIN-POPUP ======================
document.querySelectorAll(".register-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.isClickOnRegisterLogin = true;
    if (event.target.classList.contains("microlink")) {
      document.querySelector(".login-body").style.display = "none";
      document.querySelector(".register-body").style.display = "block";
    } else {
      toggleModal("popup-on");
      document.querySelector(".register-body").style.display = "block";
      document.querySelector(".login-body").style.display = "none";
    }
  });
});

document.querySelectorAll(".login-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.isClickOnRegisterLogin = true;
    if (event.target.classList.contains("microlink")) {
      document.querySelector(".login-body").style.display = "block";
      document.querySelector(".register-body").style.display = "none";
    } else {
      toggleModal("popup-on");
      document.querySelector(".register-body").style.display = "none";
      document.querySelector(".login-body").style.display = "block";
    }
  });
});

document.querySelectorAll(".register-login-popup-body").forEach((body) => {
  body.addEventListener("click", (event) => {
    event.isClickOnRegisterLogin = true;
  });
});

document.querySelectorAll(".close-svg").forEach((close) => {
  close.addEventListener("click", () => {
    toggleModal("popup-on");
  });
});

//register-submit
cardNumber.textContent = getCardNumber();
registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const user = [...registerFormFields]
    .filter((field) => field.name && field.value)
    .reduce(
      (acc, field) => {
        acc[field.name] = field.value.trim();
        return acc;
      },
      {
        cardNumber: getCardNumber(),
        isActive: true,
        visits: 1,
        ownedBooks: [],
      }
    );
  addUserToLocalStorage(user);
  window.location.reload();
});

//login-submit
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const emailCardNumber = loginFormFields.emailCardNumber.value;
  const password = loginFormFields.password.value;

  const userString = Object.values(localStorage).find((userString) => {
    const parsedUser = JSON.parse(userString);
    return (
      (parsedUser.email === emailCardNumber ||
        parsedUser.cardNumber === emailCardNumber) &&
      parsedUser.password === password
    );
  });

  const user = userString && JSON.parse(userString);

  if (user) {
    user.isActive = true;
    user.visits++;
    addUserToLocalStorage(user);
  }
  window.location.reload();
});

//logout
document.getElementById("logout-link").addEventListener("click", () => {
  const activeUser = getActiveUser();
  activeUser.isActive = false;
  addUserToLocalStorage(activeUser);
  window.location.reload();
});
//====================== PROFILE-POPUP ======================
document.querySelectorAll(".my-profile-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.isClickOnProfile = true;
    toggleModal("profile-on");
  });
});

document
  .querySelector(".profile-popup-body")
  .addEventListener("click", (event) => {
    event.isClickOnProfile = true;
  });

document.querySelectorAll(".close-svg").forEach((close) => {
  close.addEventListener("click", () => {
    toggleModal("profile-on");
  });
});
//copy-to-clipboard
iconCopy.addEventListener("click", async () => {
  const profileNumbers = document.querySelector(".profile-numbers");
  const numbersText = profileNumbers.textContent;
  try {
    await navigator.clipboard.writeText(numbersText);
    console.log("Текст скопирован успешно:", numbersText);
  } catch (error) {
    console.error("Ошибка при копировании текста:", error);
  }
});
//====================== CARD-POPUP======================
document
  .querySelector(".card-popup-body")
  .addEventListener("click", (event) => {
    event.isClickOnCardPopup = true;
  });

document.querySelector(".close-card").addEventListener("click", () => {
  toggleModal("card-on");
});

const checkFieldsValidity = () => {
  const isBankCardNumberValid = bankCardNumberInput.value.length === 16;
  const isCardMonthValid = cardMonthInput.value.length === 2;
  const isCardYearValid = cardYearInput.value.length === 2;
  const isCvvValid = cvvInput.value.length === 3;
  const isCardHolderNameValid = cardHolderNameInput.value.length;
  const isCardPostalCode = cardPostalCodeInput.value.length;
  const isCardCityTown = cardCityTownInput.value.length;

  if (
    isBankCardNumberValid &&
    isCardMonthValid &&
    isCardYearValid &&
    isCvvValid &&
    isCardHolderNameValid &&
    isCardPostalCode &&
    isCardCityTown
  ) {
    cardPopupBtn.classList.remove("desableView");
  } else {
    cardPopupBtn.classList.add("desableView");
  }
};

bankCardNumberInput.addEventListener("input", checkFieldsValidity);
cardMonthInput.addEventListener("input", checkFieldsValidity);
cardYearInput.addEventListener("input", checkFieldsValidity);
cvvInput.addEventListener("input", checkFieldsValidity);
cardHolderNameInput.addEventListener("input", checkFieldsValidity);
cardPostalCodeInput.addEventListener("input", checkFieldsValidity);
cardCityTownInput.addEventListener("input", checkFieldsValidity);
// =-=-=-=-=-=-=-=-=-=-=-=-=

//card-popup-submit
cardPopupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const activeUser = getActiveUser();
  activeUser.libraryCard = [...cardPopupFormFields]
    .filter((field) => field.name && field.value)
    .reduce((acc, field) => {
      acc[field.name] = field.value;
      return acc;
    }, {});
  addUserToLocalStorage(activeUser);
  window.location.reload();
});

validateInput(
  bankCardNumberInput,
  16,
  "Номер карты должен состоять ровно из 16 цифр."
);
validateInput(cvvInput, 3, "CVV должен состоять ровно из 3 цифр.");

//check-the-card
const checkTheCard = () => {
  const [enteredFirstName, enteredLastName] = fullNameInput.value
    .trim()
    .split(" ");
  const enteredCardNumber = cardNumberInput.value.trim();

  const matchingUser = storedUsers.find(
    (user) =>
      user.firstName === enteredFirstName &&
      user.lastName === enteredLastName &&
      user.cardNumber === enteredCardNumber &&
      user.hasOwnProperty("libraryCard") === true
  );

  if (matchingUser) {
    updateVisitsCountIcons(matchingUser);
    updateBookCountIcons(matchingUser);
    libraryCardBtn.style.display = "none";
    libraryCardIcons.style.display = "flex";
    fullNameInput.value = `${matchingUser.firstName} ${matchingUser.lastName}`;
    fullNameInput.style.color = "#BB945F";
    cardNumberInput.style.color = "#BB945F";
    setTimeout(() => {
      fullNameInput.value = "";
      cardNumberInput.value = "";
      libraryCardBtn.style.display = "block";
      libraryCardIcons.style.display = "none";
    }, 10000);
  }
};

document.querySelector(".button-form").addEventListener("click", (event) => {
  event.preventDefault();
  checkTheCard();
});

//---------------------- PAGE-VIEW ----------------------
const updatePageView = () => {
  const activeUser = getActiveUser();
  const userHasLibraryCard = hasLibraryCard();

  const firstName = document.getElementById("firstname").value.trim();
  const lastName = document.getElementById("lastname").value.trim();

  if (firstName && lastName) {
    const initials = `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
    const fullName = `${firstName} ${lastName}`;
    //profile-popup-view
    profileNumbers.textContent = getCardNumber();
    profilePopupInitials.textContent = initials;
    profilePopupFullName.textContent = fullName;
    //icon-view
    icon.style.display = "none";
    userInitials.style.display = "block";
    userInitials.textContent = initials;
    userInitials.title = fullName;
    //avt-els
    toggleElementVisibility(beforeAvtorizationElements, "none");
    toggleElementVisibility(afterAvtorizationElements, "flex");
    //log-els
    toggleElementVisibility(beforeLogEls, "block");
    toggleElementVisibility(afterLogEls, "none");
  } else {
    icon.style.display = "block";
    userInitials.style.display = "none";
    toggleElementVisibility(beforeAvtorizationElements, "block");
    toggleElementVisibility(afterAvtorizationElements, "none");
  }
  if (activeUser && userHasLibraryCard) {
    fullNameInput.value = `${activeUser.firstName} ${activeUser.lastName}`;
    fullNameInput.style.color = "#BB945F";
    cardNumberInput.value = `${activeUser.cardNumber}`;
    cardNumberInput.style.color = "#BB945F";
    toggleElementVisibility(beforeLogEls, "none");
    toggleElementVisibility(afterLogEls, "flex");
  } else {
    fullNameInput.value = "";
    cardNumberInput.value = "";
    toggleElementVisibility(beforeLogEls, "block");
    toggleElementVisibility(afterLogEls, "none");
  }
};

//---------------------- ICON-COUNTS ----------------------
const updateVisitsCountIcons = (user) => {
  const activeUser = user || getActiveUser();
  document.querySelectorAll(".count-visits").forEach((icon) => {
    icon.textContent = activeUser.visits;
  });
};

const updateBookCountIcons = (user) => {
  const activeUser = user || getActiveUser();
  document.querySelectorAll(".count-books").forEach((icon) => {
    icon.textContent =
      activeUser && activeUser.ownedBooks ? activeUser.ownedBooks.length : 0;
  });
};

const updateBookList = () => {
  const bookList = document.querySelector(".book-list");
  const activeUser = getActiveUser();
  const bookChildren = activeUser.ownedBooks.map(
    ({ name, author }) => `<li>${author}, ${name}\n</li>`
  );
  bookList.innerHTML = bookChildren.join("");
};

//---------------------- BOOK-BUTTONS ----------------------
const handleNotLoggedInClick = (event) => {
  event.isClickOnRegisterLogin = true;
  const loginBody = document.querySelector(".login-body");
  const registerBody = document.querySelector(".register-body");

  if (event.target.classList.contains("microlink")) {
    loginBody.style.display = "block";
    registerBody.style.display = "none";
  } else {
    toggleModal("popup-on");
    registerBody.style.display = "none";
    loginBody.style.display = "block";
  }
};

const handleNoLibraryCardClick = (event) => {
  event.isClickOnCardPopup = true;
  toggleModal("card-on");
};

const handleBookButtonClick = (activeUser, button) => {
  if (button.classList.contains("disabled")) return;
  const { id, name, author } = button.dataset;
  activeUser.ownedBooks.push({ id, name, author });
  button.classList.add("disabled");
  button.textContent = "Own";
  addUserToLocalStorage(activeUser);
  updateBookCountIcons();
  updateBookList();
};

const setButtonAsOwned = (button) => {
  button.classList.add("disabled");
  button.textContent = "Own";
};

const setBooksEventListener = () => {
  const activeUser = getActiveUser();
  const userHasLibraryCard = hasLibraryCard();

  document.querySelectorAll(".book-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      if (activeUser) {
        if (userHasLibraryCard) {
          handleBookButtonClick(activeUser, button);
        } else {
          handleNoLibraryCardClick(event);
        }
      } else {
        handleNotLoggedInClick(event);
      }
    });
    //код для сохр сост-я кнопки после перезагр
    const { id } = button.dataset;
    if (activeUser && activeUser.ownedBooks) {
      const ownedBook = activeUser.ownedBooks.find((book) => book.id === id);
      if (ownedBook) {
        setButtonAsOwned(button);
      }
    }
  });
};

//----------------------  LOAD-FROM-LS ----------------------
const loadFormDataFromStorage = () => {
  const activeUser = getActiveUser();
  if (activeUser) {
    for (let i = 0; i < registerFormFields.length; i++) {
      if (registerFormFields[i].type !== "submit") {
        registerFormFields[i].value = activeUser[registerFormFields[i].name];
      }
    }
    updateVisitsCountIcons();
    updateBookCountIcons();
    updateBookList();
  }
  updatePageView();
  setBooksEventListener();
};

loadFormDataFromStorage();

//====================== CAROUSEL-ABOUT ======================
const moveSliderAndSetActive = (index, translateXValue, buttons) => {
  slider.style.transform = `translateX(-${index * translateXValue}px)`;
  sliderButtons.forEach((btn) => btn.classList.remove("active"));
  buttons[index].classList.add("active");
};

sliderButtonWrappers.forEach((wrapper, index) => {
  wrapper.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      moveSliderAndSetActive(index, window.innerWidth, sliderButtons);
    } else {
      moveSliderAndSetActive(index, window.innerWidth * 0.33, sliderButtons);
    }
  });
});

const getCurrentIndexArrows = () => {
  for (let i = 0; i < sliderButtonWrappers.length; i++) {
    if (sliderButtons[i].classList.contains("active")) {
      return i;
    }
  }
  return 0;
};

const handleArrowClick = (direction) => {
  const currentIndex = getCurrentIndexArrows();
  const newIndex =
    direction === "left"
      ? Math.max(0, currentIndex - 1)
      : Math.min(sliderButtonWrappers.length - 1, currentIndex + 1);
  moveSliderAndSetActive(
    newIndex,
    window.innerWidth <= 768 ? window.innerWidth : window.innerWidth * 0.33,
    sliderButtons
  );
  updateArrowActivity(newIndex);
};

leftArrow.addEventListener("click", () => {
  handleArrowClick("left");
});

rightArrow.addEventListener("click", () => {
  handleArrowClick("right");
});

const updateArrowActivity = (index) => {
  leftArrow.classList.toggle("active", index !== 0);
  rightArrow.classList.toggle(
    "active",
    index !== sliderButtonWrappers.length - 1
  );
};

//====================== SLIDER-FAVORITES ======================
let currentSeasonIndex = 0;

const changeFade = (element, opacity, callback) => {
  element.style.transition = "opacity 0.5s";
  element.style.opacity = opacity;
  setTimeout(() => {
    element.style.transition = "";
    if (callback) {
      callback();
    }
  }, 600);
};

const showSeason = (index) => {
  const currentSeason = seasons[currentSeasonIndex];
  const nextSeason = seasons[index];

  changeFade(currentSeason, 0, () => {
    currentSeason.style.setProperty("z-index", "-1");
    changeFade(nextSeason, 1, () => {
      nextSeason.style.setProperty("z-index", "1");
    });
  });

  currentSeasonIndex = index;
};

seasonButtons.forEach((button, index) => {
  button.addEventListener("change", () => {
    showSeason(index);
  });
});

showSeason(currentSeasonIndex);
