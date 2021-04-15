// MOVER CÁMARA
const onKeyDown = (camera: THREE.Camera) => (event: KeyboardEvent) => {
	switch (event.keyCode) {
		// ARRIBA
		case 38:
			camera.position.set(camera.position.x, camera.position.y - 6, 400)
			camera.rotateX(0.01)
			break
		// IZQUIERDA
		case 39:
			camera.position.set(camera.position.x - 6, camera.position.y, 400)
			break
		// DERECHA
		case 37:
			camera.position.set(camera.position.x + 6, camera.position.y, 400)
			break
		// ABAJO
		case 40:
			camera.position.set(camera.position.x, camera.position.y + 6, 400)
			camera.rotateX(-0.01)
			break
	}
}

export default onKeyDown
