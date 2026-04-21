import Navbar from "../../../components/Navbar";
import Banner from "../components/Banner";

function Home() {
  // min-h-[28rem]
  return (
    <div className='min-h-96 bg-gray-900 text-white'>
      <Navbar />
      <Banner />
    </div>
  );
}

export default Home;
