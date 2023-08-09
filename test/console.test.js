var myArray = [
    ['Work', 9],
    ['Eat', 1],
    ['Commute', 2],
    ['Play Game', 1],
    ['Sleep', 7]
];

var myArray0 = myArray[0][0];
console.log(myArray0);
myArray[0][0] = 'Fly';
console.log(myArray0);