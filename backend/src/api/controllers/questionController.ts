import { Request,Response } from "express"
import prisma from "../../utils/db"

export const fetchQuestions = async(req: Request, res: Response)=>{
    try{
        const response = await prisma.testQuestions.findMany({
            select:{
                id:true,
                question:true,
                optionA:true,
                optionB:true,
                optionC:true,
                optionD:true,
            }
        })
        return res.status(200).json(response)
    }catch(e:any)
    {
        console.log("question fetch catch : ",e.message)
        return res.status(400).json(e.message)
    }
}

export const enterQuestions = async (req: Request, res: Response) => {
    return res.status(200).json({msg: "Sucess"});
}