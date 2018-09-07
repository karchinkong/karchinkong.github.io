import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
	withRouter
} from 'react-router-dom';
import {fetchIssues} from '../actions/index';
import Article from '../components/Article';

import '../../resources/css/detail.css';
import '../../resources/css/markdown.css';

class Detail extends Component{
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const {dispatch} = this.props;

		dispatch(fetchIssues());
	}

	render() {
		if(this.props.isFetching){
			return null;
		}

		let view = {};

		this.props.items.map((item, index) => {

			parseInt(item.number) === parseInt(this.props.match.params.id) ? view = item : '';

		});

		return(
			<div>
				<Article {...view} />
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

export default withRouter(connect(mapStateToProps)(Detail));
