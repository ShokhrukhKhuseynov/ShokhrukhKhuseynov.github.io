export class Node {
    constructor(row, column, id) {
        this.row = row;
        this.column = column;
        this.id = id;
        this.left = null;
        this.right = null;
        this.top = null;
        this.bottom = null;

    }
}

export class Queue {
    constructor() {
        this.elements = {};
        this.head = 0;
        this.tail = 0;
        this.length = 0;
    }
    enqueue(element) {
        this.elements[this.tail] = element;
        this.tail++;
        this.length++;
    }
    dequeue() {
        const item = this.elements[this.head];
        delete this.elements[this.head];
        this.head++;
        this.length--;
        return item;
    }
    peek() {
        return this.elements[this.head];
    }
    length() {
        return this.tail - this.head;
    }
    isEmpty() {
        return this.length === 0;
    }
}

class QElement {
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
    }
}

export class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(element, priority) {
   
        var qElement = new QElement(element, priority);
        var contain = false;

        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > qElement.priority) {
             
                this.items.splice(i, 0, qElement);
                contain = true;
                break;
            }
        }

        if (!contain) {
            this.items.push(qElement);
        }
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.shift().element;
    }

    front() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[0].element;
    }

    rear() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[this.items.length - 1].element;
    }

    isEmpty() {
        return this.items.length == 0;
    }
}



class HashTable {
    constructor(size) {
        this.data = new Array(size);
        // this.data = [];
    }

    addKey(key) {
        if (!this.data[key]) {
            this.data[key] = [];
        }
        return this.data;
    }

    set(key, value) {
        this.data[key].push(value);
        return this.data;
    }

    get(key) {
        const currentBucket = this.data[key];
        if (currentBucket) {
            return currentBucket;
        }
        return undefined;
    }
}
