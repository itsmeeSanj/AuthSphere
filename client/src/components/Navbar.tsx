import { Button } from "antd";
import { FaHome } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className=''>
      <div>
        <FaHome className='w-4 h-4 transition-all md:w-9 md:h-9' />
      </div>
      <Button type='primary'>Button</Button>
    </div>
  );
};

export default Navbar;
