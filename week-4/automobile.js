function Automobile(year, make, model, type) {
  this.year = year; //integer (ex. 2001, 1995)
  this.make = make; //string (ex. Honda, Ford)
  this.model = model; //string (ex. Accord, Focus)
  this.type = type; //string (ex. Pickup, SUV)
  this.logMe = (bool) => {
    if (bool) {
      console.log(`${this.year} ${this.make} ${this.model} ${this.type}`);
    } else {
      console.log(`${this.year} ${this.make} ${this.model}`);
    }
  } 
}

var automobiles = [
  new Automobile(1995, "Honda", "Accord", "Sedan", false),
  new Automobile(1990, "Ford", "F-150", "Pickup", true),
  new Automobile(2000, "GMC", "Tahoe", "SUV", true),
  new Automobile(2010, "Toyota", "Tacoma", "Pickup", true),
  new Automobile(2005, "Lotus", "Elise", "Roadster", true),
  new Automobile(2008, "Subaru", "Outback", "Wagon", true)
];


function describeCars() {
  let sortedByYear = sortArr(yearComparator, automobiles);
  let sortedByMake = sortArr(makeComparator, automobiles);
  let sortedByType = sortArr(typeComparator, automobiles);

  console.log("*****");
  console.log("The cars sorted by year are:");
  sortedByYear.forEach((auto) => {
    auto.logMe(false);
  });
  console.log('\n');
  console.log("The cars sorted by make are:");
  
  sortedByMake.forEach((auto) => {
    auto.logMe(false);
  })
  console.log('\n');
  console.log("The cars sorted by type are:");
  sortedByType.forEach((auto) => {
    auto.logMe(true);
  });
  console.log("*****");
}

describeCars();

// Helper methods

function sortArr(comparator, arr) {
  // Slice makes sure that newArr doesn't also point to arr, causing
  // nasty side-effects 
  // Only works with non-deep objects like our automobile examples
  let newArr = arr.slice();

  newArr.sort((a, b) => comparator(a,b));

  return newArr;
}

function yearComparator(auto1, auto2) {
  // b - a means that b should come before a
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  return auto2.year - auto1.year;
}

function makeComparator(auto1, auto2) {
  let make1 = auto1.make.toUpperCase();
  let make2 = auto2.make.toUpperCase();

  // Compare the alphabetical order of the strings
  // Return -1 if make1 comes before make2
  if (make1 < make2) {
    return -1;
  }

  // No need for else statement because the previous
  // if statement will short-circuit the function
  return 1;
}

function typeComparator(auto1, auto2) {
  const typeHierarchy = ["wagon", "suv", "pickup", "roadster"];

  let type1 = typeHierarchy.indexOf(auto1.type.toLowerCase());
  let type2 = typeHierarchy.indexOf(auto2.type.toLowerCase());

  // Cover the edge-case that both autos are of the same type
  // In that case, the newer car should be indexed first
  if (type1 == type2) {
    return yearComparator(auto1, auto2);
  }

  return type2 - type1;
}
