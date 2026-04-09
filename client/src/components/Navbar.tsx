import { Button } from "antd";
import { FaHome } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className='w-full flex items-center justify-between p-4 sm:p-6 sm:px-24 absolute top-0'>
      <div>
        <FaHome className='w-4 h-4 transition-all md:w-9 md:h-9' />
      </div>
      <div>
        <Button
          type='primary'
          size='small'
          icon={<FaHome />}
          iconPlacement='end'
        >
          Button
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
