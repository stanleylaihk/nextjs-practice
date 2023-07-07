import Topic from "@/models/topic";
import { connectToMongoDB } from "@/util/mongodb";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { title, description } = await request.json();
  await connectToMongoDB();

  await Topic.create({ title, description });
  return NextResponse.json({ message: "Topic Created" }, { status: 201 });
};

export const GET = async (request: NextRequest) => {
  await connectToMongoDB();
  const topics: Topic[] = await Topic.find();
  return NextResponse.json({ topics });
};

export const DELETE = async (request: NextRequest) => {
  const id = request.nextUrl.searchParams.get("id");
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
};
