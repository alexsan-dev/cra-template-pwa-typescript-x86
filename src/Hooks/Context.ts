// REACT
import { useContext } from 'react'

// CONTEXTOS
import MainContext from 'Context/MainContext'
import SceneContext from 'Context/Scene'

// STRINGS
export const useStrings = () => {
	const { lang } = useContext(MainContext)
	return lang
}

// ESCENAS
export const useScene = () => {
	const { scene } = useContext(SceneContext)
	return scene
}

// CAMERA
export const useCamera = () => {
	const { camera } = useContext(SceneContext)
	return camera
}

// RENDERER
export const useRenderer = () => {
	const { renderer } = useContext(SceneContext)
	return renderer
}
