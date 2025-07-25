console.log("Client side javascript file is loaded!");

fetch("http://puzzle.mead.io/puzzle", { mode: "no-cors" })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

messageOne.textContent = "Loading";
messageTwo.textContent = "";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  console.log(location);
  fetch("http://localhost:3000/weather?address=" + location)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  search.value = "";
});
