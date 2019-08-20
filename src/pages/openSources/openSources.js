import React, { Component } from 'react';
import { Icon, Empty } from 'antd';
import { connect } from 'dva';
import styles from './openSources.less';
import Loading from '../../components/loading/loading';

class OpenSources extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'index/queryOpenSourceLists',
        });
    }

    render() {
        const { openSourceLists, loading } = this.props;
        return (
            <main>
                <article>
                    <header className={styles.wrapper}>
                        <h3 className={styles.title}>Open-Source</h3>
                        <h4 className={styles.subTitle}>共{openSourceLists ? openSourceLists.length : 0}个开源项目</h4>
                    </header>
                    <div className={styles.content}>
                        {loading && <Loading/>}
                        {
                            !loading && (openSourceLists && openSourceLists.length > 0 ? openSourceLists.map(item => (
                                <section className={styles.list} key={item.id}>
                                    <h1>{item.name}</h1>
                                    <p className={styles.description}>{item.description}</p>
                                    <div className={styles.info}>
                                        <span className={styles.language}>{item.language}</span>
                                        <span className={styles.icon}>
                                            <Icon type="star"/> {item.watchers_count}
                                        </span>
                                        <span className={styles.icon}>
                                            <Icon type="fork"/> {item.forks_count}
                                        </span>
                                    </div>
                                </section>
                            )) : (
                                <Empty
                                    image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                                    imageStyle={{
                                        height: 60,
                                        margin: '40px 0 10px',
                                    }}
                                    className={styles.emptyData}
                                />
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
    loading: state.loading.effects['index/queryOpenSourceLists'],
});

export default connect(mapStateToProps)(OpenSources);