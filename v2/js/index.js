/* Deniz Kerim */

/*
    TO DO
		- Save previous Inputs
        - Custom msg for not filling inputs
        - Do a better job of centering Fs, Cost
        - Commas for numbers
        - 
*/

/*
	BUGS
		- Make good for 4k screens
        - When you click on the input it doesn't go to correct position (seems unfixable)
        - Information for Select Level is just horrible
        - Media screen thing is giving sass bugs with css grid
        - 
*/

/*
	IDEAS
		- Ammar said: blank out the inputs on the left when you select
		  something that those don't pertain to
		- Elbarya: said make yellow a checkbox (DONE)
		- Elbayra: only scroll through the table not the whole page (DONE)
		- maybe disable auto re calculate on input change for mobile view (DONE)
		- BAYCEL: make multipe tables
		- Compare previous inputs so you don't have to recalculate every time
		- 
*/

// =============================================================
// Global Variables

// could pull from market in future for up to date defaults
const ITEM_COSTS = {
    memoryFragment: 2000000,
    blackStoneWeapon: 166000,
    blackStoneArmor: 198000,
    sharpBlackCrystalShard: 3450000,
    hardBlackCrystalShard: 1600000,
    concentratedMagicalBlackStoneWeapon: 3980000,
    concentratedMagicalBlackStoneArmor: 2240000,
    baseItem: null,
    preEnhanceItem: null,
    postEnhanceItem: null
};

// in order to reset ITEM_COSTS if user removed own value
const DEFAULT_ITEM_COSTS = {
    memoryFragment: 2000000,
    blackStoneWeapon: 166000,
    blackStoneArmor: 198000,
    sharpBlackCrystalShard: 3450000,
    hardBlackCrystalShard: 1600000,
    concentratedMagicalBlackStoneWeapon: 3980000,
    concentratedMagicalBlackStoneArmor: 2240000,
    baseItem: null,
    preEnhanceItem: null,
    postEnhanceItem: null
};

// a predicted cost to achieve a certain failstack
const COST_OF_FAILSTACKS = new Array(122);

// 2d array
// input: i = fs = 0-120 and j = enhance level
// output: % chance for item to succeed
const SUCCESS_ACCESSORIES = new Array(121);
const SUCCESS_ARMOR = new Array(121);
const SUCCESS_WEAPONS = new Array(121);
const SUCCESS_FUNCTIONAL_CLOTHES = new Array(121);

// =============================================================
// CLASSES
class commaLinkedList {
    constructor() {
        this.rootNode = new Node();
        this.len = 0;
    }

    printList() {
        let tempNode = this.rootNode;
        let theList = '';

        while (tempNode) {
            theList += tempNode.val;
            tempNode = tempNode.next;
        }

        console.log(theList);
    }

    insert(digit) {
        if (this.rootNode.val == null) {
            this.rootNode.val = digit;
            return;
        }

        let tempNode = this.rootNode;

        while (tempNode.next) {
            tempNode = tempNode.next;
        }

        tempNode.next = new Node(digit);
    }

    removeCommas() {}
}

class Node {
    constructor(value = null) {
        this.val = value;
        this.next = null;
    }
}

// =============================================================
// TESTING FUNCTION FOR WHATEVER
const testFunction = () => {
    console.log(typeof ITEM_COSTS.blackStoneWeapon);
};

// =============================================================
// ON LOAD STUFF (STUFF THAT RUNS ON LOAD)
const load_stuff = () => {
    // testFunction();
    generateFailstackCosts();
    generateAccessoryChances();
    generateArmorChances();
    generateWeaponChances();
    console.log('Loading Successful :D');
};

// Has been tested
const generateFailstackCosts = () => {
    for (let fs = 0; fs < 122; fs++) {
        // polynomial to predict the cost of failstacks
        COST_OF_FAILSTACKS[fs] =
            -0.0126 * fs ** 6 +
            3.4562 * fs ** 5 -
            327.46 * fs ** 4 +
            16654 * fs ** 3 -
            335630 * fs ** 2 +
            2000000 * fs -
            1000000;
    }
};

