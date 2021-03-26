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
      let promptResult = promptFor("Would you like to search by height, weight, or eye color?").toLowerCase();
      switch(promptResult){
        case 'height':
        
        searchResults = searchByHt(people);
          
          break;
        
        case ''
      }
      
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
    let personFamily = "Family" + person.parents + currentSpouse.firstName + "\n";
    break;
    case "descendants":
      // people.Filter(x => x.parents.Filter(x => x.id == person.id))
      people.filter(x => x.parents.filter(x => x.id == person.id))
    
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
  let actualFoundPerson = foundPerson[0];
  return actualFoundPerson;
}
.
function findDescendants(personWithDescendants, people){
  let personDescendants = people.filter(function(person){
    //if personwithdescendants's id is in a person's parents array, return true


    if(person == people.parents.filter(function(person){
      if(parents.includes(person.id)){
        return true;
      }
      else{
        return false;
      }
    })){
      return true;
    }
    else{
      return false;
    }
  })
  alert(personDescendants);
}

function searchByHt(people){
  let ht = promptfor("How tall is the person you're looking for?").ParseInt();
        let tallBoys = people.Filter(function(ht){
          if(ht == person.height){
            return true;
          }
          else{
            return false;
          }
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
