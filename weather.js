const form = document.querySelector("section.top-banner form");
const input = document.querySelector(".container input");
const msg = document.querySelector("span.msg");
const list = document.querySelector(".ajax-section .cities");

localStorage.setItem("tokenKey", "e815a95d20a585101c219591fd494992");

localStorage.setItem(
  "tokenKeyEncrypted",
  EncryptStringAES("e815a95d20a585101c219591fd494992")
);

// localStorage.setItem(
//   "tokenKey",
//   "RAPAIooyOVFdRNn7gPi6i8vUp3OJvy0Np5wgMGgNO0a2a258kya95/arqJmhPrWc"
// );
// const tokenKey = DecryptStringAES(
//   localStorage.getItem("e815a95d20a585101c219591fd494992")
// );

form.addEventListener("submit", (event) => {
  event.preventDefault();
  getWeatherDataFromApi();
});

//Get api func. (http methods == Verbs)
const getWeatherDataFromApi = async () => {
  //alert("http request is gone!");
  const tokenKey = DecryptStringAES(localStorage.getItem("tokenKey"));
  //alert(tokenKey);
  const inputValue = input.value;
  const units = "metric";
  const lang = "tr";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${tokenKey}&units=${units}&lang=${lang}`;

  const response = await fetch(url).then((response) => response.json());
  console.log(response);
};
