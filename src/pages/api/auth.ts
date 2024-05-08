import { NextApiRequest, NextApiResponse } from 'next';
import  login from "./auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // await login('credentials', { email, password });
    
    res.status(200).json({ success: true });
  } catch (error) {
    // if (error.type === 'Credentialslogin') {
      res.status(401).json({ error: 'Invalid credentials.' });
    // } else {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }

