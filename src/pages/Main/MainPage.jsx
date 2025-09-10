export default function MainPage({ user }) {
  return (
    <div className="h-screen flex items-center justify-center bg-green-100">
      <h1 className="text-3xl font-bold">Welcome {user.username}, User Main Page</h1>
    </div>
  );
}
