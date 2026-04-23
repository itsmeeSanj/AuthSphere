import { Button } from "antd";
import { FaHome } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router";

import { AuthProvider } from "../features/auth/context/AuthProvider";

export default function AuthLayout() {
  const navigate = useNavigate();
  return (
    <div className='h-screen bg-linear-to-br from-blue-200 via-[#33369b] to-gray-600 flex items-center justify-center relative'>
      <div className='absolute top-4 left-4'>
        <Button
          type='text'
          size='large'
          onClick={() => navigate("/")}
          className='hover:bg-transparent! focus:bg-transparent! active:bg-transparent! shadow-none'
          icon={<FaHome size={34} style={{ color: "#6367FF" }} />}
        />
      </div>

      <div className='bg-white p-6 rounded-2xl shadow-lg w-full max-w-xs md:max-w-md '>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </div>

      {/*  */}
    </div>
  );
}
