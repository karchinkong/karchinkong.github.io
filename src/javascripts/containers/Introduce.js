import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
	withRouter
} from 'react-router-dom';
import {fetchInfo} from '../actions/index';
import {Card, Row, Col, Rate, Alert} from 'antd';

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
					style={{width: 600}}
				>
					<Alert className="alert" message="If you want to contact me,please send email to 594245490@qq.com" type="info" />
					<Row>
						<Col span={6}>
							<img className="avatar" src={avatar}/>
						</Col>
						<Col span={16} offset={2} className="introduce-info">
							<div>Name <a href="javascript:void(0);">{this.props.userInfo.owner}</a></div>
							<div>Github <a href={this.props.userInfo.github}>{this.props.userInfo.githubUrl}</a></div>
							<div>Age <a href={this.props.userInfo.github}>{this.props.userInfo.age}</a></div>
							<div>Job <a href={this.props.userInfo.github}>{this.props.userInfo.jobs}</a></div>
							<div>Skills Rate <Rate disabled defaultValue={4}/></div>
						</Col>
					</Row>
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