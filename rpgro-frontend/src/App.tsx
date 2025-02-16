import { Editor, Tldraw, TLComponents, TLUiOverrides, useIsToolSelected, DefaultToolbar, DefaultToolbarContent, useTools, TldrawUiMenuItem} from 'tldraw'
import 'tldraw/tldraw.css'
import { CardShapeUtil } from './CardShapeUtil'
import { CardShapeTool } from './CardShapeTool'
import { CardGroupShapeTool } from './CardGroupShapeTool'
import { CardGroupShapeUtil } from './CardGroupShapeUtil'

const customShapes = [CardShapeUtil, CardGroupShapeUtil];
const customTools = [CardShapeTool, CardGroupShapeTool];
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
      },
      cardgroup: {
        id: 'cardgroup',
        label: 'Card Group',
        icon: '',
        kbd: '',
        onSelect()
        {
          editor.setCurrentTool('cardgroup')
        }
      }
    }
  }
};

const handleMount = (editor: Editor) => {
  editor.user.updateUserPreferences({isSnapMode: true});
}

function CustomToolbar()
{
  const tools = useTools();
  const isCardSelected = useIsToolSelected(tools['card']);
  const isCardGroupSelected = useIsToolSelected(tools['cardgroup']);
  return (
    <DefaultToolbar>
      <TldrawUiMenuItem {...tools['card']} isSelected={isCardSelected} />
      <TldrawUiMenuItem {...tools['cardgroup']} isSelected={isCardGroupSelected} />
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
      onMount={handleMount}
      />
		</div>
	)
}