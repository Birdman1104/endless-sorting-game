import { Container, Graphics, Sprite, Text } from 'pixi.js';
import { fitText } from '../Utils';
import { ItemType } from '../models/ItemModel';

export class ItemCounter extends Container {
    private sprite: Sprite;
    private counter: Text;

    constructor(private itemType: ItemType) {
        super();
        this.build();
    }

    get type(): ItemType {
        return this.itemType;
    }

    public updateCounter(value: number): void {
        this.counter.text = value.toString();
        fitText(this.counter, 50, 50);
    }

    private build(): void {
        this.buildItem();
        this.buildCounter();
    }

    private buildItem(): void {
        this.sprite = Sprite.from(`item_${this.type}.png`);
        this.sprite.anchor.set(0.5);
        const scale = 120 / this.sprite.width;
        this.sprite.scale.set(scale);
        this.addChild(this.sprite);
    }

    private buildCounter(): void {
        const gr = new Graphics();
        gr.beginFill(0xf54284);
        gr.drawCircle(60, -60, 30);
        gr.endFill();
        this.addChild(gr);

        this.counter = new Text('0', { fill: 0xffffff, fontSize: 40 });
        this.counter.anchor.set(0.5);
        this.counter.position.set(60, -60);
        this.addChild(this.counter);
    }
}
