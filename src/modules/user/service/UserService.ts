import { UserRepository } from '../repository/UserRepository';
import  bcrypt  from 'bcryptjs';


export class UserService {
    private userRepository = new UserRepository();

    async createUser(name: string, email: string, password: string){
        const existingUser = await this.userRepository.findByEmail(email);
        if(existingUser){
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.userRepository.create({
            name,
            email,
            password: hashedPassword,
        });
    }

    async getAllUsers(){
        return this.userRepository.findAll();
    }

}