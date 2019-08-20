import React, { useEffect } from 'react';
import { Icon, Empty } from 'antd';
import { connect } from 'dva';
import styles from './openSources.less';
import Title from '../../components/Title/Title';
import ListWithLoading from '../../components/listWithLoading/listWithLoading';

const OpenSources = (props) => {

    useEffect(() => {
        props.dispatch({ type: 'index/queryOpenSourceLists' });
    }, [props]);

    const { openSourceLists, loading } = props;

    return (
        <main>
            <article>
                <Title
                    title="Open-Source"
                    subTitle={`共${openSourceLists ? openSourceLists.length : 0}个开源项目`}
                />
                <div className={styles.content}>
                    <ListWithLoading loading={loading}>
                        {
                            openSourceLists && openSourceLists.length > 0 ? openSourceLists.map(item => (
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
                                    imageStyle={{ height: 60, margin: '40px 0 10px' }}
                                    className={styles.emptyData}
                                />
                            )
                        }
                    </ListWithLoading>
                </div>
            </article>
        </main>
    );
};

const mapStateToProps = state => ({
    openSourceLists: state.index.openSourceLists,
    loading: state.loading.effects['index/queryOpenSourceLists'],
});

export default connect(mapStateToProps)(OpenSources);