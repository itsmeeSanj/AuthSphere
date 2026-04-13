import { Button } from "antd";
import { FaHome } from "react-icons/fa";
import { IoLogInOutline } from "react-icons/io5";

import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='w-full flex items-center justify-between p-4 sm:p-6 sm:px-24 absolute top-0'>
      <div>
        <FaHome className=' transition-all ' size={34} />
      </div>
      <div>
        <Button
          type='primary'
          icon={<IoLogInOutline size={16} />}
          iconPlacement='end'
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
