//function sum(){
//	//console.log(arguments);
//	//console.log(input);
//    let total = 0;
//    for(let i=0; i<arguments.length; i++){
//        total += arguments[i];
//    }
//    return total;
//}
//console.log(sum());
//console.log(sum(1,2,3,4,5));

Function.prototype.myBind = function(ctx, ...args) {
	let that = this;

	return function(...callTimeArgs) {
		return that.apply(ctx, args.concat(callTimeArgs));
	}
}



class Cat {
	constructor(name) {
	  this.name = name;
	}
  
	says(sound, person) {
	  console.log(`${this.name} says ${sound} to ${person}!`);
	  return true;
	}
  }
  
  class Dog {
	constructor(name) {
	  this.name = name;
	}
  }
  
  const markov = new Cat("Markov");
  const pavlov = new Dog("Pavlov");
  
  markov.says("meow", "Ned");
  // Markov says meow to Ned!
  // true
  
  // bind time args are "meow" and "Kush", no call time args
  markov.says.myBind(pavlov, "meow", "Kush")();
  // Pavlov says meow to Kush!
  // true
  
  // no bind time args (other than context), call time args are "meow" and "a tree"
  markov.says.myBind(pavlov)("meow", "a tree");
  // Pavlov says meow to a tree!
  // true
  
  // bind time arg is "meow", call time arg is "Markov"
  markov.says.myBind(pavlov, "meow")("Markov");
  // Pavlov says meow to Markov!
  // true
  
  // no bind time args (other than context), call time args are "meow" and "me"
  const notMarkovSays = markov.says.myBind(pavlov);
  notMarkovSays("meow", "me");
  // Pavlov says meow to me!
  // true




function curriedSum(numArgs){
    let total = 0;
    let numbers = [];

    return function _curriedSum(num){
		for (let i = 0; i < numArgs; i++) {
        	numbers.push(num);
    		if (numbers.length === numArgs){
        		numbers.forEach(ele => {
           			total += ele;
        	}) 
			return total;
			} else {
			return curriedSum()
		}}
    }
	
}

const sum = curriedSum(4);
sum(5)(30)(20)(1); // => 56

/* 
function curriedSum(numArgs) {
  let total = 0;
  let numbers = [];

  function _curriedSum(num) {
    numbers.push(num);

    if (numbers.length === numArgs) {
      numbers.forEach(ele => {
        total += ele;
      });
      return total;
    } else {
      return _curriedSum;
    }
  }

  if (numArgs === 0) {
    return 0;
  } else {
    return _curriedSum;
  }
}

const sum = curriedSum(4);
console.log(sum(5)(30)(20)(1)); // => 56

*/