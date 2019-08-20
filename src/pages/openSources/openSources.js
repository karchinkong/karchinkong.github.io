import React, { useEffect, useState } from 'react';
import { Icon, Empty, Modal, Row, Col, Tooltip } from 'antd';
import { connect } from 'dva';
import styles from './openSources.less';
import Title from '../../components/Title/Title';
import ListWithLoading from '../../components/listWithLoading/listWithLoading';
import moment from 'moment';

const OpenSources = (props) => {

    const [detailModal, setDetailModal] = useState(false);
    const [detail, setDetail] = useState();

    useEffect(() => {
        props.dispatch({ type: 'index/queryOpenSourceLists' });
    }, []);

    const showDetailModal = item => {
        console.log(item);
        setDetail(item);
        setDetailModal(true);
    };

    const closeDetailModal = () => {
        setDetailModal(false);
    };

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
                                <section className={styles.list} key={item.id} onClick={() => showDetailModal(item)}>
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
                <Modal
                    title={detail && detail.name}
                    visible={detailModal}
                    onOk={closeDetailModal}
                    onCancel={closeDetailModal}
                >
                    {
                        detail && Object.keys(detail).length > 0 && (
                            <div className={styles.modalWrapper}>
                                <Row>
                                    <Col span={5}>作者</Col>
                                    <Col span={19}>{detail.owner.login}</Col>
                                </Row>
                                <Row>
                                    <Col span={5}>创建时间</Col>
                                    <Col span={19}>
                                        <Tooltip title={moment(detail.created_at).format('YYYY-MM-DD HH:mm:ss')}>
                                            {moment(detail.created_at).fromNow()}
                                        </Tooltip>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={5}>更新时间</Col>
                                    <Col span={19}>
                                        <Tooltip title={moment(detail.updated_at).format('YYYY-MM-DD HH:mm:ss')}>
                                            {moment(detail.updated_at).fromNow()}
                                        </Tooltip>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={5}>浏览地址</Col>
                                    <Col span={19}><a target="_blank" href={detail.html_url}>{detail.html_url}</a></Col>
                                </Row>
                            </div>
                        )
                    }
                </Modal>
            </article>
        </main>
    );
};

const mapStateToProps = state => ({
    openSourceLists: state.index.openSourceLists,
    loading: state.loading.effects['index/queryOpenSourceLists'],
});

export default connect(mapStateToProps)(OpenSources);