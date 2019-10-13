// ARMOR

// +6

function six(): void {
    let curr: number = 0.7;

    let column0: number[] = [];

    while (curr < 0.9) {
        column0.push(curr);
        curr += 0.014;
    }

    column0.push(curr - 0.01);

    column0.forEach((value, index, arr) => {
        arr[index] = Math.floor(arr[index] * 10000) / 10000;
    });

    console.log(column0);
}

six();
