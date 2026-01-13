import jwt from 'jsonwebtoken';

const generateToken = async(userId) => {
    const token = await jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
    return token;
}

export default generateToken;