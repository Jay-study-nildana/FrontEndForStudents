//switch statemetn
var day = 2;
switch (day) {
    case 1:
        console.log("Monday");
        break;
    case 2:
        console.log("Tuesday");
        break;
    case 3:
        console.log("Wednesday");
        break;
    case 4:
        console.log("Thursday");
        break;
    case 5:
        console.log("Friday");
        break;
    case 6:
        console.log("Saturday");
        break;
    case 7:
        console.log("Sunday");

        break;
    default:
        console.log("Invalid day");
        break;
}

//ternary operator
var firstName = "John";
var age = 16;

age >= 18 ? console.log(firstName + " drinks beer.") : console.log(firstName + " drinks juice.");

var drink = age >= 18 ? "beer" : "juice";
console.log(drink);

//switch statement
var job = "teacher";
switch (job) {
    case "teacher":
    case "instructor":
        console.log(firstName + " teaches kids how to code.");
        break;
    case "driver":
        console.log(firstName + " drives an uber in Lisbon.");
        break;
    case "designer":
        console.log(firstName + " designs beautiful websites.");
        break;
    default:
        console.log(firstName + " does something else.");
        break;
}

//truthy and falsy values and equality operators
//falsy values: undefined, null, 0, "", NaN
//truthy values: NOT falsy values

var height;

height = 23;

if (height || height === 0) {
    console.log("Variable is defined");
}
else {
    console.log("Variable has NOT been defined");
}

//equality operators
if (height == "23") {
    console.log("The == operator does type coercion!");
}   

//if else statement
var firstName = "John";
var civilStatus = "single";

if (civilStatus === "married") {
    console.log(firstName + " is married!");
}
else {
    console.log(firstName + " will hopefully marry soon :)");
}

//bubble sort
var array = [5, 1, 4, 2, 8];
var temp;

for (var i = 0; i < array.length; i++) {
    for (var j = 0; j < array.length; j++) {
        if (array[j] > array[j + 1]) {
            temp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = temp;
        }
    }
}

console.log(array);

//bubble sort reverse
var array = [5, 1, 4, 2, 8];
var temp;

for (var i = 0; i < array.length; i++) {
    for (var j = 0; j < array.length; j++) {
        if (array[j] < array[j + 1]) {
            temp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = temp;
        }
    }
}

console.log(array);

//array map

var array = [5, 1, 4, 2, 8];

var newArray = array.map(function (item) {
    return item * 2;
}

);

console.log(newArray);

//array filter

var array = [5, 1, 4, 2, 8];

var newArray = array.filter(function (item) {
    return item > 3;
}

);

console.log(newArray);

//array reduce

var array = [5, 1, 4, 2, 8];

var newArray = array.reduce(function (total, next) {
    return total + next;
}


);

console.log(newArray);

//array find

var array = [5, 1, 4, 2, 8];

var newArray = array.find(function (item) {
    return item === 4;
}

);

console.log(newArray);

//array find index

var array = [5, 1, 4, 2, 8];

var newArray = array.findIndex(function (item) {
    return item === 4;
}

);

console.log(newArray);

//array of objects

var array = [
    { name: "John", age: 25 },
    { name: "Jane", age: 20 },
    { name: "Mary", age: 30 },
    { name: "Peter", age: 28 },
    { name: "Bill", age: 35 },
];

var newArray = array.map(function (item) {
    return item.age;
}

);

console.log(newArray);

//array of objects filter

var array = [

    { name: "John", age: 25 },
    { name: "Jane", age: 20 },
    { name: "Mary", age: 30 },
    { name: "Peter", age: 28 },
    { name: "Bill", age: 35 },  
];

var newArray = array.filter(function (item) {
    return item.age < 30;
}   

);

console.log(newArray);

//array with let

var array = [1, 2, 3, 4, 5];

for (let i = 0; i < array.length; i++) {
    console.log(i);
}

console.log(i);

//array with var





