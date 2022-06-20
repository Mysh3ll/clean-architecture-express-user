import { NextFunction, Request, Response, Router } from 'express';
import { GetUserUseCaseInterface } from '../../../core/use-cases/user/get-user-use-case';
import { AddUserUseCaseInterface } from '../../../core/use-cases/user/add-user-use-case';
import { body, param } from 'express-validator';
import expressValidation from '../middlewares/express-validation';
import { UpdateUserUseCaseInterface } from '../../../core/use-cases/user/update-user-use-case';
import { DeleteUserUseCaseInterface } from '../../../core/use-cases/user/delete-user-use-case';
import { GetUserByIdUseCaseInterface } from '../../../core/use-cases/user/get-user-by-id-use-case';
import UserSnapshotType from '../../../core/domain/entities/user/types/userSnapshot';
import UserAddDataType from '../../../core/domain/entities/user/types/userAddData';
import UserUpdateDataType from '../../../core/domain/entities/user/types/userUpdateData';
import UserDeleteDataType from '../../../core/domain/entities/user/types/userDeleteData';

export function userRouter(
  getUserUseCaseInterface: GetUserUseCaseInterface,
  getUserByIdUseCaseInterface: GetUserByIdUseCaseInterface,
  addUserUseCaseInterface: AddUserUseCaseInterface,
  updateUserUseCaseInterface: UpdateUserUseCaseInterface,
  deleteUserUseCaseInterface: DeleteUserUseCaseInterface
): Router {
  const router = Router();

  router.get('/', async (req: Request, res: Response) => {
    const users: UserSnapshotType[] = await getUserUseCaseInterface.execute();

    return res.status(200).json(users);
  });

  router.get(
    '/:id',
    param('id').exists().withMessage('id is required'),
    expressValidation,
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      try {
        const user = await getUserByIdUseCaseInterface.execute(id);

        return res.status(200).json(user);
      } catch (err: unknown) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    body('username').isString(),
    body('email').isEmail(),
    expressValidation,
    async (req: Request, res: Response, next: NextFunction) => {
      const { username, email, age } = req.body as UserAddDataType;

      try {
        await addUserUseCaseInterface.execute({ username, email, age });

        return res.sendStatus(201);
      } catch (err: unknown) {
        next(err);
      }
    }
  );

  router.put(
    '/:id',
    param('id').exists().withMessage('id is required'),
    body('username').optional().isString(),
    body('age').optional().isNumeric(),
    expressValidation,
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const { username, age } = req.body as UserUpdateDataType;

      try {
        await updateUserUseCaseInterface.execute({ id, username, age });

        return res.sendStatus(200);
      } catch (err: unknown) {
        next(err);
      }
    }
  );

  router.delete(
    '/:id',
    param('id').exists().withMessage('id is required'),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await deleteUserUseCaseInterface.execute(
          req.params as unknown as UserDeleteDataType
        );

        return res.sendStatus(200);
      } catch (err: unknown) {
        next(err);
      }
    }
  );

  return router;
}
