const bcrypt = require("bcryptjs");
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
        return user; 
        }catch(err){
            throw err;
        }
    }
}
