// function getRandomNumber(len) {
//   let ans = [];
//   let ans_set = new Set();
//   while (ans.length < len) {
//     const randomAns = Math.random() * 990 + 10;
//     if (!ans_set.has(randomAns)) {
//       ans.push(randomAns);
//       ans_set.add(randomAns);
//     }
//   }
//   return ans;
// }
// console.log(getRandomNumber(100000));

// function deepClone(object) {
//   if (!object || typeof object !== "object") return;

//   let newObject = Array.isArray(object) ? [] : {};
//   for (let key in object) {
//     if (object.hasOwnProperty(key)) {
//       if (typeof object[key] === "object") {
//         deepClone(object[key]);
//       } else {
//         newObject = object[key];
//       }
//     }
//   }

//   return newObject;
// }

const test = [
  {
    id: 1,
    pid: 0,
    name: "test",
  },
  {
    id: 2,
    pid: 1,
    name: "test2",
  },
];

function jsonToTree(data) {
  let map = {};
  let result = [];
  data.forEach((datum) => {
    map[datum.id] = datum;
  });

  data.forEach((item) => {
    let parent = map[item.pid];
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      result.push(item);
    }
  });
  return result;
}

console.log(jsonToTree(test));
