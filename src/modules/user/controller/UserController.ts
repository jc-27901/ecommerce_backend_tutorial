import { UserService } from '../service/UserService';
import { Request, Response } from 'express';

const userService = new UserService();

export class UserController {
    async createUser(req: Request, res: Response) {
        try{
            const {name, email, password } = req.body;
            const user = await userService.createUser(name, email, password);
            res.status(201).json({user});
        } catch (error: any) {
            res.status(400).json({error: error.message});
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try{
            const users = await userService.getAllUsers();
            res.status(200).json({users});
        } catch (error: any) {
            res.status(400).json({error: error.message});
        }
    }
}