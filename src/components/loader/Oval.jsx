import { Oval as Loader } from 'react-loader-spinner';

const OvalLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader
        visible={true}
        height="80"
        width="80"
        color="#4B5563"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default OvalLoader;


