import React from 'react';
import { Spin, Icon } from 'antd';
import styles from './loading.less';

export default () => {
    return (
        <div className={styles.loading}>
            <Spin indicator={
                <Icon type="loading" style={{ fontSize: 24 }} spin/>
            }/>
        </div>
    );
};