import styles from './index.less';
import React from 'react';
import Link from 'umi/link';
import { Row, Col } from 'antd';
import { GITHUB_HOST } from '../constances/common';

function BasicLayout(props) {
    const { pathname } = props.location;
    return (
        <div className={styles.wrapper}>
            <nav className={styles.navigation}>
                <Row>
                    <Col className={pathname === '/app' ? styles.active : ''} span={6}><Link to="/">KarChin</Link></Col>
                    <Col className={pathname === '/app/openSources' ? styles.active : ''} span={6}><Link to="/app/openSources">OPEN-SOURCE</Link></Col>
                    <Col span={6}><a href={GITHUB_HOST}>GITHUB</a></Col>
                    <Col className={pathname === '/app/about' ? styles.active : ''} span={6}><Link to="/app/about">ABOUT</Link></Col>
                </Row>
            </nav>
            {props.children}
        </div>
    );
}

export default BasicLayout;
