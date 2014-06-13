var ageAsString = prompt("What is your age? ", "");
var age = Number(ageAsString);
if (age < 40)
{
    alert("Oh you're so young...");
}
else if(age == 40)
{
    alert("Oh, you're 40");
}
else
{
    alert("Don't worry, you're young at heart");
}
alert("Thank you");

//Example function
var add = function(x,y)
{
    var z = x + y;
    return z;
}

//var sum = add(5, 13);
//var sum2 = add(3, 4);
////alert(sum);
//output.innerHTML = sum + ", " + sum2;

var constant = 32;

function celsiusToFarenheit(temperature){
    var farenheitTemp = temperature * 9 / 5 + constant;
    return farenheitTemp;
}
output.innerHTML = celsiusToFarenheit(100);

// Sample nested functions

function hypotenuse(a,b)
{
    function square(x){
        return x*x;
    }
    return Math.sqrt(square(a) + square(b));
}

output2.innerHTML = hypotenuse(3,4);

// Sample Recursion

function func1(num, exp){
    if(exp === 0){
        return 1;
    }
    return num * func1(num, exp-1);
}

var answer = func1(4,3);
output3.innerHTML = answer;

//Sample Arrays

function range(max){
    var retVal = [];
    for ( var i = 0; i < max; i++){
        retVal.push(i * 2);
    }
    var last = retVal.pop();
    alert(last);
    return retVal;
}

alert(range(5));