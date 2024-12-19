const EmptyCard = ({ img, message }) => {
  return (
    <div className=" mt-10 lg:mt-0 flex flex-col items-center justify-center text-center">
      <img
        className="w-full sm:w-1/2 h-1/2 object-contain"
        src={img}
        alt="Empty image"
      />
      <h1 className="px-4 font-semibold text-slate-700 text-md leading-7"> {message}
       
        
      </h1>
    </div>
  );
};

export default EmptyCard;
