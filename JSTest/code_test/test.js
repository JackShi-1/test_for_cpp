// json转tree
function jsonToTree(data) {
  // 初始化结果数组，并判断输入数据的格式
  let result = [];
  if (!Array.isArray(data)) {
    return result;
  }
  // 使用map，将当前对象的id与当前对象对应存储起来
  let map = {};
  data.forEach((item) => {
    map[item.id] = item;
  });
  // console.log(data,map, "===data");
  data.forEach((item) => {
    let parent = map[item.pid];
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      result.push(item);
    }
    console.log(JSON.stringify(result));
  });
  return result;
}
console.log(
  JSON.stringify(
    jsonToTree([
      {
        id: 1,
        pid: 0,
        name: "body",
      },
      {
        id: 2,
        pid: 1,
        name: "title",
      },
      {
        id: 3,
        pid: 2,
        name: "div",
      },
    ]),
    null,
    2
  )
);

// 通过关键字模糊匹配检索一个省市区的多叉树集合，输出所有匹配的路径集合
const sourceData = [
  {
    name: "江苏省",
    children: [
      {
        name: "南京市",

        children: [
          {
            name: "玄武区",
          },

          {
            name: "秦淮区",
          },

          {
            name: "建邺区",
          },

          {
            name: "鼓楼区",
          },

          {
            name: "浦口区",
          },

          {
            name: "栖霞区",
          },

          {
            name: "雨花台区",
          },

          {
            name: "江宁区",
          },

          {
            name: "六合区",
          },

          {
            name: "溧水区",
          },

          {
            name: "高淳区",
          },
        ],
      },
      {
        name: "常州市",
        children: [
          {
            name: "天宁区",
          },

          {
            name: "钟楼区",
          },

          {
            name: "新北区",
          },

          {
            name: "武进区",
          },

          {
            name: "金坛区",
          },

          {
            name: "溧阳市",
          },
        ],
      },
    ],
  },
];

const keyword = "宁";

// => ["江苏省-南京市-江宁区", "江苏省-常州市-天宁区"]

function getPath(sourceData, keyword) {
  let ansItem = "";
  let ans = [];
  helpGetItem(sourceData, ansItem);

  function helpGetItem(currentChild, ansItem) {
    if (!currentChild) {
      if (ansItem.includes(keyword)) {
        ans.push(ansItem.slice(1));
      }
    }
    currentChild?.forEach((item) => {
      let newItem = ansItem;
      newItem = newItem + "-" + item.name;
      helpGetItem(item?.children, newItem);
    });
  }
  return ans;
}
console.log(getPath(sourceData, keyword));

const str = "2018年结束了，2019年开始了，2020年就也不远了";
const rex = /\d+/g; // 这里是定义匹配规则，匹配字符串里的1到多个数字
const str1 = str.replace(rex, "****");
console.log(str1); // 输出："****年结束了，****年开始了,****年也不远了"
const str2 = str.replace(rex, function (item) {
  // console.log(arguments); // 看下面的图片
  console.log(item, "===item");
  const arr = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
  let newStr = "";
  item.split("").map(function (i) {
    newStr += arr[i];
  });
  return newStr;
});
console.log(str2); // 输出：贰零壹捌年结束了，贰零壹玖年开始了,贰零贰零年也不远了