const generateAccessoryChances = () => {
    SUCCESS_ACCESSORIES[0] = new Array();

    // setting the base success chance
    SUCCESS_ACCESSORIES[0]['PRI'] = 0.25;
    SUCCESS_ACCESSORIES[0]['DUO'] = 0.1;
    SUCCESS_ACCESSORIES[0]['TRI'] = 0.075;
    SUCCESS_ACCESSORIES[0]['TET'] = 0.025;
    SUCCESS_ACCESSORIES[0]['PEN'] = 0.005;

    // fs = failstack
    for (let fs = 1; fs < 121; fs++) {
        SUCCESS_ACCESSORIES[fs] = new Array();

        // previous values
        let prevValue_0 = SUCCESS_ACCESSORIES[fs - 1]['PRI'];
        let prevValue_1 = SUCCESS_ACCESSORIES[fs - 1]['DUO'];
        let prevValue_2 = SUCCESS_ACCESSORIES[fs - 1]['TRI'];
        let prevValue_3 = SUCCESS_ACCESSORIES[fs - 1]['TET'];
        let prevValue_4 = SUCCESS_ACCESSORIES[fs - 1]['PEN'];

        // if (failstack <= some_number) then incrememnt the previous value by some decimal
        if (fs <= 18) {
            SUCCESS_ACCESSORIES[fs]['PRI'] = fixRoundOff(prevValue_0 + 0.025);
            SUCCESS_ACCESSORIES[fs]['DUO'] = fixRoundOff(prevValue_1 + 0.01);
            SUCCESS_ACCESSORIES[fs]['TRI'] = fixRoundOff(prevValue_2 + 0.0075);
            SUCCESS_ACCESSORIES[fs]['TET'] = fixRoundOff(prevValue_3 + 0.0025);
        } else if (fs <= 40) {
            SUCCESS_ACCESSORIES[fs]['PRI'] = fixRoundOff(prevValue_0 + 0.005);
            SUCCESS_ACCESSORIES[fs]['DUO'] = fixRoundOff(prevValue_1 + 0.01);
            SUCCESS_ACCESSORIES[fs]['TRI'] = fixRoundOff(prevValue_2 + 0.0075);
            SUCCESS_ACCESSORIES[fs]['TET'] = fixRoundOff(prevValue_3 + 0.0025);
        } else if (fs <= 44) {
            SUCCESS_ACCESSORIES[fs]['PRI'] = fixRoundOff(prevValue_0 + 0.005);
            SUCCESS_ACCESSORIES[fs]['DUO'] = fixRoundOff(prevValue_1 + 0.002);
            SUCCESS_ACCESSORIES[fs]['TRI'] = fixRoundOff(prevValue_2 + 0.0075);
            SUCCESS_ACCESSORIES[fs]['TET'] = fixRoundOff(prevValue_3 + 0.0025);
        } else if (fs <= 58) {
            SUCCESS_ACCESSORIES[fs]['PRI'] = fixRoundOff(prevValue_0 + 0.005);
            SUCCESS_ACCESSORIES[fs]['DUO'] = fixRoundOff(prevValue_1 + 0.002);
            SUCCESS_ACCESSORIES[fs]['TRI'] = fixRoundOff(prevValue_2 + 0.0015);
            SUCCESS_ACCESSORIES[fs]['TET'] = fixRoundOff(prevValue_3 + 0.0025);
        } else if (fs <= 110) {
            SUCCESS_ACCESSORIES[fs]['PRI'] = prevValue_0;
            SUCCESS_ACCESSORIES[fs]['DUO'] = fixRoundOff(prevValue_1 + 0.002);
            SUCCESS_ACCESSORIES[fs]['TRI'] = fixRoundOff(prevValue_2 + 0.0015);
            SUCCESS_ACCESSORIES[fs]['TET'] = fixRoundOff(prevValue_3 + 0.0025);
        } else {
            SUCCESS_ACCESSORIES[fs]['PRI'] = prevValue_0;
            SUCCESS_ACCESSORIES[fs]['DUO'] = fixRoundOff(prevValue_1 + 0.002);
            SUCCESS_ACCESSORIES[fs]['TRI'] = fixRoundOff(prevValue_2 + 0.0015);
            SUCCESS_ACCESSORIES[fs]['TET'] = fixRoundOff(prevValue_3 + 0.0005);
        }

        // the amount that the level 'TET - PEN' increases never changes
        SUCCESS_ACCESSORIES[fs]['PEN'] = fixRoundOff(prevValue_4 + 0.0005);
    }
};

