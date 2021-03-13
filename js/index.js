//undefined null not defined
//hoisting: bien khai bao bang var,function declaration se dc dua len dau
// let h;
// console.log(h); //undefined
// //
// console.log(a); //not defined
// //
// console.log(b); //undifined
// var b = "hello";
// //function declaration hoisting
// hello();
// function hello() {
//   console.log("hello");
// }
// //function expression
// const ok = function () {};
// //arrow function
// const ok = () => {};
//currying function  ex: add(3)(4)
// const add = (a) => (b) => (c) => {
//   return a + b + c;
// };
// console.log(add(7)(1)(1));
//closure
// const counter = () => {
//   let count = 1;
//   return () => {
//     console.log(count);
//     count++;
//   }; //inner function
// };
// const count = counter();
// count();//1
// count();//2
// count();//3
// count();//4
//event loop
// console.log(1);
// setTimeout(() => {
//   console.log(2);
// }, 0);
// setTimeout(() => {
//   console.log(4);
// }, 0);
// console.log(3);
//single thread -> tại 1 thời điếm chỉ có 1 tiến trình dc chạy
const promise1 = () => {
  return new Promise((resolve, reject) => {
    resolve("ok1");
  });
};
const promise2 = () => {
  return new Promise((resolve, reject) => {
    resolve("ok2");
  });
};
promise1().then((data) => console.log(data)); //1s
promise2().then((data) => console.log(data)); //6s
//=>7s
Promise.all([promise1(), promise2()]).then((data) => console.log(data)); //6s
//=>6s
