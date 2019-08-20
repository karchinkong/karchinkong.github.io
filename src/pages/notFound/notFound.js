import React from 'react';
import { Result, Button } from 'antd';
import router from 'umi/router';
import styles from './notFound.less';

const NotFound = () => {
    return (
        <Result
            className={styles.wrapper}
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={() => router.push('/')}>Back Home</Button>}
        />
    );
};

export default NotFound;