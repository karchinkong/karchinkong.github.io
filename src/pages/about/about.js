import React, { useState } from 'react';
import { CHINESE_NAME, SEX, AGE } from '../../constances/common';
import { List, Avatar, Progress } from 'antd';
import avatarSrc from '@/assets/avatar.jpg';
import styles from './about.less';
import Title from '../../components/Title/Title';

const About = () => {

    const [lists] = useState([
        { title: 'Javascript', src: avatarSrc, proficiency: 100 },
        { title: 'PhotoShop', src: avatarSrc, proficiency: 100 },
        { title: 'NodeJs', src: avatarSrc, proficiency: 80 },
        { title: 'Python', src: avatarSrc, proficiency: 60 },
        { title: 'Java', src: avatarSrc, proficiency: 40 },
    ]);

    return (
        <main>
            <article>
                <Title title="About" subTitle="关于一个菜鸟如何自我增强的修养"/>
                <div className={styles.content}>
                    <h1>{CHINESE_NAME}</h1>
                    <p><small>{SEX} {AGE}</small></p>
                    <p>Web开发者, Java(Python)爱好者, HipHop爱好者.</p>
                    <h3 className={styles.skills}>All skills</h3>
                    <List
                        itemLayout="horizontal"
                        dataSource={lists}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.src}/>}
                                    title={<a href="" className={styles.listTitle}>{item.title}</a>}
                                    description={
                                        <Progress
                                            strokeColor={{ from: '#108ee9', to: '#87d068' }}
                                            percent={item.proficiency}
                                            status="active"
                                        />
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </article>
        </main>
    );
};

export default About;