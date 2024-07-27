import { Request, Response } from "express";
import prisma from "../../utils/db";
import bcrypt from "bcrypt";
import { FresherModules, Modules } from "@prisma/client";

export const signup = async (req: Request, res: Response) => {
	const { username, email, password } = req.body;

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const exists = await prisma.fresher.findFirst({
			where: {
				email
			},
		});

		if (exists)
			return res.status(400).json({
				err: "user already exists!",
			});

		const result = await prisma.fresher.create({
			data: {
				username,
				email,
				password: hashedPassword,
			},
		});

		if (!result) {
			return res.status(401).json({
				err: "couldn't add to the database",
			});
		}

		const modules: Array<Modules> = await prisma.modules.findMany();

		let toResolve: Array<Promise<FresherModules>> = [];
		for(let i = 0; i < modules.length; i++) {
			const temp = prisma.fresherModules.create({
				data: {
					fresherId: result.id,
					moduleId: modules[i].id
				}
			})

			toResolve.push(temp);
		}

		Promise.all([...toResolve]);

		console.log("DONE");
		

		return res.status(200).json({ msg: "Success!" });
	} catch (err: any) {
		return res.status(500).json({
			err: "internal server error" + err.message,
		});
	}
};

export const fetchModules = async (req: Request, res: Response) => {
	const { id } = req.query;

	if(!id) return res.status(400).json({msg: "no id found!"});

	try {
		const result = await prisma.fresherModules.findMany({
			where: {
				fresherId: id as string
			},
			include: {
				Modules: true
			}
		});
		const response = result.map((item) => ({
			moduleId: item.moduleId,
			moduleName: item.Modules.moduleName,
			completed: item.completed
		}));

		return res.status(200).json(response);
	}
	catch(e: any) {
		res.status(400).json({msg: "Error in fetching data!"});
	}
}

// export const getAllStudents = async (req: Request, res: Response) => {
// 	const { userRole } = req;

// 	if (!userRole || userRole === "student")
// 		return res.status(403).json({ err: "not authorized!" });

// 	let studs: Array<object>;
// 	try {
// 		if (userRole === "teacher") {
// 			studs = await prisma.student.findMany({
// 				select: {
// 					name: true,
// 					email: true,
// 					usn: true,
// 				},
// 			});
// 		} else {
// 			studs = await prisma.student.findMany({
// 				include: {
// 					studentDetails: true,
// 				},
// 			});
// 			if (!studs.length)
// 				return res.status(404).json({
// 					err: "no students found!",
// 				});
// 		}
// 		return res.status(200).json(studs);
// 	} catch (e: any) {
// 		return res.status(400).json({
// 			err: "error occured: " + e.message,
// 		});
// 	}
// };

// export const getSpecificStudent = async (req: Request, res: Response) => {
// 	const { studentId } = req.params;
// 	const { userRole } = req;

// 	console.log("USEROLE: ", userRole);

// 	if (!userRole || (userRole === "student" && studentId !== req.userId))
// 		return res.status(403).json({
// 			err: "you are neither admin nor requesting your information",
// 		});

// 	let studs: object | null;
// 	try {
// 		if (userRole === "teacher") {
// 			studs = await prisma.student.findUnique({
// 				select: {
// 					name: true,
// 					email: true,
// 					usn: true,
// 				},
// 				where: {
// 					studentId,
// 				},
// 			});
// 		} else {
// 			studs = await prisma.student.findUnique({
// 				include: {
// 					studentDetails: true,
// 				},
// 				where: {
// 					studentId,
// 				},
// 			});
// 			if (!studs)
// 				return res.status(404).json({
// 					err: "student not found!",
// 				});
// 		}

// 		return res.status(200).json(studs);
// 	} catch (e: any) {
// 		return res.status(400).json({
// 			err: "error occured: " + e.message,
// 		});
// 	}
// };

// export const getSpecificStudentScores = async (req: Request, res: Response) => {
// 	const { studentId } = req.params;
// 	const { userRole } = req;

