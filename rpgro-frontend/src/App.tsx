import { Editor, Tldraw, TLComponents, TLUiOverrides, useIsToolSelected, DefaultToolbar, DefaultToolbarContent, useTools, TldrawUiMenuItem, DefaultSpinner, createTLStore, getSnapshot, loadSnapshot } from 'tldraw'
import 'tldraw/tldraw.css'
import { CardShapeUtil } from './CardShapeUtil'
import { CardShapeTool } from './CardShapeTool'
import { CardGroupShapeTool } from './CardGroupShapeTool'
import { CardGroupShapeUtil } from './CardGroupShapeUtil'
import {RollableTableShapeUtil} from './RollableTableShapeUtil'
import { RollabeTableShapeTool } from './RollableTableShapeTool'

import { throttle } from 'lodash'
import { useLayoutEffect, useMemo, useState } from 'react'

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


// this is for holding data on the users side to save whiteboards across sessions

const PERSISTANCE_KEY = "key"

export default function PersistanceSetUp() {
	const store = useMemo(() => createTLStore(), [])
	const [loadingState, setLoadingState] = useState<
		{ status: 'loading' } | { status : 'ready' } | { status: 'error'; error: string }
	>({
		status: 'loading',
	})

	useLayoutEffect(() => {
		setLoadingState({ status: 'loading' })
		
		//get persistant saved data from local storage
		const persistedSnapshot = localStorage.getItem(PERSISTANCE_KEY)

		if (persistedSnapshot) {
			try {
				const snapshot = JSON.Parse(persistedSnapshot)
				loadSnapshot(store, snapshot)
				setLoadingState({ status: 'ready' })
			} catch (error: any) {
				setLoadingState({ status: 'error', error: error.message }) // Something went wrong
			}
		} else {
			setLoadingState({ status: 'ready' }) // Nothing persisted, continue with the empty store
		}

		// Each time the store changes, run the (debounced) persist function
		const cleanupFn = store.listen(
			throttle(() => {
				const snapshot = getSnapshot(store)
				localStorage.setItem(PERSISTENCE_KEY, JSON.stringify(snapshot))
			}, 500)
		)

		return () => {
			cleanupFn()
			}
		}, [store])

	//renders loading state
	if (loadingState.status === 'loading') {
		return (
			<div className="tldraw__editor">
				<h2>
					<DefaultSpinner />
				</h2>
			</div>
		)
	}

	if (loadingState.status === 'error') {
		return (
			<div className="tldraw__editor">
				<h2>Error!</h2>
				<p>{loadingState.error}</p>
			</div>
		)
	}

	return (
		<div className="tldraw__editor">
			<Tldraw store={store} />
		</div>
	)
}

