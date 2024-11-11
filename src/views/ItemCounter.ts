import { Container, Graphics, Rectangle, Sprite, Text } from 'pixi.js';
import { fitText } from '../Utils';
import { ItemType } from '../models/ItemModel';

const SIZE = 120;
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

    public getBounds(skipUpdate?: boolean | undefined, rect?: Rectangle | undefined): Rectangle {
        return new Rectangle(0, 0, SIZE, SIZE);
    }

    public updateCounter(value: number): void {
        this.counter.text = value.toString();
        fitText(this.counter, SIZE / 2 - 10, SIZE / 2 - 10);
    }

    private build(): void {
        this.buildItem();
        this.buildCounter();
    }

    private buildItem(): void {
        this.sprite = Sprite.from(`item_${this.type}.png`);
        this.sprite.anchor.set(0.5);
        const scale = SIZE / this.sprite.width;
        this.sprite.scale.set(scale);
        this.addChild(this.sprite);
    }

    private buildCounter(): void {
        const gr = new Graphics();
        gr.beginFill(0xf54284);
        gr.drawCircle(SIZE / 2, -SIZE / 2, SIZE / 4);
        gr.endFill();
        this.addChild(gr);

        this.counter = new Text('0', { fill: 0xffffff, fontSize: 40 });
        this.counter.anchor.set(0.5);
        this.counter.position.set(SIZE / 2, -SIZE / 2);
        this.addChild(this.counter);
    }
}
