import { lego } from '@armathai/lego';
import anime from 'animejs';
import { Container, Graphics, Point, Rectangle } from 'pixi.js';
import { BoardEvents } from '../events/MainEvents';
import { BoardModelEvents } from '../events/ModelEvents';
import { BoxModel } from '../models/BoxModel';
import { DropDownAreaInfo } from '../utils/DropDownAreaInfo';
import { BoxView } from './BoxView';
import { ItemView } from './ItemView';
export class BoardView extends Container {
    private boxes: BoxView[] = [];
    private items: ItemView[] = [];
    private draggingItem: ItemView | null;

    private dropAreas: DropDownAreaInfo[];

    private canDrag = true;
    private dragStarted = false;
    private dragPoint: Point;

    private inputLayer: Graphics;

    constructor() {
        super();
        lego.event.on(BoardModelEvents.BoxesUpdate, this.onBoxesUpdate, this);

        this.build();
    }

    public getBounds(skipUpdate?: boolean | undefined, rect?: Rectangle | undefined): Rectangle {
        return new Rectangle(-300, -150, 1700, 900);
    }

    private build(): void {
        this.buildBlackBlocker();
    }

    private buildBlackBlocker(): void {
        const { x, y, width, height } = this.getBounds();
        this.inputLayer = new Graphics();
        this.inputLayer.beginFill(0x000000, 1);
        this.inputLayer.drawRect(x, y, width, height);
        this.inputLayer.endFill();
        this.inputLayer.eventMode = 'static';
        this.inputLayer.on('pointerdown', (e) => this.onDragStart(e));
        this.inputLayer.on('pointerout', this.stopDrag, this);
        this.inputLayer.on('pointerup', this.stopDrag, this);
        this.inputLayer.on('disableDrag', () => (this.canDrag = false));
        this.inputLayer.on('enableDrag', () => (this.canDrag = true));
        this.inputLayer.alpha = 0.2;
        this.addChild(this.inputLayer);
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

        const dropAreas = this.boxes.reduce((acc, box) => {
            return [...acc, ...box.dropAreas];
        }, [] as DropDownAreaInfo[]);

        this.dropAreas = dropAreas.map((area) => new DropDownAreaInfo(area));

        data.forEach((box, j) => {
            box.elements.forEach((element, i) => {
                const dropArea = this.dropAreas[j * 3 + i];

                const item = new ItemView(element);
                item.position.set(dropArea.centerX, dropArea.centerY);

                dropArea.setItem(item);
                item.setArea(dropArea);
                item.setOriginalPosition(dropArea.centerX, dropArea.centerY);
                this.items.push(item);
            });
        });

        this.items.forEach((item) => this.addChild(item));
    }

    private onDragStart(e: any): void {
        if (this.items.length === 0) return;
        const item = this.getClickedItem(e.data.global);
        if (!item) return;

        lego.event.emit(BoardEvents.Click);
        if (!this.canDrag || this.dragStarted) return;
        this.dragStarted = true;
        e.stopPropagation();

        this.draggingItem && this.draggingItem.emptyArea();
        this.draggingItem = item;
        this.draggingItem.startDrag();

        const { x, y } = this.toLocal(e.data.global);
        this.draggingItem.position.set(x, y);
        this.removeChild(this.draggingItem);
        this.addChild(this.draggingItem);

        this.inputLayer.on('pointermove', this.onDragMove, this);
    }

    private onDragMove(e): void {
        if (!this.canDrag || !this.draggingItem) return;

        const { x, y } = this.toLocal(e.data.global);
        this.draggingItem.position.set(x, y);

        lego.event.emit(BoardEvents.Move);
    }

    private stopDrag(): void {
        this.dragStarted = false;

        if (!this.draggingItem) return;
        this.draggingItem.off('pointermove', this.onDragMove, this);

        const dropArea = this.findDropArea();

        this.draggingItem.emptyArea();

        const { area } = this.draggingItem;
        if (dropArea && dropArea.isFree) {
            lego.event.emit(BoardEvents.Drop);
            area?.empty();
            this.draggingItem.emptyArea();
            this.dropItemToArea(dropArea, this.draggingItem);
            this.checkMatches();
        } else {
            this.dropItemToOriginalPosition();
        }

        this.draggingItem = null;
    }

    private findDropArea(): DropDownAreaInfo | undefined {
        if (!this.draggingItem) return;
        const { x, y } = this.draggingItem;

        let dropArea = this.dropAreas.find(
            (area) => x > area.startX && x < area.endX && y > area.startY && y <= area.endY && area.isFree,
        );

        return dropArea;
    }

    private dropItemToArea(dropArea: DropDownAreaInfo, item: ItemView): void {
        anime({
            targets: item,
            x: dropArea.centerX,
            y: dropArea.centerY,
            duration: 50,
            easing: 'easeInOutSine',
        });
        item.emptyArea();
        item.dropTo(dropArea);
        dropArea.setItem(item);
    }

    private dropItemToOriginalPosition(): void {
        if (!this.draggingItem) return;
        lego.event.emit(BoardEvents.Drop);
        const area = this.dropAreas.find(
            (area) => area.centerX === this.draggingItem?.originalX && area.centerY === this.draggingItem?.originalY,
        );
        anime({
            targets: this.draggingItem,
            x: this.draggingItem.originalX,
            y: this.draggingItem.originalY,
            duration: 200,
            easing: 'easeInOutSine',
        });
        this.draggingItem.setArea(area as DropDownAreaInfo);
        area?.setItem(this.draggingItem);
    }

    private checkMatches(): void {
        // for (let i = 0; i < 9; i++) {
        //     const b1 = this.finalPositions[i * 3];
        //     const b2 = this.finalPositions[i * 3 + 1];
        //     const b3 = this.finalPositions[i * 3 + 2];
        //     if (this.checkMatch(b1, b2, b3)) {
        //         const elements = [b1, b2, b3].map((el) => el.insertedItem).filter((el) => el) as ItemView[];
        //         b1.empty();
        //         b2.empty();
        //         b3.empty();
        //         lego.event.emit(BoardEvents.Match, b1.insertedItem?.type, i);
        //         this.animateMatch(elements);
        //     }
        // }
    }

    private getClickedItem(point: Point): ItemView | undefined {
        const { x, y } = this.toLocal(point);
        return this.items.find(
            (i) =>
                x >= i.x - i.width / 2 && x <= i.x + i.width / 2 && y >= i.y - i.height / 2 && y <= i.y + i.height / 2,
        );
    }
}
