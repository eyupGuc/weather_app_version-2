const form = document.querySelector("section.top-banner form");
// console.log(form);
const input = document.querySelector(".container input");
// console.log(input);

const msg = document.querySelector("span.msg");
const list = document.querySelector(".ajax-section .cities");
// console.log(list);
/*const list=document.querySelector(".ajax-section.cities"); eğer bu şekilde .cities ile .ajax-section bitişik olursa tek ikisinde de ortak bir class var  */

localStorage.setItem(
  "tokenKey",
  "qHxuptpLNG3ry0nVTlXqBFeeSAy4z/idGQyvFEzrj5bn+pbyoHyuArL+hW1ov03F"
);

// localStorage.setItem(
//   "tokenKeyEncrypted",
//   EncryptStringAES("e815a95d20a585101c219591fd494992")
// );
form.addEventListener("submit", (e) => {
  e.preventDefault(); //submit sayfayı refresh yaptığı için bunu engelledik
  getWeatherDataFromApi();
});

//Get api function
const getWeatherDataFromApi = async () => {
  // alert("http request is gone");
  const tokenKey = DecryptStringAES(localStorage.getItem("tokenKey"));
  // alert(tokenKey);
  // console.log(tokenKey);
  const inputValue = input.value;
  const units = "metric";
  const lang = "tr";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${tokenKey}&units=${units}&lang=${lang}`;
  try {
    // const response = await fetch(url).then((response) => response.json());
    const response = await axios(url);

    console.log(response);
    const { main, sys, weather, name } = response.data;
    const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    const iconUrlAWS = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`;

    const cityNameSpans = list.querySelectorAll(".city span");
    const cityNameSpansArray = Array.from(cityNameSpans);
    if (cityNameSpansArray.length > 0) {
      const filteredArray = cityNameSpansArray.filter(
        (span) => span.innerText == name
      );
      if (filteredArray.length > 0) {
        msg.innerText =
          msg.innerText = `You already know the weather for ${name}, Please search for another city 😉`;
        setTimeout(() => {
          msg.innerText = "";
        }, 5000);

        return; // kodu sonlandırır.
      }
    }
    console.log(cityNameSpans);

    const createdLi = document.createElement("li");
    createdLi.classList.add("city");
    createdLi.innerHTML = `<h2 class="city-name" data-name="${name}, ${
      sys.country
    }"><span>${name}</span><sup>${sys.country}</sup>
 </h2><div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div><figure>
  <img class="city-icon" src="${iconUrl}"><figcaption>${
      weather[0].description
    }</figcaption></figure>`;

    // append vs prepend
    // list.append(createdLi);
    list.prepend(createdLi); // son yazılan ilk başa

    //!Capturing
    createdLi.addEventListener("click", (e) => {
      if (e.target.tagName == "IMG") {
        e.target.src = e.target.src == iconUrl ? iconUrlAWS : iconUrl;
      }
    });

    //!Bubbling
    createdLi.addEventListener("click", (e) => {
      // alert(`${e.target.tagName} element is clicked`);
      // window.location.href = "https://www.accuweather.com/";
    });

    form.reset();
  } catch (e) {
    msg.innerText = `404 (City Not Found)`;

    setTimeout(() => {
      msg.innerText = "";
    }, 5000);
  }
  form.reset();
};

document.querySelector(".cities").addEventListener("click", (e) => {
  if (e.target.tagName == "IMG") {
    alert("img is clicked");
  }
});
