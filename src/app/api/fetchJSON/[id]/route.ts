import { NextRequest, NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/users";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const res = await fetch(`${DATA_SOURCE_URL}/${params.id}`);

  const user: User = await res.json();

  if (!user.id) return NextResponse.json({ Message: "Not Found" });

  return NextResponse.json(user);
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json({ message: "delete" });
}

export async function POST(request: NextRequest) {
  const { id }: User = await request.json();

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

  const newUser: User = await res.json();

  return NextResponse.json(newUser);
}

export async function PUT(request: NextRequest) {
  const { id, name, username, email }: User = await request.json();

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
