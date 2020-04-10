export default () => `
const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function expressMiddleware (router) {
    router.use('/content', createProxyMiddleware({
        target: 'http://admin:admin@localhost:4502',
        changeOrigin: true
    }));
    router.use('/etc.clientlibs', createProxyMiddleware({
        target: 'http://admin:admin@localhost:4502',
        changeOrigin: true
    }));
    router.use('/apps', createProxyMiddleware({
        target: 'http://admin:admin@localhost:4502',
        changeOrigin: true
    }));
    router.use('/conf', createProxyMiddleware({
        target: 'http://admin:admin@localhost:4502',
        changeOrigin: true
    }));
}
`
