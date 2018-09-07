import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
	withRouter
} from 'react-router-dom';
import {fetchInfo} from '../actions/index';
import {Card, Icon, Avatar} from 'antd';

import '../../resources/css/introduce.css';

import avatar from '@/resources/images/avatar.jpg';

class Introduce extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		const {dispatch} = this.props;

		dispatch(fetchInfo());
	}

	render() {
		return (
			<div className="introduce">
				<Card
					hoverable
					style={{ width: 450 }}
					cover={<img alt="example" src={avatar} />}
				>
					<p>Name <a href="javascript:void(0);">{this.props.userInfo.owner}</a></p>
					<p>Github <a href={this.props.userInfo.github}>{this.props.userInfo.githubUrl}</a></p>
					<p>Age <a href={this.props.userInfo.github}>{this.props.userInfo.age}</a></p>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const {
		isFetching,
		userInfo
	} = state || {
		isFetching: true,
		userInfo: {}
	};

	return {
		isFetching,
		userInfo
	}
};

export default withRouter(connect(mapStateToProps)(Introduce));