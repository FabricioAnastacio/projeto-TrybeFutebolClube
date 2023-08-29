import { Request, Response } from 'express';
import UserService from '../services/userService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LoginController {
  constructor(
    private serviceUser = new UserService(),
  ) {}

  public async loginUser(req: Request, res: Response): Promise<Response> {
    const people = req.body;
    const { status, data } = await this.serviceUser.validateUser(people);

    return res.status(mapStatusHTTP(status)).json(data);
  }
}
