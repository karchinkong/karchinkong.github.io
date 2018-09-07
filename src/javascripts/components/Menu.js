import React, {Component} from 'react';
import {
	Link,
	withRouter
} from 'react-router-dom';
import {CONFIG} from '../constants/Config'
import {Icon} from 'antd';

import '../../resources/css/menu.css';

class Menu extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		document.title = CONFIG.title;
	}

	render() {

		return (
			<div id="Home">
				<div className="avatar"><a href="https://github.com/karchinkong"></a></div>
				<h1><Link to="introduce">KARCHINKONG</Link></h1>
				<div className="link">
					<Link to="all"><Icon type="github" theme="outlined"/>全部</Link>
					<Link to="archive"><Icon type="save" theme="outlined"/>归档</Link>
					<Link to="tags"><Icon type="tags" theme="outlined"/>标签</Link>
				</div>
			</div>
		);

	};

};

export default withRouter(Menu);