import * as THREE from 'three'
import EventsControls from './Controls'

// CREAR JUEGO
const createGame = (
	name: string,
	countDisk: number,
	camera: THREE.Camera | null,
	scene: THREE.Scene | null,
	renderer: THREE.Renderer | null
) => {
	if (camera && scene && renderer) {
		// GLOBALES
		let heightRod = 110,
			heightDisk = 14,
			numberDisk = 0,
			beganRod = 0,
			nextRod = 0
		let stacksDisk: number[][] = []

		// PLANO
		let heightPlane = 160
		let geometry = new THREE.PlaneBufferGeometry(80, heightPlane, 1, 1)
		let plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ visible: false }))

		// AGREGAR
		scene?.add(plane)

		// CILINDROS
		const loader = new THREE.TextureLoader()

		let geometry1 = new THREE.CylinderGeometry(6, 6, heightRod, 36)
		let geometry2 = new THREE.CylinderGeometry(40, 40, heightDisk, 36)
		let material = new THREE.MeshPhongMaterial({
			map: loader.load('/assets/wood.jpg'),
		})

		// CREAR CILINDROS
		for (let i = 0; i < 3; i++) {
			// ARO
			let rod = new THREE.Mesh(geometry1, material)
			rod.position.set(-100 * (i - 1), 0, 0)

			// AGREGAR
			scene?.add(rod)

			// BASE
			let base = new THREE.Mesh(geometry2, material)
			base.position.set(-100 * (i - 1), -heightRod / 2 - heightDisk / 2, 0)

			// AGREGAR
			scene?.add(base)

			// CAMBIAR DISCO
			stacksDisk[i] = []
			stacksDisk[i].push(countDisk)
		}

		let diskColors = ['#F44336', '#FF4081', '#9C27B0', '#448AFF', '#009688', '#4CAF50', '#FFEB3B']

		for (let i = 0; i < countDisk; i++) {
			let geometry = new THREE.TorusGeometry(36 - 4 * i, (heightDisk + 2) / 2, 36, 36)
			let material = new THREE.MeshPhongMaterial({
				color: new THREE.Color(diskColors[i]),
			})
			let disk = new THREE.Mesh(geometry, material)
			disk.rotation.x = Math.PI / 2
			disk.name = 'disk' + String(countDisk - 1 - i)
			disk.position.set(-100, -heightRod / 2 + heightDisk / 2 + i * heightDisk, 0)
			scene?.add(disk)
			stacksDisk[0].push(countDisk - 1 - i)
		}

		let EventsControl = new EventsControls(camera, renderer?.domElement)
		EventsControl.map = plane
		EventsControl.attach(scene?.getObjectByName('disk0'))

		EventsControl.attachEvent('mouseOver', function () {
			EventsControl.container.style.cursor = 'pointer'
		})

		EventsControl.attachEvent('mouseOut', function () {
			EventsControl.container.style.cursor = 'auto'
		})

		EventsControl.attachEvent('dragAndDrop', function () {
			if (camera) {
				EventsControl.container.style.cursor = 'move'

				let vector = new THREE.Vector3(EventsControl._mouse.x, EventsControl._mouse.y, 1)
					.unproject(camera)
					// @ts-ignore
					.multiplyScalar(camera.position.z / (camera?.far || 1))

				if (EventsControl.focused.position.y > (heightRod + heightDisk) / 2) {
					plane.position.x = vector.x
					return
				} else {
					if (EventsControl.focused.position.x > 50) {
						nextRod = 2
					} else if (EventsControl.focused.position.x < -50) {
						nextRod = 0
					} else {
						nextRod = 1
					}

					plane.position.x = 100 * (nextRod - 1)
					plane.position.y =
						(stacksDisk[nextRod].length - 1 / 2) * heightDisk - heightRod / 2 + heightPlane / 2
					EventsControl.focused.position.x = plane.position.x
				}
			}
		})

		EventsControl.attachEvent('mouseUp', function () {
			EventsControl.container.style.cursor = 'auto'
			if (EventsControl.focused.position.y <= (heightRod + heightDisk) / 2 && nextRod != beganRod) {
				if (stacksDisk[nextRod][stacksDisk[nextRod].length - 1] < numberDisk) {
					EventsControl.returnPrevious()
					stacksDisk[beganRod].push(numberDisk)
					return
				}

				EventsControl.focused.position.y =
					stacksDisk[nextRod].length * heightDisk - heightRod / 2 - heightDisk / 2
				plane.position.y = EventsControl.focused.position.y + heightPlane / 2
				stacksDisk[nextRod].push(numberDisk)

				let item = stacksDisk[beganRod][stacksDisk[beganRod].length - 1]
				if (item < countDisk) {
					EventsControl.attach(scene?.getObjectByName('disk' + String(item)))
				}

				let item2 = stacksDisk[nextRod][stacksDisk[nextRod].length - 2]
				if (item2 < countDisk) {
					EventsControl.detach(scene?.getObjectByName('disk' + String(item2)))
				}

				if (stacksDisk[nextRod].length == countDisk + 1 && nextRod != 0) {
					EventsControl.enabled = false
					setTimeout(() => {
						window.Alert({
							title: `Felicitaciones ${name}`,
							onConfirm: () => window.location.reload(),
							body:
								'Has completado todo el juego satisfactoriamente!, ¿Te gustaría volver a empezar el juego?',
							confirmText: 'Reiniciar',
							type: 'confirm',
						})
					}, 300)
				}
			} else {
				EventsControl.returnPrevious()
				stacksDisk[beganRod].push(numberDisk)
			}
		})

		EventsControl.attachEvent('onclick', function () {
			if (EventsControl.focused.position.x > 50) {
				beganRod = 2
			} else if (EventsControl.focused.position.x < -50) {
				beganRod = 0
			} else {
				beganRod = 1
			}

			numberDisk = stacksDisk[beganRod].pop() || 0
		})
	}

	function animate() {
		requestAnimationFrame(animate)
		render()
	}

	function render() {
		if (scene && camera) renderer?.render(scene, camera)
	}

	animate()
}

export default createGame
