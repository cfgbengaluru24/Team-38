import { Request, Response } from "express";
import prisma from "../../utils/db";

export const freshersDetails = async (req: Request, res: Response) => {
	const { userRole } = req;
	if (userRole !== "advanced")
		return res.status(403).json({ msg: "you are not authorized!" });

	try {
		const data = await prisma.fresher.findMany();
		console.log("DATA IS: ", data);
		
		if (!data) return res.status(404).json({ msg: "no data found!" });
		res.status(200).json(data);
	} catch (e: any) {
		console.log(e.message);
		return res.status(400).json(e.message);
	}
};

export const customersDetails = async (req: Request, res: Response) => {
	const { userRole, id } = req;

	if (userRole !== "advanced") {
		return res.status(403).json({ msg: "you are not authorized!" });
	}

	try {
		const data = await prisma.customer.findMany({
			where: {
				trainerId: id
			}
		});

		if (!data) {
			return res.status(404).json({ msg: "no trainer found!" });
		}

		res.status(200).json(data);
	} catch (e: any) {
		console.error(e.message);
		return res.status(400).json({ msg: e.message });
	}
};
