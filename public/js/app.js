console.log('Client side JS file is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');



weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = "Loading...";
  messageOne.textContent = "";
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = "Error";
        messageTwo.textContent = data.error;

      } else {
        // console.log(data);
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast

      }
    });
  });
});