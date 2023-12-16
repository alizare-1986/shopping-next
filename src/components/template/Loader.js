import { ThreeCircles } from "react-loader-spinner";

function Loader() {
  
  return (
    <div className=" w-[1400px] justify-center items-center flex h-96 ">
      <ThreeCircles height="100" width="100" color="#4fa94d" />
    </div>
  );
}

export default Loader;
