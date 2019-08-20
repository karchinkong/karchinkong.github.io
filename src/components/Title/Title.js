import React from 'react';
import styles from './Title.less';

const Title = props => {
    const { title, subTitle, children } = props;
    return (
        <header className={styles.wrapper}>
            <h3 className={styles.title}>{title}</h3>
            <h4 className={styles.subTitle}>{subTitle}</h4>
            {children}
        </header>
    );
};

export default Title;