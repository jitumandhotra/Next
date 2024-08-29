import { NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import { connectDB } from '@/app/lib/db';
import User from '@/models/User';
import validator from "validator"; 
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid'; 

export async function POST(request) {
  try {
    const formData = await request.formData();
    const { username, email, password } = Object.fromEntries(formData);

    if (!validator.isEmail(email)) {
      return NextResponse.json({ error: 'Invalid email format', status: 400 });
    }
    if (username.length < 3 || username.length > 20) {
      return NextResponse.json({ error: 'Username must be 3-20 characters', status: 400 });
    }
    if (!password || password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters', status: 400 });
    }

    await connectDB();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already exists', status: 400 });
    }

    const file = formData.get("profilePhoto");
    let filePath = null;

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const originalFilename = file.name.replace(/\s+/g, "_");
      const uniqueFilename = `${uuidv4()}_${originalFilename}`; 
      const directoryPath = path.join(process.cwd(), "public/uploads/users/profilepic");
      filePath = path.join(directoryPath, uniqueFilename);

      try {
        await mkdir(directoryPath, { recursive: true });
        await writeFile(filePath, buffer);
        filePath = `/uploads/users/profilepic/${uniqueFilename}`;
      } catch (error) {
        console.error("Error occurred while writing file: ", error);
        return NextResponse.json({ error: 'File upload failed', details: error.message, status: 500 });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilePhoto: filePath,
    });
    await newUser.save();
    return NextResponse.json({ sucess: true, status: 201, message: 'User created successfully', user: newUser });

  } catch (error) {
    console.error("Error occurred during registration: ", error);
    if (error.name === 'MongoError' && error.code === 11000) {
      return NextResponse.json({ error: 'Username or email already exists', status: 400 });
    } else {
      return NextResponse.json({ error: 'Registration failed', details: error.message, status: 500 });
    }
  }
}
