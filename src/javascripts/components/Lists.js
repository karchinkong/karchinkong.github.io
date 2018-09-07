import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
	withRouter,
	Link
} from 'react-router-dom';
import {List, Avatar} from 'antd';

class Lists extends Component {
	render() {
		let titleStyle = {color: '#' + this.props.title.color};

		return (
			<div>
				<div className="all-lists-title" style={titleStyle}>{this.props.title.name}</div>
				<List
					itemLayout="horizontal"
					dataSource={this.props.children}
					loading={this.props.isFetching}
					renderItem={item => (
						<List.Item>
							<List.Item.Meta
								avatar={<Avatar src={item.user.avatar_url}/>}
								title={<Link to={{pathname: `post/${item.number}`}}>{item.title}</Link>}
								description={item.updated_at.substr(0, 10)}
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

export default withRouter(connect(mapStateToProps)(Lists));