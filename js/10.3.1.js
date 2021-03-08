// const btn = document.querySelector('.j-btn-test');
// const divIcon = btn.querySelector('.div_icon');
// const icon2 = btn.querySelector(".icon2");

// const icon1 = btn.querySelector(".icon1");

// btn.addEventListener('click', () => {
//   btn.classList.toggle('btn--magic');
//   divIcon.classList.toggle('btn--magic');
//   icon2.classList.toggle('btn--magic');
// });

// const btn = document.querySelector('.j-btn-test');

// // const icon1 = btn.querySelector(".icon1");
// // const icon2 = btn.querySelector(".icon2");

// const icon1 = document.getElementById('icon1')

// let icon1Style = icon1.style.display;
// let icon2Style = icon2.style.display;

// console.log(icon1)
// console.log(icon1Style)
// console.log(icon1Style === "block")
// console.log(icon1Style === "none")
// console.log(typeof icon1Style)


const btn = document.querySelector('.j-btn-test');
const icon1 = btn.querySelector('.icon1');
const icon2 = btn.querySelector('.icon2');

btn.addEventListener('click', () => {
  btn.classList.toggle('btn--magic');
  icon1.classList.toggle('btn--magic');
  icon2.classList.toggle('btn--magic');
})