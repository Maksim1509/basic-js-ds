const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree {
  constructor() {
    this.node = null;
  }

  root() {
    return this.node ? this.node : null;
  }

  add(data) {
    if (!this.root()) {
      this.node = new Node(data);
      return;
    }
    const iter = (node) => {
      if(data < node.data) {
        if(!node.left) {
          node.left = new Node(data);
          return;
        }
        iter(node.left);
      }
      if(data > node.data) {
        if(!node.right) {
          node.right = new Node(data);
          return;
        }
        iter(node.right);
      }
    }
    if(data < this.root().data) {
      this.node.left ? iter(this.node.left) : this.node.left = new Node(data);
    }
    if(this.root().data && data > this.root().data) {
      this.node.right ? iter(this.node.right) : this.node.right = new Node(data);
    }
  }

  has(data) {
    if(!this.root().data) return false;

    const iter = (node) => {
      if (data === node.data) return true;
      if (data < node.data) {
        if(!node.left) return false;
        return iter(node.left);
      }
      if(data > node.data) {
        if(!node.right) return false;
        return iter(node.right);
      }
    }
    return iter(this.node);
  }

  find(data) {

    if(!this.root().data) return null;

    const iter = (node) => {
      if(data === node.data) return node;

      if(data < node.data) {
        return node.left ? iter(node.left) : null;
      }
      if(data > node.data) {
        return node.right ? iter(node.right) : null;
      }
    }
    return iter(this.node);
  }

  remove(data) {
    const removeChild = (parentNode, dataOfChild) => {
      if(parentNode.left && dataOfChild === parentNode.left.data) {
        if(!parentNode.left.left && !parentNode.left.right) {
          parentNode.left = null;
          return;
        }
        this.remove(parentNode.left.data);
        return;
      } 
      if(parentNode.right && dataOfChild === parentNode.right.data) {
        if(!parentNode.right.left && !parentNode.right.right) {
          parentNode.right = null;
          return;
        }
        this.remove(parentNode.right.data);
        return;
      }
      return dataOfChild > parentNode.data ? removeChild(parentNode.right, dataOfChild) : removeChild(parentNode.left, dataOfChild);
    };

    let node = this.find(data);

    if(!node) return;
    if(!node.left && !node.right) {
      removeChild(this.node, data);
      return;
    } 
    if(!node.left) {
      node.data = node.right.data;
      node.left = node.right.left
      node.right = node.right.right;
      return;
    } 
    if(!node.right) {
      const left = node.left;
      node.data = left.data;
      node.left = left.left;
      node.right = left.right;
      return;
    }

    const getMaxFromLeft = (tree) => {
        const iter = (node) => {
          return node.right ? iter(node.right) : node.data;  
        }
        return iter(tree);
      };
    const maxFromLeft = getMaxFromLeft(node.left);

    removeChild(this.node, maxFromLeft);
    node.data = maxFromLeft;
    return;
  }

  min() {
    if(!this.root().data) return null;

    const iter = (node) => {
      return node.left ? iter(node.left) : node.data; 
    }
    return iter(this.node);
  }

  max() {
    if(!this.root().data) return null;
    
    const iter = (node) => {
      return node.right ? iter(node.right) : node.data; 
    }
    return iter(this.node);
  }
}
  
module.exports = {
  BinarySearchTree
};
