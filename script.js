const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const days = document.getElementById("day");
const time = document.getElementById("time");
const err = document.getElementById("err")

var today = new Date();
var hour = today.getHours();
var day = today.getDay();

function checkForValidInput()
{
  if (parseInt(days.value) > day)
  { 
    UI()
  }
  else if(parseInt(days.value) === day && parseInt(time.value) > hour)
  {
    
    UI()
  }
  else 
  {
    err.innerText = "Please select valid date / time";
  }
}



function UI()
{
  err.innerText = "";
  populateUI();

  let ticketPrice = +movieSelect.value;
  function setMovieData(movieIndex, moviePrice, days, time) {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
    localStorage.setItem("selectedDay", days);
    localStorage.setItem("selectedTime", time);
}


  function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

    
  }


  function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    const time = JSON.parse(localStorage.getItem("selectedTime"));
      if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
          if (selectedSeats.indexOf(index) > -1) {
            console.log(seat.classList.add("selected"));
          }
        });
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

    if (selectedMovieIndex !== null) {
      movieSelect.selectedIndex = selectedMovieIndex;
      //console.log(selectedMovieIndex)
    }
  }
  //console.log(populateUI())
  movieSelect.addEventListener("change", (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
  });

  container.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("seat") &&
      !e.target.classList.contains("sold")
    ) {
      e.target.classList.toggle("selected");

      updateSelectedCount();
    }
  });
  updateSelectedCount();

  
}
