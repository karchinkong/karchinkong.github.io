import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CONFIG } from '@/javascripts/constants/Config';
import {
	withRouter
} from 'react-router-dom';

import '../../resources/css/normalize.css';
import '../../resources/css/app.css';

class App extends Component {
	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
		if(!nextProps.isFetching) {
			document.title = CONFIG.title;
		}
	}

	render() {
		return (
			<div>
				<div id="logo">
					<a href="https://github.com/karchinkong">karchinkong.github.io</a>
				</div>
				<div>
					{this.props.children}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const {
		isFetching,
		items
	} = state || {
		isFetching: true,
		items: []
	};

	return {
		isFetching,
		items
	}
};


export default withRouter(connect(mapStateToProps)(App));