// 	if (!userRole || (userRole === "student" && studentId !== req.userId))
// 		return res.status(403).json({
// 			err: "you are neither admin nor requesting your information",
// 		});

// 	try {
// 		const scores = await prisma.score.findMany({
// 			where: {
// 				studentId,
// 			},
//       include: {
//         CourseObj: {
//           include: {
//             course: true
//           }
//         }
//       }
// 		});

// 		return res.status(200).json(scores);
// 	} catch (e: any) {
// 		return res.status(400).json({
// 			err: "unknown error fetching scores!",
// 		});
// 	}
// };

// export const getSpecificStudentByUsn = async (req: Request, res: Response) => {
// 	const { usn } = req.params;
// 	const { userRole } = req;

// 	try {
// 		const exists = await prisma.student.findUnique({
// 			where: { usn },
// 		});

// 		if (!exists)
// 			return res.status(404).json({
// 				err: "student not found!",
// 			});

// 		if (
// 			!userRole ||
// 			(userRole === "student" && exists?.studentId !== req.userId)
// 		)
// 			return res.status(403).json({
// 				err: "you are neither admin nor requesting your information",
// 			});
// 	} catch (e: any) {
// 		return res.status(500).json({
// 			err: "error: " + e.message,
// 		});
// 	}

// 	let studs: object | null;
// 	try {
// 		if (userRole === "teacher") {
// 			studs = await prisma.student.findUnique({
// 				select: {
// 					name: true,
// 					email: true,
// 					usn: true,
// 				},
// 				where: {
// 					usn,
// 				},
// 			});
// 		} else {
// 			studs = await prisma.student.findUnique({
// 				include: {
// 					studentDetails: true,
// 				},
// 				where: {
// 					usn,
// 				},
// 			});
// 			if (!studs)
// 				return res.status(402).json({
// 					err: "student not found!",
// 				});
// 		}

// 		return res.status(200).json(studs);
// 	} catch (e: any) {
// 		return res.status(400).json({
// 			err: "error occured: " + e.message,
// 		});
// 	}
// };

// export const updateStudentDetails = async (req: Request, res: Response) => {
// 	const { studentId } = req.params;
// 	const { password, dateOfBirth, gender, address, phNo } = req.body;

// 	if (password) {
// 		try {
// 			const hashedPassword = await bcrypt.hash(password, 10);
// 			await prisma.student.update({
// 				data: {
// 					password: hashedPassword,
// 				},
// 				where: { studentId },
// 			});
// 		} catch (e: any) {
// 			console.log("error updatinng password!");
// 		}
// 	}

// 	try {
// 		let dob: Date | undefined = undefined;
// 		if (dateOfBirth) {
// 			const l = dateOfBirth.split("-");
// 			if (l.length === 3) {
// 				const year = parseInt(l[2], 10);
// 				const month = parseInt(l[1], 10) - 1;
// 				const date = parseInt(l[0], 10) + 1;

// 				dob = new Date(year, month, date);
// 			} else dob = undefined;

// 			if (dob) {
// 				const x = dob.toDateString().split(" ");
// 				const monthInd =
// 					"JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(x[1]) / 3 + 1;
// 				const parseDate = `${x[3]}-${(monthInd < 10 ? "0" : "") + monthInd}-${
// 					x[2]
// 				}`;
// 				if (
// 					!dateCheck.safeParse({
// 						date: parseDate,
// 					}).success
// 				)
// 					throw new Error("invalid date of birth provided!");
// 			}
// 		}

// 		await prisma.studentDetails.update({
// 			data: {
// 				gender,
// 				address,
// 				phNo,
// 				dateOfBirth: dob,
// 			},
// 			where: { studentId },
// 		});

// 		return res.status(200).json({
// 			msg: "success!",
// 		});
// 	} catch (e: any) {
// 		return res.status(400).json({
// 			err: "error updating profile! " + e.message,
// 		});
// 	}
// };
