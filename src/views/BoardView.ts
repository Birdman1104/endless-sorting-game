import { lego } from '@armathai/lego';
import { Container, Point, Rectangle } from 'pixi.js';
import { BoardModelEvents } from '../events/ModelEvents';
import { BoxModel } from '../models/BoxModel';
import { DropDownAreaInfo } from '../utils/DropDownAreaInfo';
import { BoxView } from './BoxView';
import { ItemView } from './ItemView';

export class BoardView extends Container {
    private boxes: BoxView[] = [];
    private items: ItemView[] = [];

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
        //
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

        console.warn(this.dropAreas);

        data.forEach((box, j) => {
            box.elements.forEach((element, i) => {
                const dropArea = this.dropAreas[j * 3 + i];
                console.warn(dropArea.centerX, dropArea.centerY, j * 3 + i);
                const { x, y } = this.toLocal(new Point(dropArea.centerX, dropArea.centerY));
                const item = new ItemView(element);
                item.position.set(x, y);
                dropArea.setItem(item);
                item.setArea(dropArea);
                item.setOriginalPosition(x, y);
                // this.setDragEvents(item);
                this.items.push(item);
            });
        });

        this.items.forEach((item) => this.addChild(item));
        // for (let i = 0; i < 3; i++) {
        //     for (let j = 0; j < 3; j++) {
        //         const box = new BoxView(i, j, `${i}-${j}`);
        //         box.x = ;
        //         box.y = ;
        //         this.addChild(box);
        //     }
        // }
    }
}
