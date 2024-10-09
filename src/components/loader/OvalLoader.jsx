import { Oval as Loader, Oval } from "react-loader-spinner";

const OvalLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Oval
        visible={true}
        height={80}
        width={80}
        color="#6b7280"
        secondaryColor="#d1d5db" 
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

//#a94d4d
//#ba1a1a

export default OvalLoader;
