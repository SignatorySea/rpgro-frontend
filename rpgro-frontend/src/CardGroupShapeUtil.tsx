import {
	RecordProps,
	Geometry2d,
	HTMLContainer,
	Rectangle2d,
	ShapeUtil,
	TLBaseShape,
	TLShape,
	T,
    resizeBox,
    TLResizeInfo
} from 'tldraw'
import 'tldraw/tldraw.css'


type CardGroupShape = TLBaseShape<
	'cardgroup-shape',
	{
		w: number
		h: number
	}
>

export class CardGroupShapeUtil extends ShapeUtil<CardGroupShape>
{
    static override type = 'cardgroup-shape' as const;
    static override props: RecordProps<CardGroupShape> = {
        w: T.number,
        h: T.number
    };

    getDefaultProps(): CardGroupShape['props']
    {
        return {
            w: 500,
            h: 200
        };
    }

    getGeometry(shape: CardGroupShape): Geometry2d 
    {
        return new Rectangle2d({
            width: shape.props.w,
            height: shape.props.h,
            isFilled: true
        })
    }

    canEdit()
    {
        return false;
    }

    override canResize()
    {
        return true;
    }

    override isAspectRatioLocked(): boolean 
    {
        return false;
    }

    onResize(shape: any, info: TLResizeInfo<any>) {
        return resizeBox(shape, info)
    }

    override canDropShapes(shape: CardGroupShape, shapes: TLShape[])
    {
        if(shapes.every((s) => s.type === 'card-shape'))
        {
            return true;
        }
        return false;
    }

    override onDragShapesOver(shape: CardGroupShape, shapes: TLShape[])
    {
        if(!shapes.every((child) => child.parentId === shape.id))
        {
            this.editor.reparentShapes(shapes, shape.id);
        }
    }

    override onDragShapesOut(shape: CardGroupShape, shapes: TLShape[])
    {
        this.editor.reparentShapes(shapes, this.editor.getCurrentPageId());
    }

    component()
    {
        return (
            <HTMLContainer
                style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #000000'
                }}
                />
        )
    }

    indicator(shape: CardGroupShape) {
		return <rect width={shape.props.w} height={shape.props.h} />
	}
}