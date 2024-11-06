import { Container, Point, Rectangle, Sprite } from 'pixi.js';
import { DropDownAreaInfo } from '../utils/DropDownAreaInfo';

export class BoxView extends Container {
    private areas: Sprite[] = [];
    constructor(private _i: number, private _j: number, private _uuid: string) {
        super();

        this.build();
    }

    get dropAreas(): DropDownAreaInfo[] {
        return this.areas.map((area) => {
            const { x: startX, y: startY } = this.toGlobal(
                new Point(area.x - area.width / 2, area.y - area.height / 2),
            );
            const { x: endX, y: endY } = this.toGlobal(new Point(area.x + area.width / 2, area.y + area.height / 2));
            return new DropDownAreaInfo({
                startX,
                startY,
                endX,
                endY,
                insertedItem: null,
            });
        });
    }

    public getBounds(skipUpdate?: boolean | undefined, rect?: Rectangle | undefined): Rectangle {
        return new Rectangle(0, 0, 250, 31);
    }

    get i(): number {
        return this._i;
    }

    get j(): number {
        return this._j;
    }

    get uuid(): string {
        return this._uuid;
    }

    private build(): void {
        const box = Sprite.from('box.png');
        box.anchor.set(0.5);
        this.addChild(box);

        for (let i = -1; i < 2; i++) {
            const area = Sprite.from('area.png');
            area.anchor.set(0.5);
            area.x = i * area.width + i * 15;
            area.y = box.y;
            this.areas.push(area);
            this.addChild(area);
        }
    }
}
