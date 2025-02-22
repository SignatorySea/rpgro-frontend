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
} from 'tldraw';
import 'tldraw/tldraw.css';
import { RollableTable } from './RollableTable';


type IRollableTableShape = TLBaseShape<
    'rollabletable-shape',
    {
        w: number
        h: number
    }
>
export class RollableTableShapeUtil extends ShapeUtil<IRollableTableShape> {
    // [a]
    static override type = 'rollabletable-shape' as const;
    static override props: RecordProps<IRollableTableShape> = {
        w: T.number,
        h: T.number,
    }

    // [b]
    getDefaultProps(): IRollableTableShape['props'] {
        return {
            w: 200,
            h: 200,
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

    // [f]
    component(shape: IRollableTableShape) {
        return <HTMLContainer style={{ backgroundColor: '#efefef' }}>
            <span style={{position: 'absolute',
                top: 0,
                left: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: shape.props.h/2,
                width: shape.props.w/2
            }}>
            <RollableTable />
            </span>
            </HTMLContainer>
    }

    // [g]
    indicator(shape: IRollableTableShape) {
        return <rect width={shape.props.w} height={shape.props.h} />
    }
}