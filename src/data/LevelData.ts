import { shuffle } from '../Utils';
import { ItemType } from '../models/ItemModel';

export const ITEMS = [ItemType.A, ItemType.B, ItemType.C, ItemType.D, ItemType.E];

function isValid(array) {
    for (let i = 0; i < array.length - 2; i++) {
        if (array[i] === array[i + 1] && array[i + 1] === array[i + 2]) {
            return false;
        }
    }
    return true;
}

function shuffleWithValidation(array) {
    let shuffledArray = [...array];
    do {
        shuffle(shuffledArray);
    } while (!isValid(shuffledArray));

    return shuffledArray;
}

export function getElementsData(get3Elements = false): ItemType[][][] {
    let elements: any[] = [];
    const amount = 27;
    const boxes: any[][] = [
        [[], [], []],
        [[], [], []],
        [[], [], []],
    ];

    for (let i = 0; i < amount; i++) {
        elements.push(ITEMS[Math.floor(Math.random() * ITEMS.length)]);
    }

    elements = shuffleWithValidation(elements);

    const random1 = Math.floor(Math.random() * 3);
    const random2 = Math.floor(Math.random() * 3);

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const itemsAmount = get3Elements ? 3 : getItemsAmount(i === random1 && j === random2);
            const box = boxes[i][j];
            for (let k = 0; k < itemsAmount; k++) {
                box.push(elements.pop());
            }
        }
    }

    return boxes;
}

function getItemsAmount(get2Elements = false): number {
    // 30% chance for 2 items
    // 70% chance for 3 items
    if (get2Elements) return 2; // just to make sure we have at least on box with 2 elements
    const rnd = Math.random();
    return rnd < 0.5 ? 2 : 3;
}
