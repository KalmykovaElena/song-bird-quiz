export function mixArray(array) {
    let newArr = [...array]
    for (let i = newArr.length - 2; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr
}