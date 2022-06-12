import { Request, Response, Router } from 'express';
import { GetUserUseCaseInterface } from '../../../core/use-cases/get-user-use-case';
import { UserSnapshot } from '../../../core/domain/entities/user';
import {
  AddUserDto,
  AddUserUseCaseInterface,
} from '../../../core/use-cases/add-user-use-case';
import { body, param } from 'express-validator';
import expressValidation from '../middlewares/express-validation';
import {
  UpdateUserDto,
  UpdateUserUseCaseInterface,
} from '../../../core/use-cases/update-user-use-case';
import {
  DeleteUserDto,
  DeleteUserUseCaseInterface,
} from '../../../core/use-cases/delete-user-use-case';

export function userRouter(
  getUserUseCaseInterface: GetUserUseCaseInterface,
  addUserUseCaseInterface: AddUserUseCaseInterface,
  updateUserUseCaseInterface: UpdateUserUseCaseInterface,
  deleteUserUseCaseInterface: DeleteUserUseCaseInterface
): Router {
  const router = Router();

  router.get('/', async (req: Request, res: Response) => {
    const users: UserSnapshot[] = await getUserUseCaseInterface.execute();

    return res.status(200).json(users);
  });

  router.post(
    '/',
    body('username').isString(),
    body('email').isEmail(),
    expressValidation,
    async (req: Request, res: Response) => {
      const { username, email, age } = req.body as AddUserDto;

      try {
        await addUserUseCaseInterface.execute({ username, email, age });

        return res.sendStatus(201);
      } catch (err: unknown) {
        if (err instanceof Error) {
          return res.status(400).send({ name: err.name, message: err.message });
        }

        return res.status(400).send(err);
      }
    }
  );

  router.put(
    '/:id',
    param('id').exists().withMessage('id is required'),
    body('username').optional().isString(),
    body('age').optional().isNumeric(),
    expressValidation,
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const { username, age } = req.body as UpdateUserDto;

      try {
        await updateUserUseCaseInterface.execute({ id, username, age });

        return res.sendStatus(200);
      } catch (err: unknown) {
        if (err instanceof Error) {
          return res.status(400).send({ name: err.name, message: err.message });
        }

        return res.status(400).send(err);
      }
    }
  );

  router.delete(
    '/:id',
    param('id').exists().withMessage('id is required'),
    async (req: Request, res: Response) => {
      try {
        await deleteUserUseCaseInterface.execute(
          req.params as unknown as DeleteUserDto
        );

        return res.sendStatus(200);
      } catch (err: unknown) {
        if (err instanceof Error) {
          return res.status(400).send({ name: err.name, message: err.message });
        }

        return res.status(400).send(err);
      }
    }
  );

  return router;
}
