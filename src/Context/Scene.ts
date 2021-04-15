import { createContext, Context } from 'react'

// KEYS
interface ContextProps {
	scene: THREE.Scene | null
	camera: THREE.Camera | null
	renderer: THREE.Renderer | null
}

// VALOR POR DEFECTO
const DefContext: ContextProps = {
	scene: null,
	camera: null,
	renderer: null,
}

// CONTEXTO
const SceneContext: Context<ContextProps> = createContext(DefContext)

export default SceneContext
