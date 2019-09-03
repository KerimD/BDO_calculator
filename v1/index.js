/*
    index.js
    Deniz Kerim
*/

/*
    TO DO
        - save previous setting (DONE)
            - and display it
        - tell the user to make sure he puts numbers into empty inputs (DONE)
            - make it look better
        - add bound accessories
            - add more rarities
        - cut my nails (DONE)
        - create arrays for global variables (DONE)
        - turn the success tables into array of hash tables (DONE)
        - make the calculatedTable scrollable 0 - 120 (HARD)
        - fix bug where when you select base - pri it shows 15 - pri (HARD)
        - once an option is selected remove that option from the dropdown (HARD)
        - create classes for each option so can remove options whenever
        - if the cost is negative color it red
        - show larger cost table
		- on load set up the css depending on how many options I have put in html
		- update baseItem, preEnhanceItem, postEnhanceItem by using market automatically (HARD)
*/

// array for cost of failstacks
var COST_OF_FAILSTACKS = new Array(122);
var CURR_TYPE;
var CURR_RARITY;
var CURR_LEVEL;

// Array of input required for table
var ITEM_COSTS = [
    166000,
    198000,
    3450000,
    1600000,
    3980000,
    2240000,
    null,
    null,
    null
];

var ITEM_COSTS_DEFAULT_VALUES = [
    166000,
    198000,
    3450000,
    1600000,
    3980000,
    2240000
];
/*
    index | name                                | cost
    0     | blackStoneWeapon                    | 166000
    1     | blackStoneArmor                     | 198000
    2     | sharpBlackCrystalShard              | 3450000
    3     | hardBlackCrystalShard               | 1600000
    4     | concentratedMagicalBlackStoneWeapon | 3980000
    5     | concentratedMagicalBlackStoneArmor  | 2240000
    6     | baseItem                            | null
    7     | preEnhanceItem                      | null
    8     | postEnhanceItem                     | null
*/

// 2d array with i being which ITEM_COSTS and j being values in ITEM_COSTS
var ITEM_COSTS_HISTORY = [];

// 2d array
// input: i = fs = 0-120 and j = enhance level
// output: % chance for accessory item to succeed
var SUCCESS_ACCESSORIES = new Array(121);

// 2d array
// input: i = fs = 0-120 and j = enhance level
// output: % chance for armor item to succeed
var SUCCESS_ARMOR = new Array(121);

/*  FUNCTIONS */

// this runs on load
function createArrays() {
    //testStuff();
    createCostFailstacks();
    createArmorArray();
    createAccessoryArray();
}

const testStuff = () => {
    let test = new Array(2);
    test[0] = 'first';
    test['hello'] = 'blah';

    console.log(test[0]);
    console.log(test['hello']);
};

function createCostFailstacks() {
    for (i = 0; i <= 121; i++) {
        COST_OF_FAILSTACKS[i] =
            -0.0126 * i ** 6 +
            3.4562 * i ** 5 -
            327.46 * i ** 4 +
            16654 * i ** 3 -
            335630 * i ** 2 +
            2000000 * i -
            1000000;
    }
}

function createArmorArray() {}

