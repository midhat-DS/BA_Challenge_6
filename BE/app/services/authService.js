const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const authRepository = require('../repositories/authRepository');

module.exports ={
    async registerNewUser  (reqBody) {
        const { name, email, password } = reqBody;
        //cek apakah data yang inputkan user sudah sesuai
        if (!email) throw new ApiError(httpStatus.BAD_REQUEST, "email cannot be empty");
        if (!name) throw new ApiError(httpStatus.BAD_REQUEST, "name cannot be empty");
        if (!password) throw new ApiError(httpStatus.BAD_REQUEST, "password cannot be empty");

        const user = await authRepository.findEmail(email);
        if (user) {
            throw new ApiError(httpStatus.BAD_REQUEST, `user with email : ${email} already taken`)
        }
         // cek apakah panjang password sudah sesuai
        const passswordLength = password.length >= 8
        if (!passswordLength) {
            throw new ApiError(httpStatus.BAD_REQUEST, "minimum password length must be 8 charater or more")
        }
    
        const hash = bcrypt.hashSync(password, 10);
        const newUser = { 
            name,
            email,
            password: hash
        }
        return authRepository.createUser(newUser);
    },
    
    async login  (reqBody)  {
        const { email, password } = reqBody
        const user = await authRepository.findEmail(email);

        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, `user with email : ${email} is not found`)
        }

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({
                id: user.id,
                name:user.name,
                email: user.email,
                roleId: user.roleId,
            }, 'rahasia')
    
            return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    roleId: user.roleId,
                    role : user.role.name,
                    token
                    }
        }else {
            throw new ApiError(httpStatus.BAD_REQUEST, "The password you entered is incorrect");
        }
    },
    
    async registerAdmin  (reqBody)  {
        const user = await authRepository.findEmail(reqBody.email);
        if (!user) throw new ApiError(httpStatus.NOT_FOUND, `user with email : ${reqBody.email} is not found`);
        if (user.roleId == 2) throw new ApiError(httpStatus.BAD_REQUEST, `user with email : ${reqBody.email} already admin`);
    
        return authRepository.updateToAdmin(user);
    }  
}

