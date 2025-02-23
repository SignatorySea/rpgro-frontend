import {
    BoundsSnapGeometry,
    Geometry2d,
    HTMLContainer,
    RecordProps,
    Rectangle2d,
    ShapeUtil,
    T,
    TLBaseShape,
    TLResizeInfo,
    resizeBox,
    Editor,
    JsonObject,
    TLShapeId,
} from 'tldraw';
import 'tldraw/tldraw.css';
import { RollableTable } from './RollableTable';
import { useState } from 'react';


type IRollableTableShape = TLBaseShape<
    'rollabletable-shape',
    {
        w: number
        h: number
        x: number
        y: number
    }
>
export class RollableTableShapeUtil extends ShapeUtil<IRollableTableShape> {
    // [a]
    static override type = 'rollabletable-shape' as const;
    static override props: RecordProps<IRollableTableShape> = {
        w: T.number,
        h: T.number,
        x: T.number,
        y: T.number
    }

    // [b]
    getDefaultProps(): IRollableTableShape['props'] {
        return {
            w: 200,
            h: 2000,
            x: 0,
            y: 0
        }
    }
    override getBoundsSnapGeometry(shape: IRollableTableShape): BoundsSnapGeometry 
    {
        return new Rectangle2d(
            {
                width: shape.props.h / 2,
                height: shape.props.w / 2,
                isFilled: true
            }
        )
    }
    // [c]
    canEdit() {
        return false
    }
    canResize() {
        return true
    }
    isAspectRatioLocked() {
        return false
    }

    // [d]
    getGeometry(shape: IRollableTableShape): Geometry2d {
        return new Rectangle2d({
            width: shape.props.w,
            height: shape.props.h,
            isFilled: true,
        })
    }

    // [e]
    onResize(shape: any, info: TLResizeInfo<any>) {
        return resizeBox(shape, info)
    }
    
    
    onTranslateEnd(initial: IRollableTableShape, current: IRollableTableShape): void | ({ id: TLShapeId; meta?: Partial<JsonObject> | undefined; props?: Partial<{ w: number; h: number; }> | undefined; type: 'rollabletable-shape'; } & Partial<Omit<IRollableTableShape, 'props' | 'type' | 'id' | 'meta'>>) {
    }


    // [f]
    component(shape: IRollableTableShape) {
        return <HTMLContainer>
            <span style={{position: 'absolute',
                top: 0,
                left: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: shape.props.h,
                width: shape.props.w,
                pointerEvents: 'all'
            }}>
            <RollableTable reportResult={this.GetResultCard} editor={this.editor} width={shape.props.w} height={shape.props.h}/>
            </span>
            </HTMLContainer>
    }

    // [g]
    indicator(shape: IRollableTableShape) {
        return <rect width={shape.props.w} height={shape.props.h} />
    }

    GetResultCard(editor: Editor, result: string, pos: number[], width: number)
    {
        editor.createShape({type: 'card-shape', 
                    x: width + pos[0], 
                    y: pos[1],
                    props: {text: result}
                })
    }
    
}