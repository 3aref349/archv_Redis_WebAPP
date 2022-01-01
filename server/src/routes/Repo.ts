import { Request, Response, Router } from "express";

import Repo from "../entity/Repo";


const fetch = require('node-fetch');





const getRepos = async (req: Request, res: Response) => {
  try {
    console.log('Fetching Data...');

    const { username } = req.params;

    const response = await fetch(`http://api.github.com/users/${username}`);

    const data = await response.json();
    console.log(data)
const repos = data.public_repos;
console.log(repos + "no of Repos")
return res.status(200).json(repos);
    // // Set data to Redis
    // client.setex(username, 3600, repos);

    // res.send(setResponse(username, repos));
  } catch (err) {
    console.error(err);
    res.status(500);
  }
  };




  const createRepo = async (req: Request, res: Response) => {
    const { repoName,author,repoDescription } = req.body;
    let errors: any = {};
    // console.log(res.locals.user)
    try {
        console.log(repoName)
     
        console.log(author)
       
        console.log(repoDescription)
        // console.log(company_name)
        // console.log(Governorate)
        // console.log(Center)
       
        if (!repoName) errors.repoName = "cannot be empty !!";
        if (!repoDescription) errors.repoDescription = "cannot be empty !!";
        if (!author) errors.author = "cannot be empty !!";

        // if (!Location) errors.Location = "cannot be empty !!";
        if (Object.keys(errors).length > 0) throw new Error("cannot be empty !!")

        const newRepo = await new Repo({ repoName,repoDescription,author }).save()

        return res.status(200).json(newRepo);
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



const router = Router();
router.get("/:username",getRepos)
router.post("/",createRepo);



export default router;