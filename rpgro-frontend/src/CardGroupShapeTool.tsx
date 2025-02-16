import {StateNode} from 'tldraw';
import 'tldraw/tldraw.css';

const OFFSET = 12;

export class CardGroupShapeTool extends StateNode {
    static override id = 'cardgroup';

    override onEnter()
    {
        this.editor.setCursor({type: 'cross', rotation: 0});
    }

    override onPointerDown() 
    {
        const {currentPagePoint} = this.editor.inputs;
        this.editor.createShape({type: 'cardgroup-shape', 
            x: currentPagePoint.x - OFFSET, 
            y: currentPagePoint.y - OFFSET,
            props: {}
        })
    }
}


