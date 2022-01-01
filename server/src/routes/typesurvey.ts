import { Request, Response, Router } from "express";

import { isEmpty } from "class-validator";
// import { error } from "node:console";

import { getConnection } from "typeorm";

//import Articles from "../entity/Articles";
//middlewears
import admin from "../middlewears/admin";
import auth from "../middlewears/auth";
import user from "../middlewears/user";
import TypeOfDoc from "../entity/typedocument";
import TypeOfsurvey from "../entity/typeofsurvey";


const createTypeSurvey = async (req: Request, res: Response) => {
    const { surveyName } = req.body;

    let errors: any = {};
    try {
   console.log("create type Survey")
        console.log(surveyName);
        
        if (!surveyName) errors.surveyName = "name be empty !!";
        if(Object.keys(errors).length>0) throw new Error("cannot be empty !!")
        const newsurveyName = await new TypeOfsurvey({ surveyName }).save()
        return res.status(200).json(newsurveyName);
    } catch (error) {
        switch (error.message) {
            case "cannot be empty !!":
                return res.status(401).json(errors);

            default:
                return res.status(500).json({ error: "something went wrong" });
        }
    }
};



const getSurveys = async (_: Request, res: Response) => {
    try {
      
      const typesSurveys = await TypeOfsurvey.find();
     //console.log(articles)
      return res.status(200).json(typesSurveys);
 
    } catch (error) {
      console.log("error");
      return res.status(500).json({ error: "something wenttdd wrong" });
    }
  };


  const router = Router();
//api/articles
//api/ admin/articles

router.post("/" , createTypeSurvey);

router.get("/",getSurveys);
// router.get("/:id" ,getArticle);

// router.delete("/:id",deleteArticle)

export default router;