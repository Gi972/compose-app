export default ({ log, dependencies }) => ({
  routes: [
    {
      method: 'post',
      url: '/login',
      callback: (req, res, next, websockets) => {
        console.log(req.body.name, req.session);
        req.session.userId = "1";
        console.log(req.session);
        return res.send();
      },
    },
    {
      method: 'get',
      url: '/logout',
      callback: (req, res, next, websockets) => {
        req.session.name = '';
        return res.send();
      },
    },
    {
      method: 'get',
      url: '/user',
      callback: (req, res, next, websockets) => {
        return res.send(req.session.name || 'Guest');
      },
    },
    {
      method: 'get',
      url: '/',
      callback: (req, res, next, websockets) => {
        websockets.emit('echo back', 'Hello World!');
        log.info('User Session', req.session);
        return res.send('Hello world');
      },
    },
  ],
});
