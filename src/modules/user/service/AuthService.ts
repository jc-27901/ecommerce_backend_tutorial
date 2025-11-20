import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserRepository } from '../repository/UserRepository';

export class AuthService {
    private userRepository = new UserRepository();

    async login(email: string, password: string){
        const user  = await this.userRepository.findByEmail(email);
        if(!user){
            throw new Error('User not found');
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            throw new Error('Invalid credentials');
        }

        const accessToken = jwt.sign({ id: user.id, role: user.role }, 
            process.env.ACCESS_TOKEN_SECRET || 'access123', { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user.id, role: user.role }, 
            process.env.REFRESH_TOKEN_SECRET || 'refresh123', { expiresIn: '7d' });

        return { accessToken, refreshToken, user: {
            id: user.id,
            email: user.email,
            role: user.role,
        } };

    }

}
