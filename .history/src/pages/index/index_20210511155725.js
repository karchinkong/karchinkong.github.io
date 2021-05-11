import React, { useEffect } from 'react';
import { connect } from 'dva';
import { GITHUB_HOST, JOB, REGION, NAME, MOTTO } from '@/constances/common';
import ListWithLoading from '@/components/listWithLoading/listWithLoading';
import styles from './index.less';
import router from 'umi/router';
import Title from '@/components/Title/Title';


const Index = (props) => {

    useEffect(() => {
        const { dispatch } = props;
        dispatch({
            type: 'index/queryIssues',
            payload: {
                account: 'KarChinTest7',
                password: '1234567123',
                nickname: 'hello',
                status: 'sss'
            },
        });
    }, []);

    const goDetail = id => {
        router.push({ pathname: `/app/issue/${id}` });
    };

    const { issuesLists, loading } = props;

    return (
        <main>
            <article>
                <Title title={NAME} subTitle={MOTTO}>
                    <small className={styles.info}>
                        <span role="img" className={styles.icon}>🇨🇳</span>
                        <b>{REGION}</b>
                        <span className={styles.icon}>・🕹</span>
                        <b>{JOB}</b>
                        <span>・</span>
                        <span className={styles.text}>view my projects on <a href={GITHUB_HOST}>GitHub</a></span>
                    </small>
                </Title>
                <div className={styles.content}>
                    <h2>My Issues</h2>
                    <ListWithLoading loading={loading}>
                        {
                            issuesLists && issuesLists.length > 0 ? issuesLists.map(issue => (
                                <section className={styles.lists} key={issue.id} onClick={() => goDetail(issue.number)}>
                                    <h1>
                                        <span
                                            className={`${styles.listType} ${styles[issue.labels[0].name.replace(new RegExp(' ', 'g'), '-')]}`}>{issue.labels[0].name.replace(new RegExp(' ', 'g'), '-')}</span>
                                        <span>{issue.title}</span>
                                    </h1>
                                </section>
                            )) : (<section className={`${styles.lists}`}><h1><span>暂无数据</span></h1></section>)
                        }
                    </ListWithLoading>
                </div>
            </article>
        </main>
    );

};

const mapStateToProps = state => ({
    issuesLists: state.index.issuesLists,
    loading: state.loading.effects['index/queryIssues'],
});

export default connect(mapStateToProps)(Index);
