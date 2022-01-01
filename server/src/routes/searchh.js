import { Request, Response, Router ,NextFunction} from "express";
import axios from 'axios'
import Repo from "../entity/Repo";
//import cache from "../middlewears/cache";

const redis = require('redis');
const fetch = require('node-fetch');



const REDIS_PORT = 6379;





// const client = redis.createClient(REDIS_PORT);
// client.on('connect', function(){
//     console.log('Connected to Redis...');
//   });

  const client = redis.createClient({
    host:"127.0.0.1",
    port: REDIS_PORT,
    expire: 60 *60
})



// Cache middleware
const cache = async  (req, res, next) => {


    try {
    const { username } = req.params;
  
    client.get(username, (err, data) => {
      if (err) throw err;
  
      if (data !== null) {
        return res.status(200).json(data);
      } else {
        next();
      }
    });


} catch (err) {
    console.error(err);
    res.status(500);
  }
  };


const getRepos = async (req, res) => {
    try {
      console.log('Fetching Data. REpo..');
   
      const { username } = req.params;
  
      const response = await fetch(`http://api.github.com/users/${username}`);
  
      const data = await response.json();
      console.log(data)
  const repos = data.public_repos;
  console.log(repos + "no of Repos")

  
        // // Set data to Redis
        client.on('connect', ()=>{
            console.log('Connected to Redis...');
            
          });
          
    client.SETEX(username, 3600, repos);
//    await client.GET(username, (error,value)=>{
//        if(error){
//            throw new Error(error);
//        }
//        console.log(value)

//    });

  return res.status(200).json(repos);
      // // Set data to Redis
 
  
      // res.send(setResponse(username, repos));
    } catch (err) {
      console.error(err);
      res.status(500);
    }
    };




    const getUsers = async (req, res) => {
        
        try {
          console.log('Fetching Data. Users..');
      
          const { username } = req.params;
      
          const response = await axios.post(`http://api.github.com/users/${username}`);


      
          const data = await response.json();
          console.log("fetching Users")
          console.log(data)
      const repos = data.public_repos;
      console.log(repos + "no of Repos")
        client.on('connect', function(){
        console.log('Connected to Redis...');
      });
        client.SETEX(username, 3600, data);
      return res.status(200).json(data);
          // // Set data to Redis
        //   client.setex(username, 3600, data);
      
          // res.send(setResponse(username, repos));
        } catch (err) {
          console.error(err);
          res.status(500);
        }
        };


    const router = Router();
router.get("/repo/:username",cache, getRepos)
router.get("/:username",cache,getUsers)




export default router;