import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { email, username, password } = await req.json();

  const isUserExisted = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (isUserExisted) {
    return NextResponse.json("email or username already existed!", {
      status: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const data = await prisma.user.create({
    data: {
      email,
      username,
      hashedPassword,
    },
  });
  if (data) {
    return NextResponse.json({ data }, { status: 201 });
  }

  return NextResponse.json("Something broke!", { status: 500 });
}
