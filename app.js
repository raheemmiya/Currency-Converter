const amountTextfield = document.querySelector(".amount input");
const button = document.querySelector("button");
const options = document.querySelector(".dropdowns");
const fromDropdown = document.querySelector("#from");
const toDropdown = document.getElementById("to");
const fromDropdownContainer = document.querySelector(".from-dropdown");
const fromImg = document.querySelector("#from-img");
const toImg = document.querySelector("#to-img");
const message = document.getElementById("message");
const dropdown = document.querySelectorAll("select"); 
let country1 = "IN";
let country2 = "US";

//appending the countries to the Dropdown menus
function populateOptions(dropdownOption) {
  for (let key in countryList) {
    let newOption = document.createElement("option");
    newOption.innerHTML = key;
    dropdownOption.appendChild(newOption);
  }
}

populateOptions(fromDropdown);
populateOptions(toDropdown);


//function to make the INR and USD selected
(function(){ 

  for (const element of fromDropdown) {
    if (element.innerText == "INR") {
      element.selected = true;
    }
  }
  
  for (const element of toDropdown) {
    if (element.innerText == "USD") {
      element.selected = true;
    }
  }
})();

//Process to change the flags according to the country in the dropdown menu (IIFE)
(function () {
  dropdown.forEach((option) => {
    option.addEventListener("change", (event) => {
      let country = event.target.value;
      country = countryList[country];

      if (event.target.id === "from") {
        country1 = country;
        fromImg.src = `https://flagsapi.com/${country}/flat/64.png`;
      } else if (event.target.id === "to") {
        country2 = country;
        toImg.src = `https://flagsapi.com/${country}/flat/64.png`;
      }
    });
  });
})();

//ASync function to fetch the currency exchanged amount from an API
async function currencyRate(country1, country2, amount) {
  let promise = await fetch(
    `https://api.frankfurter.app/latest?amount=${amount}&from=${country1}&to=${country2}`
  );
  let response = await promise.json();
  console.log(response.rates);

  return await response.rates;
}

async function currencyConverter() {
  let amount = Number(amountTextfield.value);

  if (amount == 0) {
    message.innerText = "Please Enter a valid Amount";
    return;
  }

  else if (Number.isInteger(amount)) {
    const country1Code = Object.keys(countryList).find(
      (a) => countryList[a] == country1
    ); //converting IN to INR
    const country2Code = Object.keys(countryList).find(
      (a) => countryList[a] == country2
    );

    try {
      let exchangedAmount = await currencyRate(
        country1Code,
        country2Code,
        amount
      );
      updateMessage(amount, exchangedAmount, country1Code, country2Code);
    } catch (error) {
      message.innerText = "Error fetching data from API";
    }
  }
}

//Updating the message for the exchanged rate
function updateMessage(amount, exchangedAmount, country1Code, country2Code) {
  message.innerText = `${country1Code} ${amount} = ${
    Object.values(exchangedAmount)[0]
  } ${country2Code}`;
}

//button working mechanism
button.addEventListener("click", (event) => {
  currencyConverter();
});

//the program is running smothly, but the API only supports 12-15  countries (INR, IDF, USA, HUF ,EUR, ZAR ,etc) 