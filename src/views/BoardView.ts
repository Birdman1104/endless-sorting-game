import { lego } from '@armathai/lego';
import { Container, Graphics, Point, Rectangle } from 'pixi.js';
import { BoardModelEvents } from '../events/ModelEvents';
import { BoxModel } from '../models/BoxModel';
import { DropDownAreaInfo } from '../utils/DropDownAreaInfo';
import { BoxView } from './BoxView';
import { ItemView } from './ItemView';

export class BoardView extends Container {
    private boxes: BoxView[] = [];
    private items: ItemView[] = [];

    private blackBlocker: Graphics;

    constructor() {
        super();
        lego.event.on(BoardModelEvents.BoxesUpdate, this.onBoxesUpdate, this);

        this.build();
    }

    get dropAreas(): DropDownAreaInfo[] {
        return this.boxes.reduce((acc, box) => {
            return [...acc, ...box.dropAreas];
        }, [] as DropDownAreaInfo[]);
    }

    public getBounds(skipUpdate?: boolean | undefined, rect?: Rectangle | undefined): Rectangle {
        return new Rectangle(-300, -150, 1700, 900);
    }

    private build(): void {
        this.buildBlackBlocker();
        this.setDragEvents();
    }

    private buildBlackBlocker(): void {
        const { x, y, width, height } = this.getBounds();
        this.blackBlocker = new Graphics();
        this.blackBlocker.beginFill(0x000000, 1);
        this.blackBlocker.drawRect(x, y, width, height);
        this.blackBlocker.endFill();
        this.blackBlocker.eventMode = 'static';
        this.blackBlocker.on('pointerdown', (e) => this.onDragStart(e));
        this.blackBlocker.alpha = 0.2;
        this.addChild(this.blackBlocker);
    }

    private onBoxesUpdate(data: BoxModel[]): void {
        const arr: { x: number; y: number }[] = [];

        data.forEach((b) => {
            const box = new BoxView(b.i, b.j, b.uuid);
            const x = b.i * 550;
            const y = b.j * 300;
            arr.push({ x, y });
            box.position.set(b.i * 550, b.j * 300);
            this.boxes.push(box);
            this.addChild(box);
        });

        data.forEach((box, j) => {
            box.elements.forEach((element, i) => {
                const dropArea = this.dropAreas[j * 3 + i];
                const { x, y } = this.toLocal(new Point(dropArea.centerX, dropArea.centerY));
                const item = new ItemView(element);
                item.position.set(x, y);
                dropArea.setItem(item);
                item.setArea(dropArea);
                item.setOriginalPosition(x, y);
                this.items.push(item);
            });
        });

        this.items.forEach((item) => this.addChild(item));
    }

    private setDragEvents(): void {}

    private onDragStart(e: any): void {
        if (this.items.length === 0) return;
        const { x, y } = this.toLocal(e.data.global);
        const item = this.items.find(
            (i) =>
                x >= i.x - i.width / 2 && x <= i.x + i.width / 2 && y >= i.y - i.height / 2 && y <= i.y + i.height / 2,
        );
        console.warn(item);
        if (item) {
            this.blackBlocker.on('pointermove', (e) => {
                const { x, y } = this.toLocal(e.data.global);
                item.position.set(x, y);
            });
        }
    }
}
