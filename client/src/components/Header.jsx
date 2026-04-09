import { Button } from "antd";

function Header() {
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-xl font-bold'>Hey, Developer Icon</h1>
      <h2 className='text-lg bg-red-400 p-6'>Welcome to our App</h2>
      <p>
        Lets start with a quick product tour and we will have you up and running
        in on time!
      </p>

      <Button type='primary'>Get Started</Button>
    </div>
  );
}

export default Header;
