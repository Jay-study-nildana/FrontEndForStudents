// Description: This script will parse the response from the OpenAI API and return the ingredients and instructions for the recipe.

// //parse a string with /n

// var str = "Hello\nWorld";
// console.log(str);

// //parse a string with /n into array

// var str = "Hello
// World";
// var arr = str.split("
// ");
// console.log(arr);

// //split string into array based on /n

// var str = "Hello
// World";
// var arr = str.split("
// ");
// console.log(arr);

// //split string into array based on /n

// var str = "Hello
// World";
// var arr = str.split("
// ");
// console.log(arr);

var text1 = "\n\nIngredients:\n\n-2 cups of milk\n-3 tablespoons of cocoa powder\n-2 tablespoons of sugar\n-1 teaspoon of vanilla extract\n-Whipped cream (optional)\n-Marshmallows (optional)\n\nInstructions:\n\n1. In a medium saucepan, heat the milk over medium heat until it is hot but not boiling.\n\n2. Add the cocoa powder, sugar, and vanilla extract and whisk until all the ingredients are combined.\n\n3. Continue to heat the mixture until it is hot and steamy.\n\n4. Pour the hot chocolate into mugs and top with whipped cream and marshmallows, if desired.\n\n5. Enjoy!"

var arr = text1.split("\n\n");

console.log(arr);

var ingredients = arr[2].split("\n");

//console.log(ingredients);

//remove specific character from string

// var str = "Hello World";
// var newStr = str.replace("o", "");

var ingredients = arr[2].split("\n");

var ingredients2 = [];

ingredients.forEach(function(item, index) {
    //console.log(item);
     var item2 = item.replace("-", "");
     //console.log(item2);
     ingredients2.push(item2);
});

//console.log(ingredients);
console.log(ingredients2);

//remove first three elements from arr

//var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

var instructions = arr.slice();

instructions.splice(0, 4);

console.log(instructions);

// {
//     "model": "text-davinci-003",
//     "prompt": "how to make pizza",
//     "temperature": 0,
//     "max_tokens": 500
// }


var pizzaResponse = "\n\n1. Preheat the oven to 425°F (220°C).\n\n2. Roll out the pizza dough on a lightly floured surface.\n\n3. Place the dough on a greased baking sheet or pizza pan.\n\n4. Spread the pizza sauce over the dough.\n\n5. Sprinkle the desired amount of cheese over the sauce.\n\n6. Add your favorite toppings.\n\n7. Bake the pizza for 15-20 minutes, or until the cheese is melted and the crust is golden brown.\n\n8. Let the pizza cool for a few minutes before slicing and serving. Enjoy!"

var pizzaArr = pizzaResponse.split("\n\n");

var pizzaInstructions = pizzaArr.slice();

console.log(pizzaInstructions);

// {
//     "model": "text-davinci-003",
//     "prompt": "how to make bread",
//     "temperature": 0,
//     "max_tokens": 500
// }


var breadResponse = "\n\n1. Gather the ingredients: You will need all-purpose flour, active dry yeast, salt, sugar, and warm water.\n\n2. Mix the dry ingredients: In a large bowl, whisk together the flour, yeast, salt, and sugar.\n\n3. Add the water: Slowly pour in the warm water and mix until a dough forms.\n\n4. Knead the dough: Turn the dough out onto a lightly floured surface and knead for about 10 minutes, until the dough is smooth and elastic.\n\n5. Let the dough rise: Place the dough in a lightly greased bowl, cover with a damp cloth, and let rise in a warm place for about 1 hour, or until doubled in size.\n\n6. Punch down the dough: Punch down the dough and turn it out onto a lightly floured surface.\n\n7. Shape the dough: Shape the dough into a loaf and place it in a lightly greased loaf pan.\n\n8. Let the dough rise again: Cover the loaf with a damp cloth and let rise in a warm place for about 45 minutes, or until doubled in size.\n\n9. Preheat the oven: Preheat the oven to 375°F (190°C).\n\n10. Bake the bread: Bake the bread for 30-35 minutes, or until golden brown.\n\n11. Cool the bread: Remove the bread from the oven and let cool before slicing."

