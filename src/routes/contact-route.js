import { contactController } from '../controllers/contact-controller';

export default (router) => {
    router.get('/contacts', contactController.getAll);
    router.post('/contacts', contactController.createOne);
    router.get('/contacts/:id', contactController.getOne);
    router.put('/contacts/:id', contactController.updateOne);
    router.delete('/contacts/:id', contactController.removeOne);
};
