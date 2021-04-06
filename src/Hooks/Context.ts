// REACT
import { useContext } from 'react'

// CONTEXTOS
import MainContext from 'Context/MainContext'

// STRINGS
export const useStrings = () => {
	const { lang } = useContext(MainContext)
	return lang
}
