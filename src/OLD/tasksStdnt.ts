// 1. Функция sum принимает параметром целые положительные
// числа (неопределённое кол-во) и возвращает их сумму (rest).

export function sum( ...nums: Array<any>): number {
    return nums.reduce((acc, el) => acc + el)
}


// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника.
// Функция должна возвращать:
//  - "10", если треугольник равносторонний,
//  - "01", если треугольник равнобедренный,
//  - "11", если треугольник обычный,
//  - "00", если такого треугольника не существует.

export function getTriangleType(a: number,b: number,c: number): string {
    if (a + b <= c || a + c <= b || b + c <= a) return "00"
    if (a === b && b === c) return "10"
    if (a === b || a === c || b === c) return "01"
    return "11"
}


// 3. Функция getSum принимает параметром целое число и возвращает
// сумму цифр этого числа

export function getSum(number: number): number{

    let string = String(number)
    let sum = 0
    for (let i = 0; i < string.length; i++)
        sum += Number(string[i])
    return sum
}


// 4. Функция принимает isEvenIndexSumGreater параметром массив чисел.
// Если сумма чисел с чётными ИНДЕКСАМИ!!! (0 как чётный индекс) больше
// суммы чисел с нечётными ИНДЕКСАМИ!!!, то функция возвращает true.
// В противном случае - false.

export const isEvenIndexSumGreater = (arr: Array<number>): boolean => {

    let chetSum = 0;
    let neChetSum = 0;

    for (let i = 0; i < arr.length; i=i+2)
        chetSum += arr[i]
    for (let i = 1; i < arr.length; i=i+2)
        neChetSum += arr[i]
    if (chetSum > neChetSum)
        return true
    else return false
}


// 5. Функция isSquareGreater принимает два параметра: площадь круга и
// площадь квадрата. Функция должна возвращать true если круг не будет выступать за пределы
// квадрата и false в противном случае. Центры фигур совпадают.

export function isSquareGreater(areaCr: number, areaSq: number): boolean {

    let aCr = Math.sqrt(4 * Math.PI * areaCr)
    let aSq = Math.sqrt(areaSq)

    if (aCr < aSq)
        return false
    else return true
}


// 6. Функция-банкомат принимает параметром целое натуральное число (сумму).
// Возвращает массив с наименьшим количеством купюр, которыми можно выдать эту
// сумму. Доступны банкноты следующих номиналов:
// const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1].
// Считаем, что количество банкнот каждого номинала не ограничено

// Д.З.:
export function getBanknoteList(amountOfMoney: number): Array<number> {

    let cc = amountOfMoney
    let bb = []
    const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1]

    for (let i = 0; i < banknotes.length; i++) {
        while (cc - banknotes[i] >= 0) {
            bb.push(banknotes[i])
            cc = cc - banknotes[i]
        }
    }
    return bb
}