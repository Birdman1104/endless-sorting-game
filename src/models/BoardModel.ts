import { getElementsData } from '../data/LevelData';
import { BoxModel } from './BoxModel';
import { ItemType } from './ItemModel';
import { ObservableModel } from './ObservableModel';

export class BoardModel extends ObservableModel {
    private _boxes: BoxModel[] = [];

    private _counterA = 0;
    private _counterB = 0;
    private _counterC = 0;
    private _counterD = 0;
    private _counterE = 0;

    constructor() {
        super('BoardModel');

        this.makeObservable();
    }

    get boxes(): BoxModel[] {
        return this._boxes;
    }

    set boxes(value: BoxModel[]) {
        this._boxes = value;
    }

    get counterA(): number {
        return this._counterA;
    }

    set counterA(value: number) {
        this._counterA = value;
    }

    get counterB(): number {
        return this._counterB;
    }

    set counterB(value: number) {
        this._counterB = value;
    }

    get counterC(): number {
        return this._counterC;
    }

    set counterC(value: number) {
        this._counterC = value;
    }

    get counterD(): number {
        return this._counterD;
    }

    set counterD(value: number) {
        this._counterD = value;
    }

    get counterE(): number {
        return this._counterE;
    }

    set counterE(value: number) {
        this._counterE = value;
    }

    public initialize(): void {
        const data = getElementsData();
        const temp: BoxModel[] = [];
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                const boxModel = new BoxModel({ i, j, elements: data[i][j] });
                boxModel.initialize();
                temp.push(boxModel);
            }
        }

        this._boxes = temp;
    }

    public addNewItems(index: number): void {
        const box = this._boxes[index];
        const data = getElementsData(true)[0][0];

        box?.empty();
        box?.addElements(data);
    }

    public updateCounter(type: ItemType): void {
        switch (type) {
            case ItemType.A:
                this._counterA += 3;
                break;
            case ItemType.B:
                this._counterB += 3;
                break;
            case ItemType.C:
                this._counterC += 3;
                break;
            case ItemType.D:
                this._counterD += 3;
                break;
            case ItemType.E:
                this._counterE += 3;
                break;
        }
    }
}
