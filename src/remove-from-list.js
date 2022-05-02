const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Given a singly linked list of integers l and an integer k,
 * remove all elements from list l that have a value equal to k.
 *
 * @param {List} l
 * @param {Number} k
 * @return {List}
 *
 * @example
 * For l = [3, 1, 2, 3, 4, 5] and k = 3,
 * the output should be [1, 2, 4, 5]
 *
 * Singly - linked lists are already defined using interface
 * class ListNode {
 *   constructor(x) {
 *     this.value = x;
 *     this.next = null;
 *   }
 * }
 */
function removeKFromList(l, k) {
  const iter = (prev, cur) => {
    if(!cur.next) {
      if(cur.value === k) {
        prev.next = null
      }
      return;
    }

    if(cur.value === k) {
      if(!prev) {
        l = l.next;
      }  else {
        prev.next = cur.next;
      }
      iter(prev, cur.next)
    } else {
      iter(cur, cur.next)
    }   
  }
  iter(null, l);
  return l;
}

module.exports = {
  removeKFromList
};
