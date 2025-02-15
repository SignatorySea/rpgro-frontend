import { Tldraw, TLComponents, TLUiOverrides, useIsToolSelected, DefaultToolbar, DefaultToolbarContent, useTools, TldrawUiMenuItem} from 'tldraw'
import 'tldraw/tldraw.css'
import { CardShapeUtil } from './CardShapeUtil'
import { CardShapeTool } from './CardShapeTool'

const customShapes = [CardShapeUtil];
const customTools = [CardShapeTool];
const customUIOverrides: TLUiOverrides = 
{
  tools: (editor, tools) => {
    return {
      ...tools,
      card: {
        id: 'card',
        label: 'Card',
        icon: '',
        kbd: '',
        onSelect()
        {
          editor.setCurrentTool('card')
        }
      }
    }
  }
};

function CustomToolbar()
{
  const tools = useTools();
  const isCarddselected = useIsToolSelected(tools['card']);
  return (
    <DefaultToolbar>
      <TldrawUiMenuItem {...tools['card']} isSelected={isCarddselected} />
      <DefaultToolbarContent />
    </DefaultToolbar>
  )
}

const customComponents: TLComponents = 
{
  Toolbar: CustomToolbar
}

export default function App() {
	return (
		<div style={{ position: 'fixed', inset: 0 }}>
			<Tldraw 
      shapeUtils={customShapes}
      tools={customTools}
      overrides={customUIOverrides}
      components={customComponents}
      initialState='card'
      />
		</div>
	)
}