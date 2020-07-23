import { Router as getRouter } from 'express';

import { ContactRoute } from '../../routes/contact-route';
import mainRoute from '../../routes/main-route';

export default () => {
    const router = getRouter();

    mainRoute(router);
    new ContactRoute(router).attach();

    return router;
};
