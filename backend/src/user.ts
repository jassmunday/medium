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
          name: body.name
        },
      });
      // generate jwt token for that user
      const token = await sign({ id: user.id }, c.env.JWT_KEY);
      // return the token as josn
      return c.text( token );
    } catch (error) {
      console.log(error);
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
    try {
      const user = await  prisma.user.findFirst({where:{
        email:body.email,
        password: body.password
      }})
  
      if(!user){
        return c.json({message: "not Found"});
      }
  
    
      const jwt = await sign({id:user.id},c.env.JWT_KEY)
      return c.text(jwt);
    } catch (error) {
      console.log(error);
      c.status(411)
      return c.text('invalid');
    }
  });