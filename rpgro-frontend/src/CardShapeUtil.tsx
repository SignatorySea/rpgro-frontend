import {
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
		return <HTMLContainer style={{ backgroundColor: '#efefef' }}>{shape.props.text}</HTMLContainer>
	}

	// [g]
	indicator(shape: ICardShape) {
		return <rect width={shape.props.w} height={shape.props.h} />
	}
}