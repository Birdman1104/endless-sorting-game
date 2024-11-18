import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { Text } from 'pixi.js';
import { getForegroundGridConfig } from '../configs/gridConfigs/ForegroundViewGC';

export class ForegroundView extends PixiGrid {
    constructor() {
        super();
        this.build();
    }

    public getGridConfig(): ICellConfig {
        return getForegroundGridConfig();
    }

    public rebuild(config?: ICellConfig | undefined): void {
        super.rebuild(this.getGridConfig());
    }

    private build(): void {
        this.addSuggestion();
    }

    private addSuggestion(): void {
        const text = new Text('For better experience we suggest you\nto rotate your phone', {
            align: 'center',
            fill: 0xff6f00,
        });
        this.setChild('suggestion', text);
    }
}
