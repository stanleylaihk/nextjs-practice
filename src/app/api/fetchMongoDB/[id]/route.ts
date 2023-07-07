import Topic from "@/models/topic";
import { connectToMongoDB } from "@/util/mongodb";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = params.id;
  const { title, description } = await request.json();
  await connectToMongoDB();
  console.log(id, title, description);
  await Topic.findByIdAndUpdate(id, { title, description });
  return NextResponse.json({ message: "Topic updated" }, { status: 200 });
};

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  await connectToMongoDB();
  const topic = await Topic.findOne({ _id: params.id });
  return NextResponse.json({ topic }, { status: 200 });
};