const generateArmorChances = () => {
    SUCCESS_ARMOR[0] = new Array();
    let prevValue = new Array(15);
    let incOfInc = new Array(15);

    // setting the base success chance
    SUCCESS_ARMOR[0]['+6'] = 0.7;
    SUCCESS_ARMOR[0]['+7'] = 0.2564;
    SUCCESS_ARMOR[0]['+8'] = 0.1724;
    SUCCESS_ARMOR[0]['+9'] = 0.1176;
    SUCCESS_ARMOR[0]['+10'] = 0.0769;
    SUCCESS_ARMOR[0]['+11'] = 0.0625;
    SUCCESS_ARMOR[0]['+12'] = 0.05;
    SUCCESS_ARMOR[0]['+13'] = 0.04;
    SUCCESS_ARMOR[0]['+14'] = 0.0286;
    SUCCESS_ARMOR[0]['+15'] = 0.02;
    SUCCESS_ARMOR[0]['PRI'] = 0.1176;
    SUCCESS_ARMOR[0]['DUO'] = 0.0769;
    SUCCESS_ARMOR[0]['TRI'] = 0.0625;
    SUCCESS_ARMOR[0]['TET'] = 0.02;
    SUCCESS_ARMOR[0]['PEN'] = 0.003;

    // fs = failstack
    for (let fs = 1; fs < 121; fs++) {
        SUCCESS_ARMOR[fs] = new Array();

        let counter = 0;
        for (let key in SUCCESS_ARMOR[fs - 1]) {
            prevValue[counter] = SUCCESS_ARMOR[fs - 1][key];
            counter += 1;
        }

        // for +6
        if (fs < 15) {
            // increase of increase
            incOfInc[0] = 0.014;
        } else if (fs == 15) {
            incOfInc[0] = 0.004;
        } else {
            incOfInc[0] = 0;
        }

        // for +7
        if (fs <= 18) {
            incOfInc[1] = 0.0257;
        } else if (fs < 54) {
            incOfInc[1] = 0.0051;
        } else if (fs == 54) {
            incOfInc[1] = 0.0026;
        } else {
            incOfInc[1] = 0;
        }

        // for +8
        if (fs <= 31) {
            incOfInc[2] = 0.0173;
        } else if (fs <= 87) {
            incOfInc[2] = 0.0035;
        } else if (fs == 88) {
            incOfInc[2] = 0.0001;
        } else {
            incOfInc[2] = 0;
        }

        // for +9
        if (fs <= 50) {
            incOfInc[3] = 0.0118;
        } else {
            incOfInc[3] = 0.0023;
        }

        // for +10
        if (fs <= 82) {
            incOfInc[4] = 0.0077;
        } else {
            incOfInc[4] = 0.0015;
        }

        // for +11
        if (fs <= 102) {
            incOfInc[5] = 0.0062;
        } else {
            incOfInc[5] = 0.0013;
        }

        // for +12
        incOfInc[6] = 0.005;

        // for +13
        incOfInc[7] = 0.004;

        // for +14
        incOfInc[8] = 0.0028;

        // for +15
        incOfInc[9] = 0.002;

        // for PRI
        if (fs <= 50) {
            incOfInc[10] = 0.0117;
        } else {
            incOfInc[10] = 0.0023;
        }

        // for DUO
        if (fs <= 82) {
            incOfInc[11] = 0.0077;
        } else {
            incOfInc[11] = 0.0015;
        }

        // for TRI
        if (fs <= 102) {
            incOfInc[12] = 0.0062;
        } else {
            incOfInc[12] = 0.0012;
        }

        // for TET
        incOfInc[13] = 0.002;

        // for PEN
        incOfInc[14] = 0.0003;

        counter = 0;
        for (let key in SUCCESS_ARMOR[fs - 1]) {
            SUCCESS_ARMOR[fs][key] = fixRoundOff(
                prevValue[counter] + incOfInc[counter]
            );
            counter += 1;
        }
    }
};

