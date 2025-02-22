import { Editor, Tldraw, TLComponents, TLUiOverrides, useIsToolSelected, DefaultToolbar, DefaultToolbarContent, useTools, TldrawUiMenuItem} from 'tldraw'
import 'tldraw/tldraw.css'
import { CardShapeUtil } from './CardShapeUtil'
import { CardShapeTool } from './CardShapeTool'
import { CardGroupShapeTool } from './CardGroupShapeTool'
import { CardGroupShapeUtil } from './CardGroupShapeUtil'
import {RollableTableShapeUtil} from './RollableTableShapeUtil'
import { RollabeTableShapeTool } from './RollableTableShapeTool'

const customShapes = [CardShapeUtil, CardGroupShapeUtil, RollableTableShapeUtil];
const customTools = [CardShapeTool, CardGroupShapeTool, RollabeTableShapeTool];
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
      },
      rollabletable: {
        id: 'rollabletable',
        label: 'Rollable Table',
        icon: '',
        kbd: '',
        onSelect()
        {
          editor.setCurrentTool('rollabletable')
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
  const isRollableTableSelected = useIsToolSelected(tools['rollabletable']);
  return (
    <DefaultToolbar>
      <TldrawUiMenuItem {...tools['card']} isSelected={isCardSelected} />
      <TldrawUiMenuItem {...tools['cardgroup']} isSelected={isCardGroupSelected} />
      <TldrawUiMenuItem {...tools['rollabletable']} isSelected={isRollableTableSelected} />
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