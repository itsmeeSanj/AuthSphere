// client/src/features/admin/pages/Dashboard.tsx
import { useAuth } from "../../auth/hooks/useAuth";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className='p-8'>
      SDFDSF
      <h1 className='text-2xl font-bold'>Welcome, {user?.name}!</h1>
      <p className='text-gray-500'>{user?.email}</p>
      <button onClick={logout} className='mt-4 text-red-500'>
        Logout
      </button>
    </div>
  );
}