const generateWeaponChances = () => {
    SUCCESS_WEAPONS[0] = new Array();
    let prevValue = new Array(13);
    let incOfInc = new Array(13);

    // setting the base success chance
    SUCCESS_WEAPONS[0]['+8'] = 0.7;
    SUCCESS_WEAPONS[0]['+9'] = 0.2041;
    SUCCESS_WEAPONS[0]['+10'] = 0.1429;
    SUCCESS_WEAPONS[0]['+11'] = 0.1;
    SUCCESS_WEAPONS[0]['+12'] = 0.0667;
    SUCCESS_WEAPONS[0]['+13'] = 0.04;
    SUCCESS_WEAPONS[0]['+14'] = 0.025;
    SUCCESS_WEAPONS[0]['+15'] = 0.02;
    SUCCESS_WEAPONS[0]['PRI'] = 0.1176;
    SUCCESS_WEAPONS[0]['DUO'] = 0.0769;
    SUCCESS_WEAPONS[0]['TRI'] = 0.0625;
    SUCCESS_WEAPONS[0]['TET'] = 0.02;
    SUCCESS_WEAPONS[0]['PEN'] = 0.003;

    // fs = failstack
    for (let fs = 1; fs < 121; fs++) {
        SUCCESS_WEAPONS[fs] = new Array();

        let counter = 0;
        for (let key in SUCCESS_WEAPONS[fs - 1]) {
            prevValue[counter] = SUCCESS_WEAPONS[fs - 1][key];
            counter += 1;
        }

        // for +8
        if (fs <= 14) {
            incOfInc[0] = 0.014;
        } else if (fs == 15) {
            incOfInc[0] = 0.004;
        } else {
            incOfInc[0] = 0;
        }

        // for +9
        if (fs <= 25) {
            incOfInc[1] = 0.0205;
        } else if (fs <= 70) {
            incOfInc[1] = 0.004;
        } else if (fs == 71) {
            incOfInc[1] = 0.002;
        } else {
            incOfInc[1] = 0;
        }

        // for +10
        if (fs <= 39) {
            incOfInc[2] = 0.0142;
        } else if (fs <= 108) {
            incOfInc[2] = 0.0028;
        } else if (fs == 109) {
            incOfInc[2] = 0.0026;
        } else {
            incOfInc[2] = 0;
        }

        // for +11
        if (fs <= 60) {
            incOfInc[3] = 0.01;
        } else {
            incOfInc[3] = 0.002;
        }

        // for +12
        if (fs <= 95) {
            incOfInc[4] = 0.0066;
        } else {
            incOfInc[4] = 0.0013;
        }

        // for +13
        incOfInc[5] = 0.004;

        // for +14
        incOfInc[6] = 0.0025;

        // for +15
        incOfInc[7] = 0.002;

        // for PRI
        if (fs <= 50) {
            incOfInc[8] = 0.0117;
        } else {
            incOfInc[8] = 0.0023;
        }

        // for DUO
        if (fs <= 82) {
            incOfInc[9] = 0.0077;
        } else {
            incOfInc[9] = 0.0015;
        }

        // for TRI
        if (fs <= 102) {
            incOfInc[10] = 0.0062;
        } else {
            incOfInc[10] = 0.0012;
        }

        // for TET
        incOfInc[11] = 0.002;

        // for PEN
        incOfInc[11] = 0.0003;

        counter = 0;
        for (let key in SUCCESS_WEAPONS[fs - 1]) {
            SUCCESS_WEAPONS[fs][key] = fixRoundOff(
                prevValue[counter] + incOfInc[counter]
            );
            counter += 1;
        }
    }
};

