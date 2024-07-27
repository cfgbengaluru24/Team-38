import { Request,Response } from "express"
import prisma from "../../utils/db"

export const fetchQuestions = async(req:Request,res:Response)=>{
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
    }catch(err)
    {
        console.log("question fetch catch : ",err)
    }
}