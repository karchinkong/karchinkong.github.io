import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
	withRouter
} from 'react-router-dom';
import marked from 'marked';
import hljs from 'highlight.js';

class Article extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		marked.setOptions({
			highlight: code => {
				return hljs.highlightAuto(code).value;
			},
			gfm: true,
			tables: true,
			breaks: false,
			pedantic: false,
			sanitize: false,
			smartLists: true,
			smartypants: false
		});
	}

	commentClick(commentUrl) {
		window.location.href = commentUrl;
	}

	render() {
		return (
			<div className="article">
				<h3 className="article-title">{this.props.title}</h3>
				<p className="article-time">{this.props.updated_at.substr(0, 10)}</p>
				<div className="article-content" dangerouslySetInnerHTML={{__html: marked(this.props.body)}}></div>
				<div className="comment-btn" onClick={this.commentClick.bind(this, this.props.html_url)}>点击评论</div>
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

export default withRouter(connect(mapStateToProps)(Article));