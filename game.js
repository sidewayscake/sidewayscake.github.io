var randomizer = {
    _ratio: 0.02,  // default ratio
    setRatio: function (falses, total) {
        this._ratio = falses / total;
    },
    getResult: function () {
        return Math.random() > this._ratio;
    }
};
//https://stackoverflow.com/questions/22099275/how-to-make-a-javascript-function-that-usually-returns-true-but-returns-false-r



var percent = 0

function resetPercent() {
  percent = Math.floor(Math.random() * 40) + 30;
  document.getElementById("percent").innerText = "Chances of cake being sideways: " + percent + "%"
}

resetPercent()

var credits = 15;
var score = 0;
var status = false;
//False: Upright
//True: Sideways
var guess = true;
var bets = 2;

function handle() {

  //Grab values
  guess = document.getElementById("willnt").innerText == "will"
  bets = parseInt(document.getElementById("betnum").value.split("-").join(""))
  //Check if user is betting more credits than they own
  if (bets > credits) {
    alert("You're betting too many credits")
    return;
  }
  //Get choice
  randomizer.setRatio(Math.abs(percent - 100), 100)
  status = randomizer.getResult();
  //Analyze choice
  if (status != guess.toString()) {
    credits -= bets;
    if (credits < 0) {
      credits = 0;
    }
  } else {
    credits += bets;
    score++;
  }
  update(true)
}

function switchWill() {

  var willnt = document.getElementById("willnt")

  if (willnt.getAttribute("class") == "will") {
    willnt.setAttribute("class", "wont");
    willnt.innerText = "won't"
  } else {
    willnt.setAttribute("class", "will");
    willnt.innerText = "will"
  }

}

function update(credstat) {

  if (!credstat) {
    document.body.innerHTML = `
    <h1 style="margin-bottom: 0px;">Sideways Cake</h1>
    <p style="margin-top: 0px;">A game inspired by Bizaardvark</p>
    <h3>Your Credits: ${credits}</h3>
    <h3>Your Score: ${score}</h3><br>
    <h3 id="percent"></h3><br>
    <p>I bet</p>
    <input type="number" value="${bets}" min="1" max="${credits}" id="betnum"></input>
    <p>credits that the cake</p>
    <p id="willnt" class="will" onclick="switchWill()">will</p>
    <p>(click to change guess)</p>
    <p>be sideways</p>
    <button id="bet" onclick="handle()">Bet</button>
    `
    resetPercent()
  } else {
    document.body.innerHTML = `
    <h1 style="margin-bottom: 0px;">Sideways Cake</h1>
    <p style="margin-top: 0px;">A game inspired by Bizaardvark</p>
    <h3>Your Credits: ${credits}</h3>
    <h3>Your Score: ${score}</h3><br>
    <img src="${status == "true" ? "cake_sideways.png" : "cake_upright.png" }" width="100" height="100">
    `
    //if (credits > 0) {
      if (status == guess.toString()) {
        document.body.innerHTML += `
        <h2>Correct!</h2>
        <button id="tryAgain" onclick="update(false)">Try again</button>`
      } else {
        document.body.innerHTML += `
        <h2>Sorry, you guessed wrong</h2>`
        if (credits > 0) {
          document.body.innerHTML += `<button id="tryAgain" onclick="update(false)">Try again</button>`
        } else {
          document.body.innerHTML += `<h1>Game Over</h1>
          <p>Reload the page to try again</p>`
        }
      }

    //}
  }

}
