"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = filterTraits(people);
      break;    
    default:
       app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}


// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      displayPerson(person);
      break;
    case "family":
      findFamily(person, people);
      break;
    case "descendants":
      findDescendants(person, people);
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

function findFamily(person, people){
  let parents = findParents(person, people);
  let spouse = findSpouse(person, people);
  let siblings = findSiblings(person, people);
  displayFamily(parents, spouse, siblings);
}

function displayFamily(parents, spouse, siblings){
  let family = "Parents: " + parents + "\n";
  family += "Spouse: " + spouse + "\n";
  family += "Siblings: " + siblings + "\n";
  alert(family);
}

function findParents(person, people){
  let parents = people.filter(function(possibleParents){
    if(person.parents[0] == possibleParents.id || person.parents[1] == possibleParents.id){
      return true;
    }
    else{
      return false;
    }
  })
  let fixedParents = (parents.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
  return fixedParents;
}

function findSpouse(person, people){
  let spouse = people.filter(function(possibleSpouse){
    if(person.currentSpouse == possibleSpouse.id){
      return true;
    }
    else{
      return false;
    }
  })
  let fixedSpouse = (spouse.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
  return fixedSpouse;
}

function findSiblings(person, people){
  let siblings = people.filter(function(possibleSibs){
    if(possibleSibs.parents[0] == person.parents[0] && person.id != possibleSibs.id || 
      possibleSibs.parents[1] != null && possibleSibs.parents[1] == person.parents[1] 
      && person.id != possibleSibs.id){
      return true;
    }
    else{
      return false;
    }
  })
  
  let fixedSiblings = (siblings.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
  return fixedSiblings;
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return  foundPerson[0];
}

function findDescendants(personWithDescendants, people){
  let grandchildren;
  let children = people.filter(function(person){
    if(person.parents[0] == personWithDescendants.id || person.parents[1] == personWithDescendants.id){
      return true;
    }
    else{
      return false;
    }
   }
  )
  for(let i = 0; i < children.count; i++){
    let child = children[i];
    
    grandchildren += findDescendants(child, people);
  }
  displayPeople(children, grandchildren);
}

function searchByTrait(people){
  let searchResults;
  let promptResult = promptFor("Would you like to search by height, weight, gender, occupation, or eyes?", chars).toLowerCase();
      switch(promptResult){
        case 'height':
          searchResults = searchByHt(people);
          break;
        case 'weight':
          searchResults = searchByWgt(people);
          break;
        case 'eyes':
          searchResults = searchByEye(people);
          break;
        case 'gender':
          searchResults = searchByGender(people);
          break;
        case 'occupation':
          searchResults = searchByOcc(people);
          break;
        default:
          searchByTrait(people);
          break; 
      }
    return searchResults;
} 

function filterTraits(people){
  let personArray = people;
  while(personArray.length > 1){
    personArray = searchByTrait(personArray);
    displayPeople(personArray);
  }
  let person = personArray[0];
  return person;
}

function searchByOcc(people){
  let searchResults;
  let occupation = promptFor("What is their occupation? Enter the number Next to the occupation. 1. programmer 2. landscaper 3. assistant 4. doctor 5. politician 6. architect 7. student.", chars);
  switch(occupation){
    case '1':
      searchResults = findOcc(people, 'programmer');
      break;
    case '2':
      searchResults = findOcc(people, 'landscaper');
      break;
    case '3':
      searchResults = findOcc(people, 'assistant');
      break;
    case '4':
      searchResults = findOcc(people, 'doctor');
      break;
    case '5':
      searchResults = findOcc(people, 'politician');
      break;
    case '6':
      searchResults = findOcc(people, 'architect');
      break;
    case '7':
      searchResults = findOcc(people, 'student');
      break;
    default:
      searchByOcc(people);
      break;
  }
  return searchResults;
}

function findOcc(people, occ){
  let peopleWithOccupation = people.filter(function(person){
    if (person.occupation == occ){
      return true;
    }
    else{
      return false;
    }
  })
  return peopleWithOccupation;
}

function findGender(people, gen){
  let peopleOfGender = people.filter(function(person){
    if (person.gender == gen){
      return true;
    }
    else{
      return false;
    }
  })
  return peopleOfGender;
}

function searchByGender(people){
  let searchResults;
  let gen = promptFor("Is the person you're looking for male or female?", chars).toLowerCase();
  switch(gen){
    case 'male':
      searchResults = findGender(people, 'male');
      break;
    case 'female':
      searchResults = findGender(people, 'female');
      break;
    default:
      searchByGender(people);
  }
  return searchResults;
}

function findEyeColor(people, color){
  
  let peopleWithColor = people.filter(function(person){
    if (person.eyeColor == color){
      return true;
    }
    else{
      return false;
    }
  })
  return peopleWithColor;
}

function searchByEye(people){
  let searchResults;
  let color = promptFor("What color eyes does the person you're looking for have?" , chars).toLowerCase();
  
  switch(color){
    case 'hazel':
      searchResults = findEyeColor(people, 'hazel');
      break;
    case 'blue':
      searchResults = findEyeColor(people, 'blue');
      break; 
    case 'black':
      searchResults = findEyeColor(people, 'black');
      break;
    case 'brown':
      searchResults = findEyeColor(people, 'brown');
      break;
    case 'green':
      searchResults = findEyeColor(people, 'green');
      break;
    default:
      searchResults = searchByEye(people);
      break;
  }
  return searchResults;
}

function searchByWgt(people){
let wgt = promptFor("How much does the person you're looking for weigh?", chars).parseInt();
let results = people.filter(function(person){
  if(wgt == person.weight){
    return true;
  }
  else{
    return false;
  }
})
    return results;
}

function searchByHt(people){
  let ht = promptFor("How tall is the person you're looking for?", chars);
  parseInt(ht);
  let tallBoys = people.filter(function(person){
    if(ht == person.height){
      return true;
    }
    else{
      return false;
    }
    
  })
  return tallBoys;
}


// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}


function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Age: " + person.age + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

