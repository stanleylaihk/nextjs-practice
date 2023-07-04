import { NextRequest, NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";

export async function GET() {
  try {
    const res = await fetch(DATA_SOURCE_URL);
    const posts: Post[] = await res.json();

    console.log(posts);

    return NextResponse.json(posts);
  } catch (error) {
    return new NextResponse("Database Error!", { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { id }: Post = await request.json();

  try {
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
  } catch (error) {
    return new NextResponse("Database Error!", { status: 500 });
  }
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
      title,
      body,
    }),
  });

  const updatePost: Post = await res.json();

  return NextResponse.json(updatePost);
}

export async function DELETE(request: NextRequest) {
  // const { id }: Partial<Post> = await request.json();
  const id = 5;

  const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return NextResponse.json({ message: "delete" });
}