const generateFunctionalClothesChance = () => {
    SUCCESS_WEAPONS[0] = new Array();
    let prevValue = new Array(5);
    let incOfInc = new Array(5);

    // setting the base success chance
    SUCCESS_FUNCTIONAL_CLOTHES[0]['+1'] = 0.3;

    // fs = failstack
    for (let fs = 1; fs < 121; fs++) {
        SUCCESS_WEAPONS[fs] = new Array();

        let counter = 0;
        for (let key in SUCCESS_WEAPONS[fs - 1]) {
            prevValue[counter] = SUCCESS_WEAPONS[fs - 1][key];
            counter += 1;
        }

        // for +8
        if (fs <= 14) {
            incOfInc[0] = 0.014;
        } else if (fs == 15) {
            incOfInc[0] = 0.004;
        } else {
            incOfInc[0] = 0;
        }

        // for +9
        if (fs <= 25) {
            incOfInc[1] = 0.0205;
        } else if (fs <= 70) {
            incOfInc[1] = 0.004;
        } else if (fs == 71) {
            incOfInc[1] = 0.002;
        } else {
            incOfInc[1] = 0;
        }

        // for +10
        if (fs <= 39) {
            incOfInc[2] = 0.0142;
        } else if (fs <= 108) {
            incOfInc[2] = 0.0028;
        } else if (fs == 109) {
            incOfInc[2] = 0.0026;
        } else {
            incOfInc[2] = 0;
        }

        // for +11
        if (fs <= 60) {
            incOfInc[3] = 0.01;
        } else {
            incOfInc[3] = 0.002;
        }

        // for +12
        if (fs <= 95) {
            incOfInc[4] = 0.0066;
        } else {
            incOfInc[4] = 0.0013;
        }

        // for +13
        incOfInc[5] = 0.004;

        // for +14
        incOfInc[6] = 0.0025;

        // for +15
        incOfInc[7] = 0.002;

        // for PRI
        if (fs <= 50) {
            incOfInc[8] = 0.0117;
        } else {
            incOfInc[8] = 0.0023;
        }

        // for DUO
        if (fs <= 82) {
            incOfInc[9] = 0.0077;
        } else {
            incOfInc[9] = 0.0015;
        }

        // for TRI
        if (fs <= 102) {
            incOfInc[10] = 0.0062;
        } else {
            incOfInc[10] = 0.0012;
        }

        // for TET
        incOfInc[11] = 0.002;

        // for PEN
        incOfInc[11] = 0.0003;

        counter = 0;
        for (let key in SUCCESS_WEAPONS[fs - 1]) {
            SUCCESS_WEAPONS[fs][key] = fixRoundOff(
                prevValue[counter] + incOfInc[counter]
            );
            counter += 1;
        }
    }
};

// rounds the number the given amount of decimal places
const fixRoundOff = (number, decimal = 4) => {
    return Math.trunc(number * Math.pow(10, decimal)) / Math.pow(10, decimal);
};

// =============================================================
// STUFF THAT RUNS WHEN YOU CLICK CALCULATE BUTTON OR CHANGE INPUTS
const calculate = () => {
    console.log('Calculating...');

    if (!updateItemCosts()) {
        console.log('User left blank input(s)...');
        return;
    }

    let costs = calculateCosts();

    if (document.getElementsByClassName('sort-checkbox')[0].checked) {
        displayFSTable(quickSort([...costs]));
    } else {
        displayFSTable(costs);
    }
};

// returns true if successful
const updateItemCosts = () => {
    // newValue will be false if there is no input from user
    let newValue;

    // update first 6 inputs or advanced options in case user replaced default
    let advancedInputs = document.getElementsByClassName('advanced-input');

    counter = 0;
    for (let key in ITEM_COSTS) {
        if (counter >= 7) {
            break;
        }
        newValue = advancedInputs[counter].value;
        if (newValue) {
            ITEM_COSTS[key] = Number(newValue);
        } else {
            ITEM_COSTS[key] = DEFAULT_ITEM_COSTS[key];
        }
        counter++;
    }

    // update last 3 inputs. These 3 inputs are required
    let itemCostInputs = document.getElementsByClassName('item-cost-input');
    let typeSelect = document.getElementsByClassName('type-select')[0].value;
    let as = document.getElementsByClassName('input-field-as');
    let errorMsg = '';

    newValue = itemCostInputs[0].value;
    if (newValue) {
        ITEM_COSTS.baseItem = Number(newValue);
    } else {
        errorMsg = true;
    }

    newValue = itemCostInputs[1].value;
    if (newValue) {
        ITEM_COSTS.preEnhanceItem = Number(newValue);
    } else {
        errorMsg = true;
    }

    newValue = itemCostInputs[2].value;
    if (newValue) {
        ITEM_COSTS.postEnhanceItem = Number(newValue);
    } else {
        errorMsg = true;
    }

    // can improve this a lot maybe display psedu elements next to input
    if (errorMsg) {
        // alert(errorMsg);
        return false;
    }

    return true;
};

