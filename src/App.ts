import { lego, legoLogger } from '@armathai/lego';
import { PixiStatsPlugin } from '@armathai/pixi-stats';
import { Application, Assets } from 'pixi.js';
import PixiStage from './MainStage';
import SoundController from './SoundController';
import { fitDimension, getModalSize } from './Utils';
import { assets } from './assets/assetsNames/assets';
import { atlases } from './assets/assetsNames/atlas';
import { mapCommands } from './configs/EventCommandPairs';
import { ScreenSizeConfig } from './configs/ScreenSizeConfig';
import { MainGameEvents, WindowEvent } from './events/MainEvents';

class App extends Application {
    public stage: PixiStage;

    public constructor() {
        super({
            backgroundColor: 0x96d6dc,
            backgroundAlpha: 1,
            powerPreference: 'high-performance',
            antialias: true,
            resolution: Math.max(window.devicePixelRatio || 1, 2),
            sharedTicker: true,
        });
    }

    public async init(): Promise<void> {
        this.stage = new PixiStage();
        // @ts-ignore
        this.view.classList.add('birdman-game-css');
        const div = document.getElementsByClassName('birdman-game')[0];

        // @ts-ignore
        div.appendChild(this.view);

        globalThis.__PIXI_APP__ = this;
        if (process.env.NODE_ENV !== 'production') {
            this.initStats();
            // this.initLego();
        }
        await this.loadAssets();
        this.onLoadComplete();
    }

    public appResize(): void {
        const { width: w, height: h } = getModalSize();
        if (w === 0 || h === 0) return;

        const { min, max } = ScreenSizeConfig.size.ratio;
        const { width, height } = fitDimension({ width: w, height: h }, min, max);

        this.resizeCanvas(width, height);
        this.resizeRenderer(width, height);

        this.stage.resize();

        lego.event.emit(MainGameEvents.Resize);
    }

    public onFocusChange(focus: boolean): void {
        lego.event.emit(WindowEvent.FocusChange, focus);
    }

    private async loadAssets(): Promise<void> {
        for (const asset of assets) {
            const { name, path } = asset;
            Assets.add(name, path);
            await Assets.load(name);
        }
        for (const atlas of atlases) {
            const { name, json } = atlas;
            Assets.add(name, json);
            await Assets.load(name);
        }
        // for (const font of fonts) {
        //     const { name, path } = font;
        //     Assets.add(name, path);
        //     await Assets.load(name);
        // }
        // for (const spine of spines) {
        //     const { key: name, jsonURL, atlasURL } = spine;
        //     Assets.add(name, jsonURL);
        //     await Assets.load(name);
        // }
        SoundController.loadSounds();
    }

    private onLoadComplete(): void {
        this.appResize();
        this.stage.start();
        lego.command.execute(mapCommands);
        lego.event.emit(MainGameEvents.MainViewReady);
    }

    private resizeCanvas(width: number, height: number): void {
        const { style } = this.renderer.view;
        if (!style) return;
        style.width = `${width}px`;
        style.height = `${height}px`;
    }

    private resizeRenderer(width: number, height: number): void {
        this.renderer.resize(width, height);
    }

    private initLego(): void {
        legoLogger.start(lego, Object.freeze({}));
        // TODO GAMEINITCOMMAND
        // lego.command.execute(onGameInitCommand);
        // lego.event.emit(MainGameEvents.Init);
    }

    private initStats(): void {
        //@ts-ignore
        const stats = new PixiStatsPlugin(this);
        document.body.appendChild(stats.stats.dom);
        this.ticker.add(() => stats.stats.update());
    }
}

export default App;
