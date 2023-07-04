import { connectToMongoDB } from "@/util/mongodb";
// import { hash } from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Post from "@/models/post";

export const GET = async (request: Request) => {
  try {
    await connectToMongoDB();
    const posts: Post[] = await Post.find();

    return NextResponse.json(posts);
  } catch (error) {
    return new NextResponse("Database Error!", { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    await connectToMongoDB();

    const { id, title, body }: Post = await request.json();
    // const userExists = await Post.findOne({ id });

    // if (userExists) {
    //   return new NextResponse("User already exists", { status: 409 });
    // } else {
    //   const hashedPassword = await hash(password, 12);
    // }

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error!", { status: 500 });
  }
};
