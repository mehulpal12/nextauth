
export default async function UserProfile({params}: any) {
    const { id } = await params;  
  return (
    <div>
      <h1 className="text-4xl">Profile Page </h1>
      <span>{id}</span>
    </div>
  );
}
