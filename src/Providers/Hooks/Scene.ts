import { useEffect } from 'react'
import * as THREE from 'three'

// TOOLS
import onKeyDown from 'Providers/Helpers/Keyboard'

const useSetScene = (
	setScene: React.Dispatch<React.SetStateAction<THREE.Scene | null>>,
	setCamera: React.Dispatch<React.SetStateAction<THREE.Camera | null>>,
	setRenderer: React.Dispatch<React.SetStateAction<THREE.Renderer | null>>
) => {
	useEffect(() => {
		// CREAR RENDER
		const renderer = new THREE.WebGLRenderer({ antialias: true })
		renderer.setSize(window.innerWidth, window.innerHeight)
		renderer.setClearColor('#222')

		// CREAR CÁMARA
		const camera = new THREE.PerspectiveCamera(28, window.innerWidth / window.innerHeight, 1, 2000)
		camera.position.set(0, 250, 400)
		camera.lookAt(new THREE.Vector3(0, 15, 0))

		// CREAR ESCENA
		const scene = new THREE.Scene()
		const light = new THREE.DirectionalLight(0xffffff, 1)
		const light2 = new THREE.AmbientLight(0x222222)

		// AGREGAR LUZ
		light.position.set(700, 500, 1000)
		scene.add(light)
		scene.add(light2)

		// ACTUALIZAR
		document.body.appendChild(renderer.domElement)
		setScene(scene)
		setCamera(camera)
		setRenderer(renderer)

		// EVENTOS
		document.body.addEventListener('keydown', onKeyDown(camera), false)
	}, [])
}

export default useSetScene
