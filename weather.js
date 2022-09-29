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
  e.preventDefault();
  getWeatherDataFromApi();
});

//Get api function
const getWeatherDataFromApi = async() => {
  // alert("http request is gone");
  const tokenKey = DecryptStringAES(localStorage.getItem("tokenKey"));
  alert(tokenKey);
  console.log(tokenKey);
  const inputValue=input.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${tokenKey}&units=${units}&lang=${lang}`;

  const response=await fetch(url).then()
};
