import { ContactController } from '../controllers/contact-controller';
import { Route } from './route';

export class ContactRoute extends Route {
    /**
     * Attach all contact routes in express router
     */
    attach() {
        this.router.get('/contacts', async (req, res) => {
            (new ContactController).getAll(req, res);
        });

        this.router.post('/contacts', async (req, res) => {
            (new ContactController).createOne(req, res);
        });

        this.router.get('/contacts/:id', async (req, res) => {
            (new ContactController).getOne(req, res);
        });

        this.router.put('/contacts/:id', async (req, res) => {
            (new ContactController).updateOne(req, res);
        });

        this.router.delete('/contacts/:id', async (req, res) => {
            (new ContactController).removeOne(req, res);
        });
    }
}
