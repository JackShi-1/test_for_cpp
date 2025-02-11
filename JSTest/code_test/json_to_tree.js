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

function jsonToTree(jsonData) {
  const result = { children: [] };
  const map = {};

  for (const item of jsonData) {
    const { id, parentId } = item;
    const newNode = { ...item, children: [] };

    map[id] = newNode;

    if (parentId) {
      if (!map[parentId]) {
        map[parentId] = { children: [] };
      }
      map[parentId].children.push(newNode);
    } else {
      result.children.push(newNode);
    }
  }

  return result;
}

// 示例 JSON 数据
const json = [
  { id: 1, name: "Node 1", parentId: null },
  { id: 2, name: "Node 2", parentId: 1 },
  { id: 3, name: "Node 3", parentId: 1 },
  { id: 4, name: "Node 4", parentId: 2 },
];

const tree = jsonToTree(json);
console.log(tree);