// builds SUCCESS_ACCESSORIES
function createAccessoryArray() {
    SUCCESS_ACCESSORIES[0] = new Array();

    SUCCESS_ACCESSORIES[0]['15 - PRI'] = 0.25;
    SUCCESS_ACCESSORIES[0]['PRI - DUO'] = 0.1;
    SUCCESS_ACCESSORIES[0]['DUO - TRI'] = 0.075;
    SUCCESS_ACCESSORIES[0]['TRI - TET'] = 0.025;
    SUCCESS_ACCESSORIES[0]['TET - PEN'] = 0.005;

    for (let i = 1; i <= 120; i++) {
        SUCCESS_ACCESSORIES[i] = new Array();

        let prevValue_0 = SUCCESS_ACCESSORIES[i - 1]['15 - PRI'];
        let prevValue_1 = SUCCESS_ACCESSORIES[i - 1]['PRI - DUO'];
        let prevValue_2 = SUCCESS_ACCESSORIES[i - 1]['DUO - TRI'];
        let prevValue_3 = SUCCESS_ACCESSORIES[i - 1]['TRI - TET'];
        let prevValue_4 = SUCCESS_ACCESSORIES[i - 1]['TET - PEN'];

        if (i <= 18) {
            SUCCESS_ACCESSORIES[i]['15 - PRI'] = prevValue_0 + 0.025;
            SUCCESS_ACCESSORIES[i]['PRI - DUO'] = prevValue_1 + 0.01;
            SUCCESS_ACCESSORIES[i]['DUO - TRI'] = prevValue_2 + 0.0075;
            SUCCESS_ACCESSORIES[i]['TRI - TET'] = prevValue_3 + 0.0025;
        } else if (i <= 40) {
            SUCCESS_ACCESSORIES[i]['15 - PRI'] = prevValue_0 + 0.005;
            SUCCESS_ACCESSORIES[i]['PRI - DUO'] = prevValue_1 + 0.01;
            SUCCESS_ACCESSORIES[i]['DUO - TRI'] = prevValue_2 + 0.0075;
            SUCCESS_ACCESSORIES[i]['TRI - TET'] = prevValue_3 + 0.0025;
        } else if (i <= 44) {
            SUCCESS_ACCESSORIES[i]['15 - PRI'] = prevValue_0 + 0.005;
            SUCCESS_ACCESSORIES[i]['PRI - DUO'] = prevValue_1 + 0.002;
            SUCCESS_ACCESSORIES[i]['DUO - TRI'] = prevValue_2 + 0.0075;
            SUCCESS_ACCESSORIES[i]['TRI - TET'] = prevValue_3 + 0.0025;
        } else if (i <= 58) {
            SUCCESS_ACCESSORIES[i]['15 - PRI'] = prevValue_0 + 0.005;
            SUCCESS_ACCESSORIES[i]['PRI - DUO'] = prevValue_1 + 0.002;
            SUCCESS_ACCESSORIES[i]['DUO - TRI'] = prevValue_2 + 0.0015;
            SUCCESS_ACCESSORIES[i]['TRI - TET'] = prevValue_3 + 0.0025;
        } else if (i <= 110) {
            SUCCESS_ACCESSORIES[i]['PRI - DUO'] = prevValue_1 + 0.002;
            SUCCESS_ACCESSORIES[i]['DUO - TRI'] = prevValue_2 + 0.0015;
            SUCCESS_ACCESSORIES[i]['TRI - TET'] = prevValue_3 + 0.0025;
        } else {
            SUCCESS_ACCESSORIES[i]['PRI - DUO'] = prevValue_1 + 0.002;
            SUCCESS_ACCESSORIES[i]['DUO - TRI'] = prevValue_2 + 0.0015;
            SUCCESS_ACCESSORIES[i]['TRI - TET'] = prevValue_3 + 0.0005;
        }

        // the amount that the level 'TET - PEN' increases never changes
        SUCCESS_ACCESSORIES[i]['TET - PEN'] = prevValue_4 + 0.0005;
    }
}

/*function createAccTable() {
    var table = document.getElementById("accTable");
    for (i = 120; i >= 0; i--) {
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        cell1.style.border = "3px solid";
        cell2.style.border = "3px solid";
        cell3.style.border = "3px solid";
        cell4.style.border = "3px solid";
        cell5.style.border = "3px solid";
        cell6.style.border = "3px solid";
        cell1.innerHTML = i;
        cell2.innerHTML = Math.floor(SUCCESS_ACCESSORIES[i][0] * 10000) / 100;
        cell3.innerHTML = Math.floor(SUCCESS_ACCESSORIES[i][1] * 10000) / 100;
        cell4.innerHTML = Math.floor(SUCCESS_ACCESSORIES[i][2] * 10000) / 100;
        cell5.innerHTML = Math.floor(SUCCESS_ACCESSORIES[i][3] * 10000) / 100;
        cell6.innerHTML = Math.floor(SUCCESS_ACCESSORIES[i][4] * 10000) / 100;
    }
    table.style.width = "400px";
    table.style.backgroundColor = "white";
    table.style.fontSize = "30px";
    table.style.marginLeft = "auto";
    table.style.marginRight = "auto";
}*/

