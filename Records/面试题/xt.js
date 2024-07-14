// react hooks实现一个计数器 每秒钟+1
// function Counter() {
//     const [count, setCount ] = useState(0);

//     // useEffect(()=>{
//     //     const timer = setInternal(()=>{
//     //         setCount(prevValue => prevValue + 1);
//     //     },1000);

//     //     return () => clearInternal(timer);
//     // },[])

//     return (
//         <div>{count}</div>;
//     )
// }

// [
//     {
//         id: 1,
//         text: '节点1',
//         parentId: 0 //这里用0表示为顶级节点
//     },
//     {
//         id: 2,
//         text: '节点1_1',
//         parentId: 1 //通过这个字段来确定子父级
//     }
// ]

// 转成
// [
//     {
//         id: 1,
//         text: '节点1',
//         parentId: 0,
//         children: [
//             {
//                 id:2,
//                 text: '节点1_1',
//                 parentId:1
//             }
//         ]
//     }
// ]

function jsToTree(data) {
  let result = [];

  let map = {};
  data.forEach((item) => {
    map[id] = item;
  });

  data.forEach((item) => {
    let parent = map[item.parentId];
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      result.push(item);
    }
  });
}
