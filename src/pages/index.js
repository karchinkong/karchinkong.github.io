import styles from './index.less';
import React, { Component } from 'react';
import { connect } from 'dva';
import { Spin, Icon } from 'antd';
import { GITHUB_AUTHOR, GITHUB_HOST } from '../constances/common';

class Index extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'index/queryIssues',
            payload: { creator: GITHUB_AUTHOR, per_page: 100 },
        });
    }

    render() {
        const { issuesLists, loading } = this.props;
        return (
            <main>
                <article>
                    <header className={styles.wrapper}>
                        <h3 className={styles.title}>KarChin</h3>
                        <h4 className={styles.subTitle}>Fight for the HipHop all the time.</h4>
                        <small className={styles.info}>
                            <span role="img" className={styles.icon}>🇨🇳</span>
                            <b>China Gz</b>
                            <span className={styles.icon}>・🕹</span>
                            <b>Web Developer</b>
                            <span>・</span>
                            <span className={styles.text}>
                            view my projects on <a href={GITHUB_HOST}>GitHub</a>
                        </span>
                        </small>
                    </header>
                    <div className={styles.content}>
                        <h2>My Issues</h2>
                        {
                            loading && (
                                <Spin indicator={
                                    <Icon type="loading" style={{ fontSize: 24 }} spin/>
                                }/>
                            )
                        }
                        {
                            !loading && (issuesLists && issuesLists.length > 0 ? issuesLists.map(issue => (
                                <section className={styles.lists} key={issue.id}>
                                    <h1>
                                        <span
                                            className={`${styles.listType} ${styles[issue.labels[0].name.replace(new RegExp(' ', 'g'), '-')]}`}
                                        >{issue.labels[0].name.replace(new RegExp(' ', 'g'), '-')}</span>
                                        <span>{issue.title}</span>
                                    </h1>
                                </section>
                            )) : (<section className={`${styles.lists}`}><h1><span>暂无数据</span></h1></section>))
                        }
                    </div>
                </article>
            </main>
        );
    }
}

const mapStateToProps = state => ({
    issuesLists: state.index.issuesLists,
    loading: state.loading.effects['index/queryIssues'],
});

export default connect(mapStateToProps)(Index);
