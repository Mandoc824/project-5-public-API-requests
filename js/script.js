"use strict";
//helper functions

//used to get data from api
async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    document.querySelector("#gallery").innerHTML = `
    <h1>There was an error :(. Error: ${error}</h1>
    `;
  }
}

//used for creating elements
function createElement(ele, attr, value) {
  const element = document.createElement(ele);
  element.setAttribute(attr, value);
  return element;
}

//use to set attribute of an element
function setAttr(ele, attr, value) {
  ele.setAttribute(attr, value);
}

//stores userdata and applies the gallery and modals functions
const userData = getData("https://randomuser.me/api/?results=12")
  .then((data) => {
    generateGallery(data.results);
    createModals(data.results);
  })
  .catch(
    (error) =>
      (document.querySelector(
        "#gallery"
      ).innerHTML = `<h1>There was an Error : ${error}</h1>`)
  );

//Insert Functions

//this function will create a card for each person in the data argument

function generateGallery(data) {
  const galleryDiv = document.getElementById("gallery");
  data.forEach((person) => {
    const cardDiv = createElement("div", "class", "card");
    const cardImgDiv = createElement("div", "class", "card-img-container");
    const img = createElement("img", "class", "card-img");
    setAttr(img, "alt", "profile picture");
    setAttr(img, "src", person.picture.thumbnail);
    const cardInfoDiv = createElement("div", "class", "card-info-container");
    const nameH3 = createElement("h3", "class", "card-name");
    nameH3.textContent = `${person.name.first} ${person.name.last}`;
    nameH3.classList.add("cap");
    nameH3.setAttribute("id", "name");
    const emailP = createElement("p", "class", "card-text");
    emailP.textContent = `${person.email}`;
    const cityStateP = createElement("p", "class", "card-text");
    cityStateP.classList.add("cap");
    cityStateP.textContent = `${person.location.city}, ${person.location.state}`;

    cardImgDiv.appendChild(img);
    cardInfoDiv.appendChild(nameH3);
    cardInfoDiv.appendChild(emailP);
    cardInfoDiv.appendChild(cityStateP);

    cardDiv.appendChild(cardImgDiv);
    cardDiv.appendChild(cardInfoDiv);
    galleryDiv.appendChild(cardDiv);
  });
}

//this function creates a modal for each person in the data attribute
function createModals(data) {
  const body = document.querySelector("body");
  data.forEach((person) => {
    //creating elements and setting values based on mockup
    const modalContainerDiv = createElement("div", "class", "modal-container");
    const modalDiv = createElement("div", "class", "modal");
    const closeBtn = createElement("button", "class", "modal-close-btn");
    setAttr(closeBtn, "type", "button");
    setAttr(closeBtn, "div", "modal-close-btn");
    closeBtn.textContent = "X";
    closeBtn.style.fontWeight = "bold";
    const modalInfoContainer = createElement(
      "div",
      "class",
      "modal-info-container"
    );
    const modalInfoImg = createElement("img", "class", "modal-img");
    setAttr(modalInfoImg, "src", person.picture.large);
    setAttr(modalInfoImg, "alt", "profile picture");
    const nameH3 = createElement("h3", "id", "name");
    setAttr(nameH3, "class", "modal-name");
    nameH3.classList.add("cap");
    nameH3.textContent = `${person.name.first} ${person.name.last}`;
    const emailP = createElement("p", "class", "modal-text");
    emailP.textContent = person.email;
    const cityP = createElement("p", "class", "modal-text");
    cityP.textContent = person.location.city;
    const lineBreak = createElement("hr");
    const numberP = createElement("p", "class", "modal-text");
    numberP.textContent = person.phone;
    const addressP = createElement("p", "class", "modal-text");
    addressP.textContent = `${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state}, ${person.location.postcode}`;
    const birtdayP = createElement("p", "class", "modal-text");
    //formatted the birthday before inserting it into the modal
    const Birthday = person.dob.date.slice(0, 10).split("-");
    const [one, two, three] = Birthday;
    const formattedBirthday = [two, three, one].join("/");

    birtdayP.textContent = `Birthday: ${formattedBirthday}`;

    //setting modal's display to none
    modalContainerDiv.style.display = "none";

    //appending elements
    modalInfoContainer.appendChild(modalInfoImg);
    modalInfoContainer.appendChild(nameH3);
    modalInfoContainer.appendChild(emailP);
    modalInfoContainer.appendChild(cityP);
    modalInfoContainer.appendChild(lineBreak);
    modalInfoContainer.appendChild(numberP);
    modalInfoContainer.appendChild(addressP);
    modalInfoContainer.appendChild(birtdayP);

    modalDiv.appendChild(closeBtn);
    modalDiv.appendChild(modalInfoContainer);

    modalContainerDiv.appendChild(modalDiv);
    //appending each model to the body of the HTML document
    body.prepend(modalContainerDiv);
  });
}

//event listeners
//select the entire gallery
const gallery = document.getElementById("gallery");

//used event delegation to achieve the pop ups for the modals using the names of both the modal and card containers
gallery.addEventListener("click", (e) => {
  const allModalNames = document.querySelectorAll(".modal-name");
  if (e.target.classList.contains("card-img")) {
    const name =
      e.target.parentNode.parentNode.lastChild.firstChild.textContent;
    for (let i = 0; i < allModalNames.length; i++) {
      const modal = allModalNames[i].parentElement.parentElement.parentElement;
      const modalName = allModalNames[i].textContent;
      if (name === modalName) {
        modal.style.display = "inherit";
      }
    }
  }
});

//selects the entire body element
const body = document.querySelector("body");
console.log(body);

//again, i used event delegation
body.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const modal = e.target.parentElement.parentElement;
    modal.style.display = "none";
  }
});

//side note: how come in the mockup html, ids are added to each instance of a modal/card?