var breadArr = breadResponse.split("\n\n");

var breadInstructions = breadArr.slice(1);

console.log(breadInstructions);

// {
//     "model": "text-davinci-003",
//     "prompt": "how to make chocolate",
//     "temperature": 0,
//     "max_tokens": 500
// }

// {
//     "model": "text-davinci-003",
//     "prompt": "how to make cake",
//     "temperature": 0,
//     "max_tokens": 500
// }

// {
//     "model": "text-davinci-003",
//     "prompt": "how to make cookies",
//     "temperature": 0,
//     "max_tokens": 500
// }

var string1 = `This AI guy is so amazing. I already have a 15-hour work week. This guy will help me achieve 10-hour work week. Or, I will use that extra 5 hours to make more money. Oh my god, I love this mother (insert expletive)!

Okay, I signed up for the subscription last night. Now, here is the part that excites me.

I quote direclty from the website.

Whether you’re working in a new language or framework, or just learning to code, GitHub Copilot can help you find your way. Tackle a bug, or learn how to use a new framework without spending most of your time spelunking through the docs or searching the web.

Think about this for a minute. I work as a coding tutor. That means, for the last 10 years, and probably till I semi-retire in a few years from now (and until I die), my life is essentially teaching the basics to my students from all over the world.

Coding Tutors such as I, are mostly repeating ourselves to every student we meet.

Seriously, that’s all we do.

I must have taught how to use ‘for loops’, like thousands of times over the last 10 years. The thing is, thanks to internet and YouTube and forums like Stack Overflow, a lot of times, students don’t really need tutors to help them with code.

However, what they need is, someone to explain the code and how it works.

This is where AI will help me. Right now, when explaining stuff, I can now rely on the AI to generate the code that I want. Further, the students can do the same. We can spend more time discussion and understanding the code, instead of writing it ourselves.

Also, it will save plenty of hours that would be spent find ‘sample’ code online, both for me and my students.

Ultimately, I am pumped.

The subscription prices are reasonable even by Indian standards and the strong dollar/weak rupee situation. If used well, this could help people like me (tutors) and first-time learners like students and fresher developers.`

var string1Arr = string1.split("\n");

console.log(string1Arr);

var output = "";
string1Arr.forEach(function (element) {
    //console.log(element);

    if(element.length > 0)
    {
        output += element + "/n/n";
    }

    //console.log(output);


});

console.log(output);

// {
//     "model": "text-davinci-003",
//     "prompt": "Correct this to standard English: /n/nThis AI guy is so amazing. I already have a 15-hour work week. This guy will help me achieve 10-hour work week. Or, I will use that extra 5 hours to make more money. Oh my god, I love this mother (insert expletive)!/n/nOkay, I signed up for the subscription last night. Now, here is the part that excites me./n/nI quote direclty from the website./n/nWhether you’re working in a new language or framework, or just learning to code, GitHub Copilot can help you find your way. Tackle a bug, or learn how to use a new framework without spending most of your time spelunking through the docs or searching the web./n/nThink about this for a minute. I work as a coding tutor. That means, for the last 10 years, and probably till I semi-retire in a few years from now (and until I die), my life is essentially teaching the basics to my students from all over the world./n/nCoding Tutors such as I, are mostly repeating ourselves to every student we meet./n/nSeriously, that’s all we do./n/nI must have taught how to use ‘for loops’, like thousands of times over the last 10 years. The thing is, thanks to internet and YouTube and forums like Stack Overflow, a lot of times, students don’t really need tutors to help them with code./n/nHowever, what they need is, someone to explain the code and how it works./n/nThis is where AI will help me. Right now, when explaining stuff, I can now rely on the AI to generate the code that I want. Further, the students can do the same. We can spend more time discussion and understanding the code, instead of writing it ourselves./n/nAlso, it will save plenty of hours that would be spent find ‘sample’ code online, both for me and my students./n/nUltimately, I am pumped./n/nThe subscription prices are reasonable even by Indian standards and the strong dollar/weak rupee situation. If used well, this could help people like me (tutors) and first-time learners like students and fresher developers./n/n",
//     "temperature": 0,
//     "max_tokens": 2000
// }







