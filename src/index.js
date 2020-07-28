import express from 'express';
import {server} from './core/server';

const app = express();

server.run(app);
