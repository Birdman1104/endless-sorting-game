import { ItemModel, ItemType } from './ItemModel';
import { ObservableModel } from './ObservableModel';

export class BoxModel extends ObservableModel {
    private _i: number;
    private _j: number;
    private _elements: ItemModel[] = [];
    private _reserve: ItemModel[] = [];

    constructor(private config: BoxModelConfig) {
        super('BoxModel');

        this._i = config.i;
        this._j = config.j;

        this.makeObservable();
    }

    get i(): number {
        return this._i;
    }

    get j(): number {
        return this._j;
    }

    get elements(): ItemModel[] {
        return this._elements;
    }

    set elements(value: ItemModel[]) {
        this._elements = value;
    }

    get reserve(): ItemModel[] {
        return this._reserve;
    }

    public initialize(): void {
        this._elements = this.config.elements.map(
            (element, i) => new ItemModel(element, (this._i * 3 + this._j) * 3 + i),
        );
    }

    public empty(): void {
        this._elements = [];
    }

    public addElements(items: ItemType[]): void {
        const temp = items.map((item, i) => new ItemModel(item, (this._i * 3 + this._j) * 3 + i));
        this._elements = temp;
    }
}
