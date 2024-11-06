import { Container, Sprite } from 'pixi.js';
import { ItemModel, ItemType } from '../models/ItemModel';
import { DropDownAreaInfo } from '../utils/DropDownAreaInfo';

export class ItemView extends Container {
    public originalX: number;
    public originalY: number;
    private sprite: Sprite;
    private dropArea: DropDownAreaInfo | null = null;

    constructor(private config: ItemModel) {
        super();
        this.build();
    }

    get uuid(): string {
        return this.config.uuid;
    }

    get type(): ItemType {
        return this.config.type;
    }

    get index(): number {
        return this.config.index;
    }

    get area(): DropDownAreaInfo | null {
        return this.dropArea;
    }

    public setOriginalPosition(x: number, y: number): void {
        this.originalX = x;
        this.originalY = y;
    }

    public emptyArea(): void {
        this.dropArea?.empty();
        this.dropArea = null;
    }

    public setArea(dropArea): void {
        this.dropArea = dropArea;
    }

    public dropTo(dropArea: DropDownAreaInfo): void {
        this.dropArea?.empty();
        this.dropArea = dropArea;
        this.originalX = dropArea.centerX;
        this.originalY = dropArea.centerY;
    }

    public startDrag(): void {
        this.dropArea?.empty();
        this.dropArea = null;
    }

    private build(): void {
        this.sprite = Sprite.from(`item_${this.type}.png`);
        this.sprite.anchor.set(0.5);
        const scale = 75 / this.sprite.width;
        this.sprite.scale.set(scale);
        this.addChild(this.sprite);
    }
}
