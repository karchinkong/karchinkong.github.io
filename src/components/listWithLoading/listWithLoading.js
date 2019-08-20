import React from 'react';
import { Spin, Icon } from 'antd';
import styles from './listWithLoading.less';

const listWithLoading = (props) => {
    return (
        <div>
            {
                props.loading ? (
                    <div className={styles.loading}>
                        <Spin indicator={
                            <Icon type="loading" style={{ fontSize: 24 }} spin/>
                        }/>
                    </div>
                ) : (props.children)
            }
        </div>
    );
};

export default listWithLoading;