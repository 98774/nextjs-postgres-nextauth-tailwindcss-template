import { Card, Title, Text } from '@tremor/react';
import Search from './search';
import UsersTable from './table';
import GetStudents from './api/auth/[...nextauth]/query';


export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {

  const rows = await GetStudents({searchParams});
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>A list of users retrieved from a Postgres database.</Text>
      <Search />
      <Card className="mt-6">
        <UsersTable users={rows} />
      </Card>
    </main>
  );
}
