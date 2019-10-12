const Node = require('./node');

class LinkedList {
    constructor() {
        this.list = [];
        this._head = null;
        this._tail = null;
    }

    get length() {
        return this.list.length;
    }

    append(data) {

        let newNode = new Node(data);

        if (this._head === null) {
            this._head  = newNode;
            this._tail   = newNode;
            newNode.prev  = null;
            newNode.next  = null;
        }
        else {
                newNode.prev  = this._tail;
                this._tail  = newNode;
            }

        this.list.push(newNode);
        return this;
    }

    head() {
        if (this._head) {
            return this._head.data;
        }
        return this._head;
    }

    tail() {
        if (this._tail) {
            return this._tail.data;
        }
        return this._tail;
    }

    at(index) {
        return this.list[index].data;
    }

    insertAt(index, data) {
        let newNode = new Node(data);

        if (index === 0 && this._head === null) {
            this.append(data);
            return this;
        }
        if (index === 0 && this._head !== null) {
            this._head = newNode;
            this.list[index] = newNode;
            newNode.next = this._head;
        }
        if (index > 0) {
            newNode.next  = this.list[index].prev = newNode;
            newNode.prev = this.list[index - 1].next = newNode;
        }
        this.list.splice(index, 0, newNode);
        return this;
    }

    isEmpty() {
        return this.list.length === 0;
    }

    clear() {
        this.list = [];
        this._head = null;
        this._tail = null;
        return this;
    }

    deleteAt(index) {
        if (index === 0 && this.list.length > 1) {
            this._head = this.list[index + 1].prev = null;
        }
        if (this.list.length - 1 === index && this.list.length > 1) {
            this._tail = this.list[index - 1].next = null;
        }
        if (index > 0 && index !== this.list.length - 1) {
            this.list[index - 1].next = this.list[index + 1];
            this.list[index + 1].prev = this.list[index - 1];
        }
        this.list.splice(index, 1);
        return this;
    }

    reverse() {
        this.list = this.list.reverse().map((node, index, array) => {
            if (index === 0) {
                node.prev = null;
                node.next = array[index + 1];
                this._head = node;
                return node;
            }
            if (array.length - 1 === index) {
                node.next = null;
                node.prev = array[index - 1];
                this._tail = node;
                return node;
            }
            node.prev = array[index - 1];
            node.next = array[index + 1];
            return node;
        });
        return this;
    }

    indexOf(data) {
        return this.list.findIndex( elem => elem.data === data);
    }
}

module.exports = LinkedList;