function updateGlobalitemCosts() {
    var inputs = document.getElementsByClassName('inputNum');
    var firstDropbtn = document.getElementsByClassName('dropbtn')[0];

    // update first 6 global variables if the user input their own number
    for (i = 0; i <= 5; i++) {
        // if user has inputed a value
        if (inputs[i].value) {
            ITEM_COSTS[i] = inputs[i].value;
        } else {
            ITEM_COSTS[i] = ITEM_COSTS_DEFAULT_VALUES[i];
        }
    }

    // update last 3 global variables
    // this input won't require value unless one of those two options is selected
    if (
        firstDropbtn.innerHTML == 'Accessory' ||
        firstDropbtn.innerHTML == 'Functional Clothes'
    ) {
        if (inputs[6].value) {
            ITEM_COSTS[6] = inputs[6].value;
        } else {
            alert('Please Input Cost of Base Item');
            return;
        }
    }
    // this input won't require value if CURR_LEVEL == "15 - PRI"
    if (CURR_LEVEL == '15 - PRI') {
        // set pre-enhance cost = base cost
        ITEM_COSTS[7] = inputs[6].value;
    } else {
        if (inputs[7].value) {
            ITEM_COSTS[7] = inputs[7].value;
        } else {
            alert('Please Input Cost of Item Pre-Enhance');
            return;
        }
    }

    if (inputs[8].value) {
        ITEM_COSTS[8] = inputs[8].value;
    } else {
        alert('Please Input Cost of Item Post-Enhance');
        return;
    }

    // update ITEM_COSTS_HISTORY
    ITEM_COSTS_HISTORY.push(ITEM_COSTS);

    // create and display table
    createCostTable();
    showCostTable();
}

function createCostTable() {
    // create an array of all costs
    var costArray = new Array(121);

    for (i = 0; i <= 120; i++) {
        costArray[i] = Math.floor(calculateCost(i));
    }

    // find heighest cost
    var heighestCost = -999999999;
    var heighestCostLocation;

    for (i = 0; i <= 120; i++) {
        if (costArray[i] > heighestCost) {
            heighestCost = costArray[i];
            heighestCostLocation = i;
        }
    }

    var newFailstacks = new Array(9);
    var newTableValues = new Array(9);

    // find locations of what to display
    if (heighestCostLocation - 5 < 0) {
        newFailstacks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    } else if (heighestCostLocation + 5 > 120) {
        newFailstacks = [112, 113, 114, 115, 116, 117, 118, 119, 120];
    } else {
        newFailstacks = [
            heighestCostLocation - 4,
            heighestCostLocation - 3,
            heighestCostLocation - 2,
            heighestCostLocation - 1,
            heighestCostLocation,
            heighestCostLocation + 1,
            heighestCostLocation + 2,
            heighestCostLocation + 3,
            heighestCostLocation + 4
        ];
    }

    // find values of those locations
    var tempJ = 0;

    for (i = newFailstacks[0]; i < newFailstacks[0] + 9; i++) {
        newTableValues[tempJ] = costArray[i];
        tempJ++;
    }

    // fill table
    var table = document.getElementById('costTable');

    for (i = 0; i < 9; i++) {
        var row = table.insertRow(-1);

        var fsCell = row.insertCell(0);
        var costCell = row.insertCell(1);

        fsCell.innerHTML = newFailstacks[i];
        costCell.innerHTML = newTableValues[i].toLocaleString();

        fsCell.style.textAlign = 'center';
        costCell.style.textAlign = 'center';
        fsCell.style.borderRight = '2px solid red';
    }
}

function calculateCost(fs) {
    let cost, success, fail;

    if (CURR_TYPE == 'Accessory') {
        success = SUCCESS_ACCESSORIES[fs][CURR_LEVEL];
        fail = 1 - success;

        // fancy statistics equation
        cost =
            fail *
                (COST_OF_FAILSTACKS[fs + 1] -
                    COST_OF_FAILSTACKS[fs] -
                    ITEM_COSTS[6] -
                    ITEM_COSTS[7]) +
            success *
                (ITEM_COSTS[8] -
                    ITEM_COSTS[6] -
                    ITEM_COSTS[7] -
                    COST_OF_FAILSTACKS[fs]);
    }
    return cost;
}

function showCostTable() {
    document.getElementById('everythingElse').style.filter = 'blur(4px)';
    document.getElementById('grayout').style.display = 'block';
    //document.getElementsById("costTable").style.display = "block";
}

function hideCostTable() {
    document.getElementById('everythingElse').style.filter = 'blur(0px)';
    document.getElementById('grayout').style.display = 'none';
    //document.getElementsById("costTable").style.display = "none";
    document.getElementById('costTable').innerHTML = '';
}

