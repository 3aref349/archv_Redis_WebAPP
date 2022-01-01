import { Request, Response, Router } from "express";
import {getConnection} from "typeorm";
import Archive from "../entity/archive";
import Stations from "../entity/stations";
// import Project from "../entity/Project";


import User from "../entity/User";
import auth from "../middlewears/auth";
import user from "../middlewears/user";




/****  GET stations */
const getStations = async (_: Request, res: Response) => {
    try {

      const stations =  await getConnection()
      .getRepository(Stations)
     .createQueryBuilder("stations")
    //   .where("user.id = :id", { id: 1 })
     .getMany();;

   
     //console.log(articles)
      return res.status(200).json(stations);

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "something went wrong" });
    }
  };


//   const getStationBystation_ID = async (req: Request, res: Response) => {
//     // const { id } = req.params;
//     const { station_ID } = req.body;

//     console.log("before try")

//     console.log(station_ID)
//     try {
//         console.log("after try")
//         const stationsdata =  await getConnection()
//         .getRepository(Stations)
//        .createQueryBuilder("stations")
//       //.where('stations.station_ID = station_ID')
//         .where("station.station_ID = station_ID", { station_ID: 1 })
//        .getOne();;     
//           return res.status(200).json(stationsdata);

//     } catch (error) {
//         console.log(error)
//         switch (error.message) {
//             case "Project not found":
//                 return res.status(404).json({ error: error.message });
//             default:
//                 return res.status(500).json({ error: "something went wrong" });
//         }
//     }
// };

  const router = Router();
router.get("/",getStations)
// router.get("/default",user,auth,getProjectsdefault)
//  router.get("/:id", user, auth, getProject);
 //router.put("/", getStationBystation_ID);

//router.post("/",user,auth, createArchive);



export default router;