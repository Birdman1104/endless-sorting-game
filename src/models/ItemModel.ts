import { ObservableModel } from './ObservableModel';

export enum ItemType {
    A = '0',
    B = '1',
    C = '2',
    D = '3',
    E = '4',
}

export class ItemModel extends ObservableModel {
    constructor(private _type: ItemType, private _index: number) {
        super('ItemModel');
        this.makeObservable();
    }

    get type(): ItemType {
        return this._type;
    }

    get index(): number {
        return this._index;
    }

    set type(value: ItemType) {
        this._type = value;
    }
}
