import React, { Component } from 'react';
import { Icon } from 'antd';
import { connect } from 'dva';
import styles from './openSources.less';

class OpenSources extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'index/queryOpenSourceLists',
        });
    }

    render() {
        console.log(this.props.openSourceLists);
        const { openSourceLists } = this.props;
        return (
            <main>
                <article>
                    <header className={styles.wrapper}>
                        <h3 className={styles.title}>Open-Source</h3>
                        <h4 className={styles.subTitle}>共{openSourceLists.length}个开源项目</h4>
                    </header>
                    <div className={styles.content}>
                        {
                            openSourceLists && openSourceLists.length > 0 && openSourceLists.map(item => (
                                <section className={styles.list} key={item.id}>
                                    <h1>{item.name}</h1>
                                    <p className={styles.description}>{item.description}</p>
                                    <div className={styles.info}>
                                        <span className={styles.language}>{item.language}</span>
                                        <span className={styles.icon}>
                                            <Icon type="star" /> {item.watchers_count}
                                        </span>
                                        <span className={styles.icon}>
                                            <Icon type="fork" /> {item.forks_count}
                                        </span>
                                    </div>
                                </section>
                            ))
                        }
                    </div>
                </article>
            </main>
        );
    }
}


const mapStateToProps = state => ({
    openSourceLists: state.index.openSourceLists,
    loading: state.loading.effects['index/queryIssues'],
});

export default connect(mapStateToProps)(OpenSources);