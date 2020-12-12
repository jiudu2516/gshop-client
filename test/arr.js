let arr = [2, 3, 6, 4, 1, 9]

console.log(arr.find((item, index) => item > 3)); // 返回满足条件的元素，一旦找到满足条件的元素就停止遍历
console.log(arr.findIndex((item, index) => item > 3)); // 返回满足条件的元素对应的下标