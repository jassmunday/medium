import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, jwt, sign, verify } from "hono/jwt";
import { userRouter } from "./user";
import { createBlog, updateBlog } from "./zod";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_KEY: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = await verify(token, c.env.JWT_KEY);
    if (!payload || !payload.id) {
      c.status(401);
      return c.json({ error: "unauthorized" });
    }
    c.set("userId", String(payload.id));
    await next();
  } catch (error) {
    c.status(403);
    return c.json({ message: "Not Logged In", error });
  }
  // const jwt = c.req.header("Authorization") || '';
  // if (!jwt) {
  //   c.status(401);
  //   return c.json({ error: "unauthorized" });
  // }
  // const token = jwt.split(" ")[1];
  // const payload = await verify(token, c.env.JWT_KEY);
  // if (!payload || !payload.id) {
  //   c.status(401);
  //   return c.json({ error: "unauthorized" });
  // }

  // c.set("userId", String(payload.id));
  // await next();
});

blogRouter.get("/get/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = await c.req.param("id");
  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: id,
      },
      select:{
        id:true,
        title:true,
        content:true,
        published:true,
        author:{
          select:{
            name:true
          }
        }
      }
    });
    return c.json({ blog: blog });
  } catch (error) {
    c.status(400);
    return c.json({ message: error });
  }
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");

  const body = await c.req.json();
  const {success} = createBlog.safeParse(body);
    if(!success){
      c.status(403)
      return c.json("Incorrect Inputs");
    }
  // craete a New Blog
  try {
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
    return c.json(blog.id
    );
  } catch (error) {
    c.status(400);
    return c.json({ message: error });
  }
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const {success} = updateBlog.safeParse(body);
    if(!success){
      c.status(403)
      return c.json("Incorrect Inputs");
    }
  // Update Blog
  try {
    const blog = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json(blog.id);
  } catch (error) {
    c.status(400);
    return c.json({ message: error });
  }
});

blogRouter.get("/all", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  //const body = await c.req.json();
  try {
    const blogs = await prisma.post.findMany({
      select:{
        id: true,
        title:true,
        content:true,
        published:true,
        author:{
          select:{
            name:true
          }
        }
      }
    });

    return c.json({ blogs : blogs });
  } catch (error) {
    c.status(400);
    return c.json({ message: error });
  }
});
