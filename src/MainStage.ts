import { Container } from 'pixi.js';
import { BackgroundView } from './views/BackgroundView';
import { ForegroundView } from './views/ForegroundView';
import { GameView } from './views/GameView';
import { UIView } from './views/UIView';

class PixiStage extends Container {
    private bgView: BackgroundView;
    private gameView: GameView;
    private uiView: UIView;
    private foregroundView: ForegroundView;

    constructor() {
        super();
    }

    public resize(): void {
        this.bgView?.rebuild();
        this.gameView?.rebuild();
        this.uiView?.rebuild();
        this.foregroundView?.rebuild();
    }

    public start(): void {
        this.bgView = new BackgroundView();
        this.addChild(this.bgView);
        this.gameView = new GameView();
        this.addChild(this.gameView);
        this.uiView = new UIView();
        this.addChild(this.uiView);
        this.foregroundView = new ForegroundView();
        this.addChild(this.foregroundView);
    }
}

export default PixiStage;
