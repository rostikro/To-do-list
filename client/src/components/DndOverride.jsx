import { MouseSensor as LibMouseSensor, TouchSensor as LibTouchSensor } from '@dnd-kit/core';

const handler = ({ nativeEvent: event }) => {
    let cur = event.target;
    console.log("TEST");
    while (cur) {
        if (cur.dataset && cur.dataset.noDnd) {
            return false;
        }
        cur = cur.parentElement;
    }

    return true;
};

export class PointerSensor extends LibMouseSensor {
    static activators = [{ eventName: 'onMouseDown', handler }];
}