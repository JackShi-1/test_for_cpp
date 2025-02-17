// green - 4s - yellow - 1s - red -2s - green
// function Light(timer, light, callback) {
//   setTimeout(() => {
//     console.log(light);
//     callback();
//   }, timer);
// }
// const step = () => {
//   Light(2000, "green", () => {
//     Light(4000, "yellow", () => {
//       Light(1000, "red", step);
//     });
//   });
// };

// step();

const task = (timer, light) => {
  new Promise((resolve) => {
    setTimeout(() => {
      console.log(light);
      resolve();
    }, timer);
  });
};

const step = () => {
  task(2000, "green")
    .then(() => task(4000, "yellow"))
    .then(() => task(1000, "red"))
    .then(step);
};
step();
