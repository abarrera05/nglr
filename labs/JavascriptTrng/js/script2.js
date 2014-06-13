var age = Number(prompt("What is your age? ", ""));

var string = "";

for (var theAge = age; theAge > 0; theAge -= 1)
{
    string += "Happy Birthday \n";
}

alert(string);

// another example (similar to IF/Then statement)
var x = 5;
var y = x < 10 ? x : 10;
// this example would give y = 5, if x=14, then y=10