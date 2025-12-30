import connectDB from "@/_lib/mongoose";
import UserForm from "@/_models/userFormSchema";
import { NextResponse } from "next/server";
import FormType from "@/_types/formType";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = (await request.json()) as FormType;

    const form = await UserForm.create(body);

    return NextResponse.json(
      {
        message: "Form created successfully",
        form,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const forms = await UserForm.find().sort({ createdAt: -1 });
    return NextResponse.json(forms, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Database connection error" },
      { status: 500 }
    );
  }
}
