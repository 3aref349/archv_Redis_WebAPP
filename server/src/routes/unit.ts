import { Request, Response, Router } from "express";
import Project from "../entity/Project";

import ProjectData from "../entity/ProjectData";
import Unit from "../entity/Unit";
import User from "../entity/User";
import auth from "../middlewears/auth";
import user from "../middlewears/user";

const createUnit = async (req: Request, res: Response) => {
    const { description, unitIdentifier } = req.body;
    let errors: any = {};
    console.log(res.locals.user)
    try {
  
        const newUnit = await new Unit({ description, unitIdentifier }).save()
       
        return res.status(200).json(newUnit);
    } catch (error) {
        console.log(error)
        switch (error.message) {
            case "cannot be empty !!":
                return res.status(401).json(errors);

            default:
                return res.status(500).json({ error: "something went wrong" });
        }
    }
}


// Get Units 

//!GET ARTICLES
const getUnits = async (_: Request, res: Response) => {
    try {
      
      const units = await Unit.find();

      return res.status(200).json(units);
 
    } catch (error) {
      console.log("error");
      return res.status(500).json({ error: "something wenttd wrong" });
    }
  };



const router = Router();
router.get("/",user,auth,getUnits)
// router.get("/:id", user, auth, getProject);

router.post("/", user, auth, createUnit);


export default router;