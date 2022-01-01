import { Request, Response, Router ,NextFunction} from "express";

import Repo from "../entity/Repo";
//import cache from "../middlewears/cache";

const redis = require('redis');
const fetch = require('node-fetch');



const REDIS_PORT = 6379;





// const client = redis.createClient(REDIS_PORT);
// client.on('connect', function(){
//     console.log('Connected to Redis...');
//   });

//   const client = redis.createClient({
      
//     host:"127.0.0.1",
//     port:REDIS_PORT ,
   
   
    
// });
// client.on('error', function(error){
//     console.log(error);
//   });


  const testConnection =  async (username,repos)=>{
      console.log("inside test func")
   const client = redis.createClient();
    client.on('ready', (success) => console.log('Connected', success));
    // client.on('error', (err) => console.log('Redis Client Error', err));
  
   await client.connect();
    await client.HSET(username, 3600, repos);
    console.log("After set data");
    console.log("after connecting ")

  };
  
  
    // await client.set('key', 'value');
    // const value = await client.get('key');
  
 

// Cache middleware
const cache = async  (req: Request, res: Response, next: NextFunction) => {


    try {
    const { username } = req.body;
    ///let hashKey = new Buffer.from(`${username}`).toString("base64");
    console.log("cache")
   const client = redis.createClient();
    client.on('ready', (success) => console.log('Connected', success));
    // client.on('error', (err) => console.log('Redis Client Error', err));
  
  await client.connect();
   
    
    console.log("after connecting ");
    console.log(typeof username);
    console.log(username)
   
    

     //const res= await client.HGET(username);
    


   await client.HGETALL(username,function(err, data) {
       
        if (err) throw err;
      console.log("before condition");
      console.log(data)
        if (data !== null) {
            console.log("is not equal null");
          return res.status(200).json(data);
        } else {
          next();
        }
      });

      console.log("after HGET ")
    //  await client.HGET(username, (err, data) => {
    //   if (err) throw err;
  
    //   if (data !== null) {
    //     return res.status(200).json(data);
    //   } else {
    //     next();
    //   }
    // });

next();
} catch (err) {
    console.error(err);
    res.status(500);
  }
  };


const getRepos = async (req: Request, res: Response) => {
    try {
      console.log('Fetching Data from Repos...');
  
      const { username } = req.params;
  
      const response = await fetch(`http://api.github.com/users/${username}`);
     
      const data = await response.json();
      console.log(data)
  const repos = data.public_repos;
  testConnection(username,repos);
  console.log(repos + "no of Repos");

  
        // // Set data to Redis
      
      
    
    

    // client.GET(username, (error,value)=>{
    //    if(error){
    //        throw new Error(error);
    //    }
    //    console.log(value)

//    });

  return res.status(200).json(repos);
      // // Set data to Redis
 
  
      // res.send(setResponse(username, repos));
    } catch (err) {
      console.error(err);
      res.status(500);
    }
    };




    const getUsers = async (req: Request, res: Response) => {
        
        try {
          console.log('Fetching Data From Users...');
      
          const { username } = req.body;
          console.log ("UserName Is ",username);
      
          const response = await fetch(`http://api.github.com/users/${username}`);
      
          const data = await response.json();
          console.log("fetching Users")
          console.log(data)

    
          console.log("inside test func")
          const client = redis.createClient();
           client.on('ready', (success) => console.log('Connected', success));
           // client.on('error', (err) => console.log('Redis Client Error', err));
         
          await client.connect();
           await client.HSET(username, 3600, JSON.stringify(data));
           console.log("After set data");
           console.log("after connecting ")
        
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
router.get("/repo/:username", cache,getRepos)
router.put("/",cache,getUsers)




export default router;