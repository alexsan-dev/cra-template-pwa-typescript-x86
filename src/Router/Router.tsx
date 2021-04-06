// REACT
import React from 'react'

// ROUTER
import { Switch, Route } from 'react-router-dom'

// PAGINAS
import Index from 'Pages/Index/Index'

// RUTAS
import ROUTES from 'Env/Routes'

const Router = () => {
	return (
		<Switch>
			<Route exact path={ROUTES.index} component={Index} />
		</Switch>
	)
}

export default Router
