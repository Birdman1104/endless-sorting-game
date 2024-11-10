import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getUIGridConfig } from '../configs/gridConfigs/UIViewGC';
import { CounterView } from './CounterView';

export class UIView extends PixiGrid {
    private counter: CounterView;
    constructor() {
        super();
        this.build();
    }

    public getGridConfig(): ICellConfig {
        return getUIGridConfig();
    }

    public rebuild(config?: ICellConfig | undefined): void {
        super.rebuild(this.getGridConfig());
    }

    private build(): void {
        this.buildCounter();
    }

    private buildCounter(): void {
        this.counter = new CounterView();
        this.setChild('score', this.counter);
    }
}
