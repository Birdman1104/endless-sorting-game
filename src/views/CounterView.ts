import { lego } from '@armathai/lego';
import { Container, Rectangle } from 'pixi.js';
import { ITEMS } from '../data/LevelData';
import { BoardModelEvents } from '../events/ModelEvents';
import { ItemType } from '../models/ItemModel';
import { ItemCounter } from './ItemCounter';

export class CounterView extends Container {
    private counters: ItemCounter[] = [];

    constructor() {
        super();

        lego.event
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

    private onCounterAUpdate(value: number): void {
        this.counters.find((c) => c.type === ItemType.A)?.updateCounter(value);
    }

    private onCounterBUpdate(value: number): void {
        this.counters.find((c) => c.type === ItemType.B)?.updateCounter(value);
    }

    private onCounterCUpdate(value: number): void {
        this.counters.find((c) => c.type === ItemType.C)?.updateCounter(value);
    }

    private onCounterDUpdate(value: number): void {
        this.counters.find((c) => c.type === ItemType.D)?.updateCounter(value);
    }

    private onCounterEUpdate(value: number): void {
        this.counters.find((c) => c.type === ItemType.E)?.updateCounter(value);
    }
}
