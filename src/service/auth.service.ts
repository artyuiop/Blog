import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { TokenData } from '../interface/auth.interface'

const SECRET = process.env.SECRET_KEY as string

// function hashpassword
export async function hashPassword(password: string): Promise<string> {
    const quantity = 10
    const hash = await bcrypt.hash(password, quantity)
    return hash
}

// function Check Passowrd Math
export async function comparePassword(password: string, hash: string): Promise<boolean> {
    const isMath = await bcrypt.compare(password, hash)
    return isMath
}

// function GenToken
export function GenToken(payload: object): TokenData {
    const expiresIn = '1d'
    const token = jwt.sign(payload, SECRET, {expiresIn})
    return {token , expiresIn}
}

// function verifyToken
export function verifyToken(token: string){
    const MyToken_verify = jwt.verify(token, SECRET)
    return MyToken_verify 
}
