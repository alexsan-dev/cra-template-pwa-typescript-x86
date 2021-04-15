// REACT
import React from 'react'

// ESTILOS
import Styles from './Index.module.scss'

// HOOKS
import { useScene, useCamera, useRenderer, useStrings } from 'Hooks/Context'
import useGame from './Hooks/Game'

const IndexView = () => {
	// CARGAR ESCENA
	const scene = useScene()
	const camera = useCamera()
	const renderer = useRenderer()

	// STRINGS
	const lang = useStrings()

	// JUEGO
	useGame(lang, camera, scene, renderer)

	return (
		<div>
			<h1 className={Styles.title}>{lang.home.title}</h1>
			<p className={Styles.description}>
				{lang.home.description},{' '}
				<a
					target='_blank'
					rel='noreferrer noopener'
					href='https://github.com/alexsan-dev'
					title='Github'>
					https://github.com/alexsan-dev
				</a>
			</p>
		</div>
	)
}

export default IndexView
