import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
	withRouter,
	Link
} from 'react-router-dom';
import { fetchIssues } from '../actions/index';
import { List, Avatar } from 'antd';

import '../../resources/css/all.css';

class All extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(fetchIssues());
	}

	render() {

		return (
			<div className="all-lists">
				<div className="all-lists-title">全部</div>
				<List
					itemLayout="horizontal"
					dataSource={this.props.items}
					loading={this.props.isFetching}
					renderItem={item => (
						<List.Item>
							<List.Item.Meta
								avatar={<Avatar src={item.user.avatar_url} />}
								title={<Link to={{ pathname: `post/${item.number}` }}>{item.title}</Link>}
								description={item.updated_at.substr(0,10)}
							/>
						</List.Item>
					)}
				/>
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

export default withRouter(connect(mapStateToProps)(All));