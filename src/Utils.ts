import { Container, Graphics, Text } from 'pixi.js';

export const lp = (l, p) => {
    const { width: w, height: h } = getModalSize();
    return w > h ? l : p;
};

export const fitDimension = (
    dim: { width: number; height: number },
    minRatio: number,
    maxRatio: number,
): { width: number; height: number } => {
    const ratioW = dim.width / dim.height;
    const ratioH = dim.height / dim.width;

    if (ratioW < ratioH) {
        if (ratioW > maxRatio) {
            dim.width = dim.width * (maxRatio / ratioW);
        } else if (ratioW < minRatio) {
            dim.height = dim.height * (ratioW / minRatio);
        }
    } else {
        if (ratioH > maxRatio) {
            dim.height = dim.height * (maxRatio / ratioH);
        } else if (ratioH < minRatio) {
            dim.width = dim.width * (ratioH / minRatio);
        }
    }

    return dim;
};

export const delayRunnable = (delay, runnable, context?, ...args) => {
    let delayMS = delay * 1000;
    const delayWrapper = () => {
        delayMS -= window.game.ticker.deltaMS;
        if (delayMS <= 0) {
            runnable.call(context, ...args);
            window.game.ticker.remove(delayWrapper);
        }
    };
    window.game.ticker.add(delayWrapper);
    return delayWrapper;
};

export const loopRunnable = (delay, runnable, context = null, ...args) => {
    return window.game.time.events.loop(delay, runnable, context, ...args);
};

export const removeRunnable = (runnable) => window.game.ticker.remove(runnable);

export const drawBounds = (gameObject: Container, color = 0xffffff * Math.random(), alpha = 0.5): Graphics => {
    const { x, y, width, height } = gameObject.getBounds();
    const gr = new Graphics();
    gr.beginFill(color, alpha);
    gr.drawRect(x, y, width, height);
    gr.endFill();
    gameObject.addChild(gr);
    return gr;
};

export const drawRect = (
    gameObject: Container,
    x: number,
    y: number,
    width: number,
    height: number,
    color = 0xffffff * Math.random(),
    alpha = 0.5,
): Graphics => {
    const gr = new Graphics();
    gr.beginFill(color, alpha);
    gr.drawRect(x, y, width, height);
    gr.endFill();
    gameObject.addChild(gr);
    return gr;
};

export const randomInt = (min: number, max: number): number => {
    const mi = Math.ceil(min);
    const ma = Math.floor(max);
    return Math.floor(Math.random() * (ma - mi + 1)) + mi;
};

export const shuffle = (arr: any[]): void => {
    for (let i = arr.length - 1; i > 0; i -= 1) {
        const j = randomInt(0, i);
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
};

export const hasOwnProperty = <X extends Record<string, unknown>, Y extends PropertyKey>(
    obj: X,
    prop: Y,
): obj is X & Record<Y, unknown> => {
    return Object.prototype.hasOwnProperty.call(obj, prop);
};

export const getValueOfKey = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];

export const upperPowerOfTwo = (v: number): number => {
    v--;
    v |= v >> 1;
    v |= v >> 2;
    v |= v >> 4;
    v |= v >> 8;
    v |= v >> 16;
    v++;
    return v;
};

export const drawPoint = (
    container: any,
    x: number,
    y: number,
    color = 0xffffff * Math.random(),
    alpha = 0.5,
): Graphics => {
    const gr = new Graphics();
    gr.beginFill(color, alpha);
    gr.drawCircle(x, y, 12);
    gr.endFill();
    container.addChild(gr);
    return gr;
};

export const fitText = (textGameObject: Text, width: number, height: number) => {
    const { width: textWidth, height: textHeight } = textGameObject;
    const { fontSize } = textGameObject.style;
    const ratioW = width ? width / textWidth : 1;
    const ratioH = height ? height / textHeight : 1;
    const ratio = Math.min(Math.min(ratioW, ratioH), 1);

    if (typeof fontSize === 'number') {
        const newFontSize = fontSize * ratio;
        textGameObject.style.fontSize = newFontSize;
    }
};

export const sample = (arr: any[]): any => {
    return arr[Math.floor(Math.random() * arr.length)];
};

export const difference = (arrA: any[], arrB: any[]): any[] => {
    return arrA.filter((x) => !arrB.includes(x));
};

export const convertMilliseconds = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const getWindowSize = (): { width: number; height: number } => {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
};

export const getModalSize = (): { width: number; height: number } => {
    // get width and height of element with id birdmanModalGame
    const modal = document.getElementById('birdmanModalGame');
    if (!modal) return { width: 0, height: 0 };
    const width = modal.offsetWidth;
    const height = modal.offsetHeight;
    return { width, height };
};
