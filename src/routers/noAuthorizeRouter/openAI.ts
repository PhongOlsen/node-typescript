import { Router } from 'express';
import { ChatOpenAIController } from '../../controllers/openAI/chat';

const openAIRouter = Router();
openAIRouter.post('/openAI/chat', ChatOpenAIController);

export default openAIRouter;