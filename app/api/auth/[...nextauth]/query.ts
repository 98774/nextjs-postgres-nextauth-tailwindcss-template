import { NextApiRequest, NextApiResponse } from 'next';
import { createPool } from 'mariadb';

const pool = createPool({
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export default async function GetStudents({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? 'NOTANAMENOTANAME';
  const conn = await pool.getConnection();
  const rows = await conn.query('SELECT * FROM studentInfo where firstName LIKE "'+ search + '%" or lastName LIKE  "' + search + '%" LIMIT 50');
  conn.release();
  const students = rows as Student[];

  return students;
}
