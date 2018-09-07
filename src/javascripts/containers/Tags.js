import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
	withRouter,
	Link
} from 'react-router-dom';
import {fetchIssues} from '../actions/index';
import {List, Avatar} from 'antd';

import Lists from '../components/Lists';

import '../../resources/css/all.css';

class Tags extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const {dispatch} = this.props;
		dispatch(fetchIssues());
	}

	render() {
		let articles = [], view = [];

		this.props.items.map((item) => {
			if (articles.length > 0) {
				try {
					articles.forEach((viewItem, viewIdx) => {
						if (viewItem.title.name === item.labels[0].name) {
							viewItem.children.push(item);
							new Error('Find out!');
						}
						if (viewIdx === (articles.length - 1) && viewItem.title.name !== item.labels[0].name) {
							articles.push({
								title: {name: item.labels[0].name, color: item.labels[0].color},
								children: [item]
							});
						}
					});
				} catch (e) {
					console.log(e);
				}
			} else {
				articles.push({title: {name: item.labels[0].name, color: item.labels[0].color}, children: [item]});
			}
		});

		articles.forEach((renderItem, renderIndex) => {

			view.push(<Lists {...renderItem} key={renderIndex}/>);

		});

		return (
			<div className="all-lists">
				{view}
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

export default withRouter(connect(mapStateToProps)(Tags));