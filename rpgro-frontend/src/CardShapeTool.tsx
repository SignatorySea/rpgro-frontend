import {StateNode} from 'tldraw';
import 'tldraw/tldraw.css';
import { Draw } from './Draw';
import { words } from './loremipsumDeck';

const OFFSET = 12;

export class CardShapeTool extends StateNode {
    static override id = 'card';

    override onEnter()
    {
        this.editor.setCursor({type: 'cross', rotation: 0});
    }

    override onPointerDown() 
    {
        const {currentPagePoint} = this.editor.inputs;
        this.editor.createShape({type: 'card-shape', 
            x: currentPagePoint.x - OFFSET, 
            y: currentPagePoint.y - OFFSET,
            props: {text: Draw(words)}
        })
    }
}


