// 定义双向链表节点类
class Node {
  constructor(data) {
    this.data = data; // 节点存储的数据
    this.prev = null; // 指向前一个节点的指针
    this.next = null; // 指向后一个节点的指针
  }
}

// 定义双向链表类
class DoublyLinkedList {
  constructor() {
    this.head = null; // 链表头节点
    this.tail = null; // 链表尾节点
  }

  // 向链表尾部添加节点
  append(data) {
    const newNode = new Node(data);
    // 链表为空时，头尾节点都指向新节点
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }
    // 链表非空时，将新节点接在尾节点后
    newNode.prev = this.tail;
    this.tail.next = newNode;
    this.tail = newNode;
  }

  // 反转双向链表核心方法
  reverse() {
    // 空链表或只有一个节点，无需反转
    if (!this.head || !this.head.next) {
      return;
    }

    let current = this.head;
    // 先交换头尾节点
    [this.head, this.tail] = [this.tail, this.head];

    // 遍历链表，逐个反转节点的prev和next
    while (current) {
      // 交换当前节点的prev和next指针
      [current.prev, current.next] = [current.next, current.prev];
      // 移动到下一个节点（因prev/next已交换，需走prev）
      current = current.prev;
    }
  }

  // 打印链表（从头部到尾部）
  print() {
    const result = [];
    let current = this.head;
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    console.log(result.join(" -> ") || "空链表");
  }
}

// 测试代码
const dll = new DoublyLinkedList();
// 添加测试节点
dll.append(1);
dll.append(2);
dll.append(3);
dll.append(4);
dll.append(5);

console.log("原双向链表：");
dll.print(); // 输出：1 -> 2 -> 3 -> 4 -> 5

// 反转链表
dll.reverse();

console.log("反转后的双向链表：");
dll.print(); // 输出：5 -> 4 -> 3 -> 2 -> 1