const calculateCosts = () => {
    let costArray = new Array(121);

    for (let fs = 0; fs < 121; fs++) {
        costArray[fs] = [fs, Math.floor(calculateCost(fs))];
    }

    return costArray;
};

const calculateCost = fs => {
    let currType = document.getElementsByClassName('type-select')[0].value;
    let currLevel = document.getElementsByClassName('level-select')[0].value;
    let yellow = document.getElementsByClassName('grade-checkbox')[0].checked;
    let cost, success, fail;

    if (currType == 'Accessory') {
        success = SUCCESS_ACCESSORIES[fs][currLevel];
        fail = 1 - success;

        // fancy statistics equation
        cost =
            fail *
                (COST_OF_FAILSTACKS[fs + 1] -
                    COST_OF_FAILSTACKS[fs] -
                    ITEM_COSTS.baseItem -
                    ITEM_COSTS.preEnhanceItem) +
            success *
                (ITEM_COSTS.postEnhanceItem -
                    ITEM_COSTS.baseItem -
                    ITEM_COSTS.preEnhanceItem -
                    COST_OF_FAILSTACKS[fs]);
    } else if (currType == 'Armor') {
        success = SUCCESS_ARMOR[fs][currLevel];
        fail = 1 - success;

        let upgradeStone;
        if (
            currLevel == 'PRI' ||
            currLevel == 'DUO' ||
            currLevel == 'TRI' ||
            currLevel == 'TET' ||
            currLevel == 'PEN'
        ) {
            upgradeStone = ITEM_COSTS.concentratedMagicalBlackStoneArmor;
        } else {
            upgradeStone = ITEM_COSTS.blackStoneArmor;
        }

        let durabilityCost;
        if (yellow) {
            durabilityCost = 10 * ITEM_COSTS.memoryFragment;
        } else {
            durabilityCost = ITEM_COSTS.baseItem;
        }

        cost =
            fail *
                (COST_OF_FAILSTACKS[fs + 1] -
                    durabilityCost -
                    upgradeStone -
                    ITEM_COSTS.preEnhanceItem -
                    COST_OF_FAILSTACKS[fs]) +
            success *
                (ITEM_COSTS.postEnhanceItem -
                    upgradeStone -
                    ITEM_COSTS.preEnhanceItem -
                    COST_OF_FAILSTACKS[fs]);
    } else if (currType == 'Weapon') {
        success = SUCCESS_WEAPONS[fs][currLevel];
        fail = 1 - success;

        let upgradeStone;
        if (
            currLevel == 'PRI' ||
            currLevel == 'DUO' ||
            currLevel == 'TRI' ||
            currLevel == 'TET' ||
            currLevel == 'PEN'
        ) {
            upgradeStone = ITEM_COSTS.concentratedMagicalBlackStoneWeapon;
        } else {
            upgradeStone = ITEM_COSTS.blackStoneWeapon;
        }

        let durabilityCost;
        if (yellow) {
            durabilityCost = 10 * ITEM_COSTS.memoryFragment;
        } else {
            durabilityCost = ITEM_COSTS.baseItem;
        }

        cost =
            fail *
                (COST_OF_FAILSTACKS[fs + 1] -
                    durabilityCost -
                    upgradeStone -
                    ITEM_COSTS.preEnhanceItem -
                    COST_OF_FAILSTACKS[fs]) +
            success *
                (ITEM_COSTS.postEnhanceItem -
                    upgradeStone -
                    ITEM_COSTS.preEnhanceItem -
                    COST_OF_FAILSTACKS[fs]);
    }

    return cost;
};

