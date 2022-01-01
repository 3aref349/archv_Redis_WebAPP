import { NextFunction, Request, Response ,Router} from "express";



const redis = require('redis');
const fetch = require('node-fetch');


const REDIS_PORT =  6379;

const client = redis.createClient(REDIS_PORT);

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get token from cookies
      const { username } = req.params;

      client.get(username, (err, data) => {
        if (err) throw err;
    
        if (data !== null) {
         res.send(data);
        } else {
          next();
        }
      });
      return next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: "unauthenticated" });
    }
  };
  