'use server'
import { connectDB } from '@/app/lib/db';
import User from '@/models/User';
import { createSession } from '@/app/lib/session';
import bcrypt from 'bcrypt';

export async function authenticate(_currentState, formData) {  
  try {
    const { email, password } = formData;
    await connectDB();
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid Email');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid Password');
    }
    const userId = user._id.toString();
    const sessionToken = await createSession(userId);
    return { success: true, user: { email: user.email, sessionToken } };
  } catch (error) {
    if (error) {
      switch (error.message) {
        case 'Invalid Email':
          return 'Email Does Not Match.'
        case 'Invalid Password':
          return 'Wrong Password.'
        default:
          return error.message
      }
    }
    throw error
  }
  
}


