/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
 function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            
            searchResults = searchByTraits(people);
            let traitPeople = displayPeople(searchResults);
            if (searchResults.length > 1){
                app(searchResults)
            }
            alert(traitPeople);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! *COMPLETE* TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            //COMPLETE
            let personFamily = findPersonFamily(person[0], people);
            let personFamilyString = displayPeople(personFamily);
            alert(personFamilyString);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = recursiveFindDescendants(person[0], people);
            let personDescendantsString = displayPeople(personDescendants);
            alert(personDescendantsString);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `Date of Birth: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;

    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    //alert(personInfo);
    return personInfo;
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁

function findPersonFamily(personObj={}, peopleArr=[]) {
    let spouse = findById(personObj, peopleArr, "currentSpouse"); 
    let parents = findParents(personObj, peopleArr);
    let siblings = findSiblings(personObj, peopleArr);
    
    return spouse.concat(parents).concat(siblings)
    
}
    
function findById (personObj, peopleArr, personPropStr){
    return peopleArr.filter(function(item){return personObj[personPropStr] === item.id})
}

function findParents(personObj, peopleArr){
    return peopleArr.filter(function(item){
        return personObj.parents.includes(item.id)
    })
}

function findSiblings(personObj, peopleArr){
    return peopleArr.filter(function(item){
        return personObj.parents.includes(item.parents[0]) || personObj.parents.includes(item.parents[1])
    })
}

//relationship between the parent and their descendents- 
//if 'id' is included in the lookup's 'parents' array. Like findsibilings function

function findPersonDescendants(personObj=[], peopleArr=[]){
    let descendants = findDescendants(personObj, peopleArr)
    return descendants
}

function findDescendants(personObj, peopleArr){
    return peopleArr.filter(function(item){
        return personObj.id === item.parents[0] || personObj.id === item.parents[1]
    })
}

function recusiveFindPersonDescendants(personObj=[], peopleArr=[]){
    let descendants = recursiveFindDescendants(personObj, peopleArr)
    return descendants
}

function recursiveFindDescendants(personObj, peopleArr, descendants = []){
    let descendantsSubArray = peopleArr.filter(function(item){
        return personObj.id === item.parents[0] || personObj.id === item.parents[1]
    })
    descendants = descendants.concat(descendantsSubArray)
    if (descendantsSubArray.length ===0) {
        return descendants
    }
    for (let i = 0; i < descendantsSubArray.length; i++){
        descendants = descendants.concat(recursiveFindDescendants(descendantsSubArray[i], peopleArr))
    }
    return descendants;
}

//TODO recursion for descendants, look for umbrella code demo
//TODO 4 - look at mario kart (can be about 10 lines. taking a list of people from 22, if gets a list and filters down a smaller list, and we keep passing the list to a smaller self.) Need to find 1 person. send them right to main menu.

function traitsfunction(searchOfPeople){
    if (searchOfPeople.length === 1){
        displayPeople(searchOfPeople)
        return searchOfPeople
    }
    if (searchOfPeople > 1){
        displayPeople(searchOfPeople)
        alert('Do you see anyone here from this list?')
        let searchOfPeople = searchByTraits(searchOfPeople)
    }
    
    
}


function searchByTraits(people){
    let numberOfTraits = howManyTraits()
    if (numberOfTraits === 1){
        let trait = whichTraits()
        let traitSelection = prompt("Select what you are looking for.")
        let arrayofPeople = people.filter(function(item){
            if(item[trait].includes(traitSelection)){
                return true;
            } 
        });  
        return arrayofPeople
    }
    if (numberOfTraits === 2){
        let traitOne = whichTraits()
        let traitTwo = whichTraits()
        let traitSelectionOne = prompt("Select what you are looking for.")
        let traitSelectionTwo = prompt("Select what you are looking for.")
        let arrayOfPeople = people.filter(function(item){
            return item[traitOne].includes(traitSelectionOne) && item[traitTwo].includes(traitSelectionTwo)
    }); 
    return arrayOfPeople
    }
    let displayPeople = displayPeople(arrayOfPeople)
    alert(displayPeople)
    if (arrayOfPeople.length > 1){
        app(arrayOfPeople)
    }
    return arrayOfPeople
}




function howManyTraits(){
    let numberOfTraits = promptFor("How many traits would you like to search for?", chars)
    numberOfTraits = parseInt(numberOfTraits)
    return numberOfTraits
}

function whichTraits(){
    //for (let i = 0; i <number; i++){
        let whichTrait = promptFor("Which trait would you like to search for?\
        \nPress 1 for: gender\
        \nPress 2 for: Eye Color\
        \nPress 3 for: Occupation", 
        chars)
        let numTrait = parseInt(whichTrait)
        if (numTrait === 1){
            let trait = 'gender';
            return trait}
        if (numTrait === 2){
                let trait = 'eyeColor'
                return trait}
        if (numTrait === 3){
                let trait = 'occupation'
                return trait}     
        }

    


/* This function will be useful for STRINGIFYING a collection of person-objects
* first and last name properties in order to easily send the information
* to the user in the form of an alert().
* @param {Array} people        A collection of person objects.
*/
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
 }
 