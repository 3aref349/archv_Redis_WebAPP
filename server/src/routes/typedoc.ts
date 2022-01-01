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


const createTypeDoc = async (req: Request, res: Response) => {
    const { docName } = req.body;

    let errors: any = {};
    try {
   console.log("create type Doc")
        console.log(docName);
        
        if (!docName) errors.article = "neme be empty !!";
        if(Object.keys(errors).length>0) throw new Error("cannot be empty !!")
        const newdocname = await new TypeOfDoc({ docName }).save()
        return res.status(200).json(newdocname);
    } catch (error) {
        switch (error.message) {
            case "cannot be empty !!":
                return res.status(401).json(errors);

            default:
                return res.status(500).json({ error: "something went wrong" });
        }
    }
};



const getTypes = async (_: Request, res: Response) => {
    try {
      
      const typesDocs = await TypeOfDoc.find();
     //console.log(articles)
      return res.status(200).json(typesDocs);
 
    } catch (error) {
      console.log("error");
      return res.status(500).json({ error: "something wenttdd wrong" });
    }
  };


  const router = Router();
//api/articles
//api/ admin/articles

router.post("/" , createTypeDoc);

router.get("/",getTypes);
// router.get("/:id" ,getArticle);

// router.delete("/:id",deleteArticle)

export default router;