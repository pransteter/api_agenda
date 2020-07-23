import { Router } from 'express';

export class Route {
    /**
     * @property {Router}
     */
    router;

    /**
     * Constructor method
     * @param {Router} routers
     */
    constructor(router) {
        this.router = router;
    }
}
