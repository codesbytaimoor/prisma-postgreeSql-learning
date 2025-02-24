// All Routes List

const express = require('express');
const authRoute = require('./auth.routes');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    }

];

// const devRoutes = [
//   // routes available only in development mode
//   {
//     path: '/docs',
//     route: docsRoute,
//   },
// ];

defaultRoutes.forEach((route) => {
    //  router.use() in Express
    // router.use() is a middleware function in Express.js that allows you to apply middleware or load other routers.
    router.use(route.path, route.route);
});

/* istanbul ignore next */
// if (config.env === 'development') {
//     devRoutes.forEach((route) => {
//         router.use(route.path, route.route);
//     });
// }

module.exports = router;