const quickSort = costs => {
    if (costs.length < 2) return costs;

    let tempCost,
        pivot = costs.length - 1,
        i = 0,
        j = costs.length - 2;

    while (!(i > j)) {
        while (!(i > costs.length - 1) && costs[i][1] > costs[pivot][1]) {
            i++;
        }
        while (!(j < 0) && costs[j][1] < costs[pivot][1]) {
            j--;
        }
        if (!(i > j)) {
            tempCost = costs[i];
            costs[i] = costs[j];
            costs[j] = tempCost;
            i++;
            j--;
        }
    }

    tempCost = costs[i];
    costs[i] = costs[pivot];
    costs[pivot] = tempCost;
    pivot = i;

    return [
        ...quickSort(costs.slice(0, pivot)),
        costs[pivot],
        ...quickSort(costs.slice(pivot + 1, costs.length))
    ];
};

// const mergeSort = costs => {
//     if (costs.length > 1) {
//         let mid = parseInt(costs.length / 2);

//         L = costs.slice(0, mid);
//         R = costs.slice(mid, costs.length);

//         L = mergeSort(L);
//         R = mergeSort(R);

//         let i = 0,
//             j = 0,
//             k = 0;

//         while (i < L.length && j < R.length) {
//             if (L[i][1] < R[j][1]) {
//                 costs[k] = L[i];
//                 i += 1;
//             } else {
//                 costs[k] = R[j];
//                 j += 1;
//             }
//             k += 1;
//         }

//         while (i < L.length) {
//             costs[k] = L[i];
//             i += 1;
//             k += 1;
//         }

//         while (j < R.length) {
//             costs[k] = R[j];
//             j += 1;
//             k += 1;
//         }
//     }

//     return costs;
// };

const returnMaxIdx = list => {
    let max_idx = 0;
    let max = list[max_idx][1];

    for (number in list) {
        if (list[number][1] > max) {
            max = list[number][1];
            max_idx = number;
        }
    }

    return max_idx;
};

const displayFSTable = costs => {
    let table = document.getElementsByClassName('values-fs-table')[0];
    let counter = 0;

    // reset table
    table.innerHTML = '';

    for (x in costs) {
        div = document.createElement('div');
        text = document.createTextNode(costs[x][0]);
        div.appendChild(text);
        div.className = 'failstack';

        if (costs[x][1] > 0) {
            div.style.backgroundColor = 'green';
            div.style.borderColor = 'darkgreen';
        } else {
            div.style.backgroundColor = 'red';
            div.style.borderColor = 'darkred';
        }
        if (counter % 2 == 1) {
            div.style.opacity = '.7';
        }
        table.appendChild(div);

        div = document.createElement('div');
        text = document.createTextNode(costs[x][1]);
        div.appendChild(text);
        div.className = 'cost';

        if (costs[x][1] > 0) {
            div.style.backgroundColor = 'green';
            div.style.borderColor = 'darkgreen';
        } else {
            div.style.backgroundColor = 'red';
            div.style.borderColor = 'darkred';
        }
        if (counter % 2 == 1) {
            div.style.opacity = '.7';
        }
        table.appendChild(div);

        counter += 1;
    }

    document.getElementsByClassName('fs-table')[0].style.display = 'block';
};

