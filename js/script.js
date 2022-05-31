const list = document.querySelectorAll(".mean select");
const btn = document.querySelector(".btn");
const fromcurrency = document.querySelector(".from select");
const tocurrency = document.querySelector(".to select");

const input = document.querySelector("input");
const exchange_text = document.querySelector(".exchange");

for (let i = 0; i < list.length; i++) {
  for (currency_code in country_code) {
    let selected;
    if (i === 0) {
      selected = currency_code == "EUR" ? "selected" : "";
    } else {
      selected = currency_code == "INR" ? "selected" : "";
    }
    let codes = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    list[i].insertAdjacentHTML("afterbegin", codes);

    list[i].addEventListener("change", (e) => {
      loadflag(e.target);
    });
  }
}

function loadflag(element) {
  for (let code in country_code) {
    if (code == element.value) {
      
      let imgtag=element.parentElement.querySelector('img');
      imgtag.src=`https://flagicons.lipis.dev/flags/4x3/${country_code[code].toLowerCase()}.svg`
    

    }
  }
}

list.forEach((event) => {
  event.addEventListener("change", loadflag);
});

btn.addEventListener("click", function (e) {
  e.preventDefault();
  let inputval = input.value;
  if (inputval == "0" || inputval == "") {
    input.value = "1";
  }
  exchange_text.innerHTML = "Getting exchange rate...";
  getdata();
});

async function getdata() {
  const url = `https://v6.exchangerate-api.com/v6/558328fc9d9b2d97b000e4b0/latest/${fromcurrency.value}`;
  const res = await fetch(url);
  const data = await res.json();
  const exchange_rate = data.conversion_rates[tocurrency.value];
  const total_rate = (input.value * exchange_rate).toFixed(2);
  exchange_text.innerHTML = `${input.value} ${fromcurrency.value}=${total_rate} ${tocurrency.value}`;
  input.value = "0";
}
