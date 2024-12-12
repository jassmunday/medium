import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, jwt, sign, verify } from "hono/jwt";

// type Variables ={
//   userId: number;  
// }

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_KEY:string;
   
  },
	Variables : {
		userId: string;
	}
}>();

app.use('/api/v1/blog/*', async (c, next) => {
	const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload = await verify(token, c.env.JWT_KEY);
  if (!payload || !payload.id) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }

  c.set('userId', String(payload.id));
  await next();
})

app.post("/api/v1/signup", async (c) => {
  //Generate PrismaClient to interact with User
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // Get User Data from Req.Body
  const body = await c.req.json();
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
app.post("/api/v1/signin", async  (c) => {
  //Generate PrismaClient to interact with User
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // Get User Data from Req.Body
  const body = await c.req.json();

  const user = await  prisma.user.findUnique({where:{
    email:body.email
  }})
  if(!user){
    return c.json({message: "not Found"});
  }

  const jwt = await sign({id:user.id},c.env.JWT_KEY)
  return c.json({jwt});
});

app.get("/api/blog", (c) => {
  return c.text("Hello User!");
});
app.post("/api/blog", (c) => {
  return c.text("Post blog!");
});
app.put("/api/blog/:id", (c) => {
  return c.text("Put blog!");
});

export default app;
