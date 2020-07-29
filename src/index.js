import express from 'express';
import {Server} from './core/server';

new Server(express()).up();
