import express, { Router } from 'express';

import { react } from './middlewares/react';

const router: Router = express.Router();

router.get('*', react());

module.exports = router;