function updateDropdown(dropdownNumber, option) {
    var hiddenDropdowns, inputs;

    dropdown = document.getElementsByClassName('dropdown')[dropdownNumber];
    dropbtns = document.getElementsByClassName('dropbtn');
    middleOptions = document.getElementsByClassName('middleOption');
    inputs = document.getElementsByClassName('inputNum');
    hiddenDropdowns = document.getElementsByClassName('hiddenDropdown');

    // procede only if new option is selected
    if (dropbtns[dropdownNumber].innerHTML != option) {
        // if previous option was functional clothes we need to reset the third class(lastOption)
        if (dropbtns[dropdownNumber].innerHTML == 'Functional Clothes') {
            document.getElementsByClassName('lastOption')[2].className =
                'middleOption';
        }

        dropbtns[dropdownNumber].innerHTML = option;

        if (dropdownNumber != 2) {
            // hide calculate button and reset values of inputs
            document.getElementsByClassName('calc')[0].style.display = 'none';
            for (i = 6; i <= 8; i++) {
                inputs[i].value = '';
            }

            // hiding all dropdowns ahead of one changed
            for (i = dropdownNumber; i < hiddenDropdowns.length; i++) {
                hiddenDropdowns[i].style.display = 'none';
            }

            // if first(type) dropdown
            if (dropdownNumber == 0) {
                // update global var
                CURR_TYPE = option;

                // hiding item costs
                document.getElementsByClassName('base-item')[0].style.display =
                    'none';
                document.getElementsByClassName('base-item')[1].style.display =
                    'none';
                document.getElementsByClassName(
                    'pre-enhance'
                )[0].style.display = 'none';
                document.getElementsByClassName(
                    'pre-enhance'
                )[1].style.display = 'none';
                document.getElementsByClassName(
                    'post-enhance'
                )[0].style.display = 'none';
                document.getElementsByClassName(
                    'post-enhance'
                )[1].style.display = 'none';

                // reset special cases
                middleOptions[21].innerHTML = '15 - PRI';
                document.getElementsByClassName('lastOption')[2].style.display =
                    'block';

                // reset middleOptions 7 - 25
                for (i = 6; i <= 24; i++) {
                    middleOptions[i].style.display = 'block';
                }

                //if Armor is selected
                if (option == 'Armor') {
                    // hide middleOptions 7 - 12
                    for (i = 6; i < 11; i++) {
                        middleOptions[i].style.display = 'none';
                    }
                }
                //if Weapon is selected
                else if (option == 'Weapon') {
                    // hide middleOptions 7 - 14
                    for (i = 6; i < 13; i++) {
                        middleOptions[i].style.display = 'none';
                    }
                }
                // if Accessories are selected
                else if (option == 'Accessory') {
                    /*
                    // reset and show Rarity Button
                    dropbtns[1].innerHTML = "Select Rarity";
                    hiddenDropdowns[0].style.display = "inline-block";
                    */

                    // replace option 21
                    middleOptions[21].innerHTML = 'BASE - PRI';

                    // hide middleOptions 7 - 21
                    for (i = 6; i <= 20; i++) {
                        middleOptions[i].style.display = 'none';
                    }
                }
                // if Functional Clothes are selected
                else if (option == 'Functional Clothes') {
                    // hide and replace last option
                    document.getElementsByClassName(
                        'lastOption'
                    )[2].style.display = 'none';
                    middleOptions[10].className = 'lastOption';

                    // hide middleOptions 12 - 25 but is set to 23 cuz prev thing makes it shorter
                    for (i = 10; i <= 23; i++) {
                        middleOptions[i].style.display = 'none';
                    }
                }
            }

            // if second(rarity) dropdown
            /*if (dropdownNumber == 1) {
                // update global var
                CURR_RARITY = option;
            }*/

            // reset and show Level button
            dropbtns[2].innerHTML = 'Select Level';
            hiddenDropdowns[1].style.display = 'inline-block';
        }

        // if third(level) dropdown
        if (dropdownNumber == 2) {
            // hide pre-enhance input
            document.getElementsByClassName('pre-enhance')[0].style.display =
                'none';
            document.getElementsByClassName('pre-enhance')[1].style.display =
                'none';

            // update global var
            CURR_LEVEL = option;

            // show base item cost if accessory or functional clothes
            if (
                dropbtns[0].innerHTML == 'Accessory' ||
                dropbtns[0].innerHTML == 'Functional Clothes'
            ) {
                document.getElementsByClassName('base-item')[0].style.display =
                    'inline';
                document.getElementsByClassName('base-item')[1].style.display =
                    'inline';
            }

            // show cost of item PRE and POST enhance
            // only show pre if not selecting first option
            if (option != '15 - PRI') {
                document.getElementsByClassName(
                    'pre-enhance'
                )[0].style.display = 'inline';
                document.getElementsByClassName(
                    'pre-enhance'
                )[1].style.display = 'inline';
            }
            document.getElementsByClassName('post-enhance')[0].style.display =
                'inline';
            document.getElementsByClassName('post-enhance')[1].style.display =
                'inline';

            // show calculate button
            document.getElementsByClassName('calc')[0].style.display =
                'inline-block';
        }
    }
}
