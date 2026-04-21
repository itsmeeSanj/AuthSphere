import { Button } from "antd";

export default function Banner() {
  return (
    <div className='pt-32 w-1/2 mx-auto'>
      <h1 className='text-4xl'>Hey, Developer Icon</h1>
      <h2 className='text-2xl'>Welcome to our App</h2>
      <p>
        Lets start with a quick product tour and we will have you up and running
        in on time!
      </p>

      <Button shape='round' variant='outlined' size='middle'>
        Get Started
      </Button>
    </div>
  );
}
