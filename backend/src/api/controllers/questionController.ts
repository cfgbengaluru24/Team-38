import { Request,Response } from "express"

export const fetchQuestions = async(req: Request, res: Response)=>{
    try{
        
    }catch(err)
    {
        console.log("question fetch catch : ",err)
    }
}

export const enterQuestions = async (req: Request, res: Response) => {
    return res.status(200).json({msg: "Sucess"});
}