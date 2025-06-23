import { notFound } from "next/navigation";

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/username/${username}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    notFound();
  }

  const user = await res.json();

  return (
    <div>
      <h1>User Info:</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
