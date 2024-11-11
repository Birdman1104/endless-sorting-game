import { lego } from '@armathai/lego';
import anime from 'animejs';
import { Container, Point, Rectangle, Sprite } from 'pixi.js';
import { ITEMS } from '../data/LevelData';
import { BoardEvents } from '../events/MainEvents';
import { BoardModelEvents } from '../events/ModelEvents';
import { ItemType } from '../models/ItemModel';
import { COUNTER_ITEM_SIZE, ItemCounter } from './ItemCounter';
import { BOARD_ITEM_SIZE } from './ItemView';
export class CounterView extends Container {
    private counters: ItemCounter[] = [];

    constructor() {
        super();

        lego.event
            .on(BoardEvents.AnimateMatch, this.onMatch, this)
            .on(BoardModelEvents.CounterAUpdate, this.onCounterAUpdate, this)
            .on(BoardModelEvents.CounterBUpdate, this.onCounterBUpdate, this)
            .on(BoardModelEvents.CounterCUpdate, this.onCounterCUpdate, this)
            .on(BoardModelEvents.CounterDUpdate, this.onCounterDUpdate, this)
            .on(BoardModelEvents.CounterEUpdate, this.onCounterEUpdate, this);

        this.build();
    }

    public getBounds(skipUpdate?: boolean | undefined, rect?: Rectangle | undefined): Rectangle {
        return new Rectangle(0, 0, 940, 120);
    }

    private build(): void {
        ITEMS.forEach((item, index) => {
            const itemCounter = new ItemCounter(item);
            itemCounter.position.set(itemCounter.width / 2 + 200 * index, itemCounter.height / 2);
            this.addChild(itemCounter);
            this.counters.push(itemCounter);
        });
    }

    private onMatch(type: ItemType, positions: Point[]): void {
        const counter = this.counters.find((c) => c.type === type)!;

        positions.forEach((pos) => {
            const { x, y } = this.toLocal(pos);

            const sprite = Sprite.from(`item_${type}.png`);
            sprite.anchor.set(0.5);
            const originalSize = sprite.width;
            const scale = (BOARD_ITEM_SIZE / sprite.width) * this.scale.x * 1.2;
            sprite.scale.set(scale);
            sprite.position.set(x, y);
            this.addChild(sprite);

            anime({
                targets: sprite,
                x: counter.x,
                y: counter.y,
                duration: 500,
                easing: 'easeOutQuad',
            });

            anime({
                targets: sprite.scale,
                x: COUNTER_ITEM_SIZE / originalSize,
                y: COUNTER_ITEM_SIZE / originalSize,
                duration: 500,
                easing: 'easeOutQuad',
                complete: () => {
                    this.removeChild(sprite);
                    sprite.destroy();
                    counter.updateCounter();
                },
            });
        });
    }

    private onCounterAUpdate(value: number): void {
        this.counters.find((c) => c.type === ItemType.A)?.updateNextValue(value);
    }

    private onCounterBUpdate(value: number): void {
        this.counters.find((c) => c.type === ItemType.B)?.updateNextValue(value);
    }

    private onCounterCUpdate(value: number): void {
        this.counters.find((c) => c.type === ItemType.C)?.updateNextValue(value);
    }

    private onCounterDUpdate(value: number): void {
        this.counters.find((c) => c.type === ItemType.D)?.updateNextValue(value);
    }

    private onCounterEUpdate(value: number): void {
        this.counters.find((c) => c.type === ItemType.E)?.updateNextValue(value);
    }
}
