import { Router as getRouter } from 'express';

import contactRoute from '../../routes/contact-route';
import mainRoute from '../../routes/main-route';

export default () => {
    const router = getRouter();

    mainRoute(router);
    contactRoute(router);

    return router;
};
