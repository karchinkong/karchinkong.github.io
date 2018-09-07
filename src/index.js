import React from 'react';
import ReactDOM from 'react-dom';
import {
	HashRouter,
	Route,
	Switch
} from 'react-router-dom';
import {Provider} from 'react-redux';
import Loadable from 'react-loadable';
import configStore from './javascripts/store/configStore';

import App from './javascripts/containers/App';
import registerServiceWorker from './registerServiceWorker';
import {CONFIG} from './javascripts/constants/Config';

let store = configStore();

const loadingComponent = ({isLoading, error}) => {

	if (isLoading) {

		document.title = CONFIG.loadingTitle;

		return '';

	}

};

const AsyncMenu = Loadable({

	loader: () => import('./javascripts/components/Menu'),

	loading: loadingComponent

});

const AsyncTags = Loadable({

	loader: () => import('./javascripts/containers/Tags'),

	loading: loadingComponent

});

const AsyncAll = Loadable({

	loader: () => import('./javascripts/containers/All'),

	loading: loadingComponent

});

const AsyncDetail = Loadable({

	loader: () => import('./javascripts/containers/Detail'),

	loading: loadingComponent

});

const AsyncIntroduce = Loadable({

	loader: () => import('./javascripts/containers/Introduce'),

	loading: loadingComponent

});


ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<App>
				<Route exact path="/" component={AsyncMenu}/>
				<Route path="/all" component={AsyncAll} />
				<Route path="/tags" component={AsyncTags} />
				<Route path="/post/:id" component={AsyncDetail} />
				<Route path="/introduce" component={AsyncIntroduce} />
			</App>
		</HashRouter>
	</Provider>,
	document.getElementById('root')
);

registerServiceWorker();
