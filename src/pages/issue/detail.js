import React, { Component } from 'react';
import { connect } from 'dva';
import { Comment, Tooltip, Avatar, Divider, Empty, Form, Input, Button } from 'antd';
import styles from './detail.less';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';
import Loading from '../../components/loading/loading';
import avatarSrc from '@/assets/avatar.jpg';
import moment from 'moment';

const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, loading, value }) => (
    <div>
        <Form.Item>
            <TextArea className={styles.textArea} rows={4} onChange={onChange} value={value}/>
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" onClick={onSubmit} loading={loading} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </div>
);

class Detail extends Component {
    state = {
        submitting: false,
        commentValue: '',
    };

    componentDidMount() {
        const { id } = this.props.match.params;
        const { dispatch } = this.props;
        dispatch({
            type: 'index/queryIssueDetailById',
            payload: { id },
        });
        dispatch({
            type: 'index/queryIssueCommentById',
            payload: { id },
        });
    }

    handleChange = e => {
        this.setState({
            commentValue: e.target.value,
        });
    };

    onSubmit = () => {
        const { commentValue } = this.state;
        const { dispatch } = this.props;
        if (!commentValue) return;
        this.setState({ submitting: true });
        dispatch({ type: 'index/addComment' });
    };

    render() {
        const { issueDetail, loading, issueCommentLists, addCommentLoading } = this.props;
        const { commentValue } = this.state;
        return (
            <div>
                {loading && <Loading/>}
                {
                    !loading && issueDetail && Object.keys(issueDetail).length > 0 && (
                        <main>
                            <article>
                                <header className={styles.wrapper}>
                                    <h1 className={styles.title}>{issueDetail.title}</h1>
                                    <small className={styles.subTitle}>
                                        By<span> {issueDetail.user.login}</span> on <span>{issueDetail.created_at}</span>
                                    </small>
                                </header>
                            </article>
                            <div className={styles.content}>
                                <ReactMarkdown
                                    source={issueDetail.body}
                                    escapeHtml={false}
                                    renderers={{ code: CodeBlock }}
                                />
                            </div>
                        </main>
                    )
                }
                <div className={styles.comment}>
                    <Divider>评论区</Divider>
                    {
                        issueCommentLists && issueCommentLists.length > 0 ? issueCommentLists.map(comment => (
                            <Comment
                                key={comment.id}
                                author={<span>{comment.user.login}</span>}
                                avatar={<Avatar src={comment.user.avatar_url}/>}
                                content={comment.body}
                                datetime={
                                    <Tooltip
                                        title={moment(comment.created_at).format('YYYY-MM-DD HH:mm:ss')}
                                    ><span>{moment(comment.created_at).fromNow()}</span></Tooltip>
                                }
                            />
                        )) : (
                            <Empty
                                image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                                imageStyle={{
                                    height: 60,
                                    margin: '40px 0 10px',
                                }}
                            />
                        )
                    }
                    <Comment
                        avatar={<Avatar src={avatarSrc}/>}
                        content={
                            <Editor
                                onChange={this.handleChange}
                                onSubmit={this.onSubmit}
                                loading={addCommentLoading}
                                value={commentValue}
                            />
                        }
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    issueDetail: state.index.issueDetail,
    issueCommentLists: state.index.issueCommentLists,
    loading: state.loading.effects['index/queryIssueDetailById'],
    addCommentLoading: state.loading.effects['index/addComment'],
});

export default connect(mapStateToProps)(Detail);