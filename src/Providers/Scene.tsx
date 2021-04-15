// REACT
import React, { useState } from 'react'
import * as THREE from 'three'

// CONTEXTO
import Scene from 'Context/Scene'
import useSetScene from './Hooks/Scene'

const SceneProvider: React.FC = (props: React.ComponentProps<'div'>) => {
	// ESTADO
	const [scene, setScene] = useState<THREE.Scene | null>(null)
	const [camera, setCamera] = useState<THREE.Camera | null>(null)
	const [renderer, setRenderer] = useState<THREE.Renderer | null>(null)

	// CREAR ESCENA
	useSetScene(setScene, setCamera, setRenderer)

	return <Scene.Provider value={{ scene, camera, renderer }}>{props.children}</Scene.Provider>
}

export default SceneProvider
