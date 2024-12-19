import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, jwt, sign, verify } from "hono/jwt";
import { signinInput, signupInput } from './zod';

export const userRouter =new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_KEY:string;
     
    },
      Variables : {
          userId: string;
      }
  }>();

userRouter.post("/signup", async (c) => {
    //Generate PrismaClient to interact with User
    const prisma =  new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    // Get User Data from Req.Body
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    if(!success){
      c.status(403)
      return c.json("Incorrect Inputs");
    }
    // craete a New User
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
        },
      });
      // generate jwt token for that user
      const token = await sign({ id: user.id }, c.env.JWT_KEY);
      // return the token as josn
      return c.json({ token });
    } catch (error) {
      c.status(400);
      return c.json({ message: error });
    }
  });
  userRouter.post("/signin", async  (c) => {
    //Generate PrismaClient to interact with User
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    // Get User Data from Req.Body
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body);
    if(!success){
      c.status(403)
      return c.json("Incorrect Inputs");
    }
  
    const user = await  prisma.user.findUnique({where:{
      email:body.email
    }})
    if(!user){
      return c.json({message: "not Found"});
    }
  
    const jwt = await sign({id:user.id},c.env.JWT_KEY)
    return c.json({jwt});
  });