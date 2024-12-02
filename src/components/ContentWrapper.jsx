const ContentWrapper = ({ children }) => {
  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <div className="mx-2 md:mx-4">{children}</div>
    </div>
  );
};

export default ContentWrapper;
