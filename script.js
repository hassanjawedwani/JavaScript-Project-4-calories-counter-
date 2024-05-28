const caloriesCounter = document.getElementById('calories-counter')
const budgetNumberInput = document.getElementById('budget');
const dropdown = document.getElementById('options');
const addEntryBtn = document.getElementById('add-entry');
const clearBtn = document.getElementById('clear');
const output = document.getElementById('output');


// Add Entry


const addEntry = () => {
    const targetInputConatiner = document.querySelector(`#${dropdown.value} .input-container`);
    const entryNumber = document.querySelectorAll(`#${dropdown.value} input[type='text']`).length + 1;
    const stringHTML = `
    <label for="${dropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name: </label>
    <input type="text" id="${dropdown.value}-${entryNumber}-name" class="user-input">
    <label for="${dropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories:</label>
    <input type="number" id="${dropdown.value}-${entryNumber}-calories}" class="user-input">
    `;
    targetInputConatiner.insertAdjacentHTML('beforeend', stringHTML);
    
}

addEntryBtn.addEventListener ('click', addEntry);


// calculations


const getCalories = nodeList => {
    let total = 0;
    for (const numberInput of nodeList) {
        total += Number(numberInput.value);
    }
    return total;
}

const isInvalidBudget = (str) => {
    const regex = /\d+e\d+/i;
    const result = str.match(regex);
    if (result) {  // return array mean fault
        return true;
    } else {   // return null mean correct
        return false;
    }
}

const calculateCalories = (e) => {

    e.preventDefault();
    
    if (isInvalidBudget(budgetNumberInput.value)) {   // checking valid budget input
        alert ("Not a valid budget input.");
        return;
    }

    const budget = Number(budgetNumberInput.value);
    const breakfastCalories = getCalories(document.querySelectorAll(`#breakfast .input-container input[type="number"]`));
    const lunchCalories = getCalories(document.querySelectorAll(`#lunch .input-container input[type="number"]`));
    const dinnerCalories = getCalories(document.querySelectorAll(`#dinner .input-container input[type="number"]`));
    const snacksCalories = getCalories(document.querySelectorAll(`#snacks .input-container input[type="number"]`));
    const exerciseCalories = getCalories(document.querySelectorAll(`#exercise .input-container input[type="number"]`));
    const totalConsumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
    const result = ( totalConsumedCalories - exerciseCalories ) - budget;
    const deficitOrSurplus =  result > 0 ? 'Surplus' : 'Deficit';
    
    output.innerHTML += `
    <fieldset>
    <h3 class="${deficitOrSurplus.toLowerCase()}">${Math.abs(result)} Calories ${deficitOrSurplus}</h3>
    <hr>
    <h4>${budget} Calories Budgeted</h4>   
    <h4>${totalConsumedCalories} Calories Consumed</h4>   
    <h4>${exerciseCalories} Calories Burned</h4>   
    </fieldset>
    `;

}

caloriesCounter.addEventListener('submit', calculateCalories);


// clear Button

clearBtn.addEventListener('click', () => {
    budgetNumberInput.value = "";
    const nodes = document.querySelectorAll('.input-container');
    for (const oneNode of nodes) {
        oneNode.innerHTML = "";
    }
    output.innerText = "";
});