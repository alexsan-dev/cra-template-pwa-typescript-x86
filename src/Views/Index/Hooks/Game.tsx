import React, { useEffect } from 'react'
import { Es } from 'Env/Strings'

// JUEGO
import createGame from '../Helpers/Game'

// COMPONENTES
import TextField from 'Components/TextField/TextField'

// INICIAR JUEGO
const useGame = (
	lang: Es,
	camera: THREE.Camera | null,
	scene: THREE.Scene | null,
	renderer: THREE.Renderer | null
) => {
	// JUEGO
	useEffect(() => {
		// GUARDAR NOMBRE
		let name: string = ''
		let disk: number = 0
		const saveName = (value: string) => (name = value.trim().toLowerCase())
		const saveDisk = (value: string) => (disk = Math.min(7, +value))

		// ALERTA DE INICIO
		window.Alert({
			...lang.initPrompt,
			onConfirm: () => createGame(name, disk, camera, scene, renderer),
			customElements: (
				<>
					<TextField
						style={{ marginTop: '10px' }}
						onChange={saveName}
						type='text'
						helper={lang.promptFields.nameHelp}
						focusColor='#2196F3'
						color='#333'
						label={lang.promptFields.name}
					/>
					<TextField
						style={{ marginTop: '20px' }}
						type='number'
						onChange={saveDisk}
						helper={lang.promptFields.diskHelp}
						focusColor='#2196F3'
						color='#333'
						label={lang.promptFields.disk}
					/>
				</>
			),
			type: 'confirm',
			cancelBtn: <></>,
		})
	}, [camera, scene, renderer])
}

export default useGame
