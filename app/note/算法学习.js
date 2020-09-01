// 如何判断一个数组

// 最长公共前缀
function longestPrefix(arr) {
  if (!Array.isArray(arr) || !arr.length) {
    return ''
  }
  longestPrefixRec(arr)
}

function longestPrefixRec(arr) {
  if (arr.length <= 1) return arr[0]
  const mid = Math.floor(arr.length / 2)
  const left = arr.slice(0, mid)
  const right = arr.slice(mid)
  return longestPrefixMax(longestPrefixRec(left), longestPrefixRec(right))
} 

function longestPrefixMax(str1, str2) {
  if (str1 === str2) return str1
  const length = Math.max(str1.length, str2.length)
  for (let i = 1; i < length; i++) {
    if (str1.charAt(i) != str2.charAt(i)) {
      return str1.slice(0, i)
    }
  }
  return str1.slice(0, length)
}

// 数组打平
function flat(arr) {
  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    return []
  }
  let res = []
  arr.map(item => {
    if (item instanceof Array) {
      res.push(flat(item))
    } else {
      res.push(res)
    }
  })
  return res
}
// 数组打平 带深度
function flatWithDep(arr, dep) {
  if (!Array.isArray(arr) || dep <= 0) {
    return arr
  }
  arr.reduce((target, cur) => {
    if (cur instanceof Array) {
      return target.concat(flatWithDep(cur, dep - 1))
    } else {
      return target.push(cur)
    }
  }, [])
}
// 数组去重
// 简单版
function uniq(arr) {
  return arr.reduce((target, item) => {
    if (!arr.includes(item)) {
      target.push(item)
    }
    return target
  }, [])
}
// 可以携带参数
function uniqMal(arr, ieratee) {
  if (!Array.isArray(arr) || !ieratee) {
    return arr
  }
  const result = []
  const recorder = []
  for (let i = 0; i < arr.length; i++) {
    const computed = typeof ieratee === 'function' ? ieratee(arr[i]) : arr[i][ieratee]
    if (!recorder.includes(computed) || !computed) {
      result.push(arr[i])
    }
  }
  return result.length ? result : arr
}

// 链表相关
// 链表实现和遍历
function node(val) {
  this.val = val  
  this.next = null
}
const arr = [1, 3, 4]
function List(arr) {
  this.head = null
  let i = 0, temp = null
  while(i < arr.length) {
    if (i === 0) {
      this.head = new node(arr[i])
      temp = this.head
    } else {
      temp.next = new node(arr[i])
      temp = temp.next
    }
    i++
  }
}
function iera(head) {
  const res = []
  while(head) {
    res.push(head.val)
    head = head.next
  }
}
// 反转链表
// 2->3->5->4->9->10->3->84
//             |__________|
// 2->3->5->9->10->3->84
//             |_______|
// 2<-3<-5
// 5->3->2

function reverseList(head) {
  let prev = null
  while(head) {
    const nextNode = head.next
    head.next = prev
    prev = head
    head = nextNode
  }
  return prev
}

//判断链表是否有循环
function mulList(head) {
  let fast = head, slow = head
  while(!fast && !fast.next) {
    fast = fast.next.next
    slow = fast.next
    if (fast === slow) return ture
  }
  return false
}
