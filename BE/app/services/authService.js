const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const SALT = 10;
const userRepository = require("../repositories/usersRepository")

async function encryptedPassword(str){
    try{
        const hash = await bcrypt.hash(str, SALT);
    return hash;
    }catch(err){
        console.log(err);
        throw err;
    }
}

async function comparePassword(password, encryptedPassword){
    try{
        const isValid = await bcrypt.compare(password, encryptedPassword);
    return isValid;
    }catch(err){
        console.log(err);
        throw err;
    }
}
const SECRET_KEY = 'secret'

function createWebtoken(payload){
    return jwt.sign(payload, SECRET_KEY);

}
function verifyToken(token){
    return jwt.verify(token, SECRET_KEY);
}

module.exports = {

    async register(email, password){
        try{
            const encryptedPass = await encryptedPassword(password);
            const body = {
                email,
                password:encryptedPass
        }
            const user = await userRepository.create(body)
            return user;

        }catch(err){
            throw err;
        }
    },
    async login(email, password) {
        try{
        const user = await userRepository.findUser({email});
        if(!user){
            return false;
        }
        const {password: encryptedPassword} = user;
        const isAuthenticated = await comparePassword(password, encryptedPassword);
        if (!isAuthenticated){
            return false;
        }

        const token = createWebtoken({
            id : user.id,
            email : user.email
        })
        const data = {
            ...user.dataValues, 
            token
        }

        return data; 
        }catch(err){
            throw err;
        }
    },
    async authorize(token){
        try{
            const payload = verifyToken(token);

            const id = payload?.id;
            console.log('id', id)
            const user = await userRepository.findUserByPk(id);
            console.log('user', user)
            return user;
        }catch(err){
            throw err;
        }
    }
}
