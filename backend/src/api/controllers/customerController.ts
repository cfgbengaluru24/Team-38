import { Request, Response } from "express";
import prisma from "../../utils/db";

export const enterCustomerDetails = async (req: Request, res: Response) => {
	const { name, email, trainerId } = req.body;
	try {
		const result = await prisma.customer.create({
			data: {
				name,
				email: email,
				trainerId,
			},
		});

		if (!result) throw new Error("error adding customer");

		return res.status(200).json({ msg: "success!" });
	} catch (e: any) {
		return res.status(400).json({ msg: "error! bad request!" });
	}
};
