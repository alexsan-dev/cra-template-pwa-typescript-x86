// REACT
import React, { ComponentProps } from 'react'

// CONTEXTO
import MainContext from 'Context/MainContext'

// STRINGS
import Strs from 'Lang/Strings.json'

const MainProvider: React.FC = (props: ComponentProps<'div'>) => {
	return <MainContext.Provider value={{ lang: Strs.es }}>{props.children}</MainContext.Provider>
}

export default MainProvider
