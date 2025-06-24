import { prismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const prisma = new prismaClient();

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        console.log("Data is missing");
        return res.status(400).json({
            success: false,
            message: "All field are required"
        })
    }

    try {
        const existingUser = await prisma.User.findUnique({
            where: { email }
        })

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with same email"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verifactionToken = crypto.randomBytes(32).toString("hax");

        const user = await prisma.User.create({
            data: {
                name,
                email,
                password: hashedPassword,
                verifactionToken
            }
        })

        if (!user) {
            return res.status(400).json({
                message: "user not created",
                success: false
            })
        }

        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASSWORD
            }
        })

        const mailOption = {
            from: process.env.MAILTRAP_USER,
            to: user.email,
            subject: "verify your email",
            text: `plase click on the following link : ${process.env.BASE_URL}/api/v1/users/varify/${token}`
        }

        const tampmail = await transporter.sendMail(mailOption)

        if (!tampmail) {
            return res.status(500).json({
                message: "User created but verification email failed to send.",
                success: false
            });
        }

        return res.status(201).json({
            message: "User created successfully. Verification email sent.",
            success: true
        });

    } catch (error) {
        console.log("error is : ", error);
        return res.status(500).json({
            success: false,
            message: "registration failed internal servser error"
        })
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: "All fields are requires"
        })
    }

    try {
        const user = await prisma.User.findUnique({
            where : {email}
        });

        if(!user) {
            return res.status(400).json ({
                success : false,
                message : "invalid email or password"
            })    
        }

        const isVarified = bcrypt.compare(password, user.password);
        if(!isVarified) {
            return res.status(400).json ({
                success : false,
                message : "invalid email or password"
            })
        }

        const token = jwt.sign(
            {id : user.id}, 
            process.env.JWTSECURITY_WORD,
            {expiresIn: '24h' }
        )

        const cookieOptions = {
            httpOnly : true
        }
        res.cookie('token', token, cookieOptions)

        return res.status(201).json({
            success : true,
            message : "user login successfull"
        })
    } catch (error) {
        
    }
}