const updateLevel = selectDropdown => {
    let levelSelect = document.getElementsByClassName('level-select')[0];
    let tempOption;

    // disable grade dropdown for certain types of items
    let gradeSelect = document.getElementsByClassName('grade-checkbox')[0];
    if (
        selectDropdown.value == 'Accessory' ||
        selectDropdown.value == 'Functional Clothes'
    ) {
        gradeSelect.disabled = true;
    } else {
        gradeSelect.disabled = false;
    }

    // reset dropdown
    levelSelect.innerHTML = '';

    if (selectDropdown.value == 'Armor') {
        tempOption = document.createElement('option');
        tempOption.innerHTML = '+6';
        levelSelect.add(tempOption);
        tempOption = document.createElement('option');
        tempOption.innerHTML = '+7';
        levelSelect.add(tempOption);
    }

    if (selectDropdown.value == 'Armor' || selectDropdown.value == 'Weapon') {
        tempOption = document.createElement('option');
        tempOption.innerHTML = '+8';
        levelSelect.add(tempOption);
        tempOption = document.createElement('option');
        tempOption.innerHTML = '+9';
        levelSelect.add(tempOption);
        tempOption = document.createElement('option');
        tempOption.innerHTML = '+10';
        levelSelect.add(tempOption);
        tempOption = document.createElement('option');
        tempOption.innerHTML = '+11';
        levelSelect.add(tempOption);
        tempOption = document.createElement('option');
        tempOption.innerHTML = '+12';
        levelSelect.add(tempOption);
        tempOption = document.createElement('option');
        tempOption.innerHTML = '+13';
        levelSelect.add(tempOption);
        tempOption = document.createElement('option');
        tempOption.innerHTML = '+14';
        levelSelect.add(tempOption);
        tempOption = document.createElement('option');
        tempOption.innerHTML = '+15';
        levelSelect.add(tempOption);
    }

    if (
        selectDropdown.value == 'Armor' ||
        selectDropdown.value == 'Weapon' ||
        selectDropdown.value == 'Accessory'
    ) {
        tempOption = document.createElement('option');
        tempOption.innerHTML = 'PRI';
        levelSelect.add(tempOption);
        tempOption = document.createElement('option');
        tempOption.innerHTML = 'DUO';
        levelSelect.add(tempOption);
        tempOption = document.createElement('option');
        tempOption.innerHTML = 'TRI';
        levelSelect.add(tempOption);
        tempOption = document.createElement('option');
        tempOption.innerHTML = 'TET';
        levelSelect.add(tempOption);
        tempOption = document.createElement('option');
        tempOption.innerHTML = 'PEN';
        levelSelect.add(tempOption);
    }

    if (selectDropdown.value == 'Functional Clothes') {
        tempOption = document.createElement('option');
        tempOption.innerHTML = '+1';
        levelSelect.add(tempOption);
        tempOption = document.createElement('option');
        tempOption.innerHTML = '+2';
        levelSelect.add(tempOption);
        tempOption = document.createElement('option');
        tempOption.innerHTML = '+3';
        levelSelect.add(tempOption);
        tempOption = document.createElement('option');
        tempOption.innerHTML = '+4';
        levelSelect.add(tempOption);
        tempOption = document.createElement('option');
        tempOption.innerHTML = '+5';
        levelSelect.add(tempOption);
    }
};

const remove_as = location => {
    if (document.getElementsByClassName('item-cost-input')[location].value) {
        document.getElementsByClassName('input-field-as')[
            location
        ].style.display = 'none';
    } else {
        document.getElementsByClassName('input-field-as')[
            location
        ].style.display = 'inline';
    }
};

const placeComma = (value, input_idx) => {
    // going to create a LL because insertion is clean af ez clap
    if (value.length > 3) {
        LL = new commaLinkedList();

        for (let i = 0; i < value.length; i++) {
            LL.insert(value[i]);
        }

        LL.printList();

        // document.getElementsByClassName('input')[input_idx].value = commadValue;
    }
};

// value = removeComma(value);

// if (value.length > 3) {
//     let newValue = new Array(value.length + Math.floor((value.length-1)/3));
//     let firstComma = (value.length % 3 ? value.length % 3 : 3);
//     let value_idx = 0;

//     for (let i = firstComma; i < newValue.length; i += 4) {
//         newValue[i] = ",";
//     }

//     for (let i = 0; i < newValue.length; i++) {
//         if (!(newValue[i])) {
//             newValue[i] = value[value_idx];
//             value_idx++;
//         }
//     }

//     document.getElementsByClassName("input")[input_idx].value = newValue.join("");

// one pass
// for (let i = 0; i < newValue.length; i++) {
//     if (i % 3 == firstComma) {
//         newValue[i] = ",";
//     } else {
//         newValue[i] = value[value_idx];
//         value_idx++;
//     }
// }
// console.log(newValue);
