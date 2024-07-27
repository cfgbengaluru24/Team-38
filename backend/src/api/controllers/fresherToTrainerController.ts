import { Request, Response } from "express";
import prisma from "../../utils/db";

export const freshersDetails = async (req: Request, res: Response) =>{
    try {
        const data = await prisma.fresher.findMany();
        res.status(200).json(data);
    }
    catch(e:any)
    {
        console.log(e.message);
        return res.status(400).json(e.message)
    }
}