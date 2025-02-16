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


type ICardShape = TLBaseShape<
	'card-shape',
	{
		w: number
		h: number
		text: string
	}
>
export class CardShapeUtil extends ShapeUtil<ICardShape> {
	// [a]
	static override type = 'card-shape' as const;
	static override props: RecordProps<ICardShape> = {
		w: T.number,
		h: T.number,
		text: T.string,
	}

	// [b]
	getDefaultProps(): ICardShape['props'] {
		return {
			w: 200,
			h: 200,
			text: "I'm a card!",
		}
	}
	override getBoundsSnapGeometry(shape: ICardShape): BoundsSnapGeometry 
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
	getGeometry(shape: ICardShape): Geometry2d {
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
	component(shape: ICardShape) {
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
			{shape.props.text}
			</span>
			</HTMLContainer>
	}

	// [g]
	indicator(shape: ICardShape) {
		return <rect width={shape.props.w} height={shape.props.h} />
	}
}