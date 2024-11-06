import { BoardModel } from './BoardModel';
import { ObservableModel } from './ObservableModel';

export enum GameState {
    Unknown = 'Unknown',
    Game = 'Game',
}

export class GameModel extends ObservableModel {
    private _state: GameState = GameState.Unknown;
    private _board: BoardModel | null = null;

    constructor() {
        super('GameModel');

        this.makeObservable();
    }

    get board(): BoardModel | null {
        return this._board;
    }

    set board(value: BoardModel) {
        this._board = value;
    }

    get state(): GameState {
        return this._state;
    }

    set state(value: GameState) {
        this._state = value;
    }

    public init(): void {
        this._state = GameState.Game;
        this.initBoardModel();
    }

    public initBoardModel(): void {
        this.board = new BoardModel();
        this.board.initialize();
    }

    public destroyBoardModel(): void {
        this._board?.destroy();
        this._board = null;
    }
}
