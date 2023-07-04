import { NextRequest, NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/posts";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const res = await fetch(`${DATA_SOURCE_URL}/${params.id}`);

  const post: Post = await res.json();

  if (!post.id) return NextResponse.json({ Message: "Not Found" });

  return NextResponse.json(post);
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json({ message: "delete" });
}

export async function POST(request: NextRequest) {
  const { id }: Post = await request.json();

  if (!id) return NextResponse.json({ message: "ID required" });

  const res = await fetch(DATA_SOURCE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  });

  const newPost: Post = await res.json();

  return NextResponse.json(newPost);
}

export async function PUT(request: NextRequest) {
  const { id, title, body }: Post = await request.json();

  if (!id) return NextResponse.json({ message: "ID required" });

  const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  });

  const updatePost: Post = await res.json();

  return NextResponse.json(updatePost);
}
