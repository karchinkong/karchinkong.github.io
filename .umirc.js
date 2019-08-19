export default {
    treeShaking: true,
    plugins: [
        ['umi-plugin-react', {
            antd: true,
            dva: true,
            dynamicImport: true,
            title: 'karchinkong.github.io',
            dll: true
        }],
    ],
    history: 'hash',
    publicPath: './',
    routes: [
        {
            path: '/',
            redirect: '/app',
        },
        {
            path: '/app',
            component: '../layouts/index',
            routes: [
                { path: '/app', component: './index' },
                { path: '/app/about', component: './about/about' },
                { path: '/app/openSources', component: './openSources/openSources' },
                { path: '/app/issue/:id', component: './issue/detail' }
            ],
        },
    ],
};
