import jwt from 'jsonwebtoken'

const generateToken = (data: any) => {
  return jwt.sign(data, process.env.SECRET_KEY as string, { expiresIn: '24h' })
}

export { generateToken }
