export default function Index(): JSX.Element {

  const handleClick = () => {
    console.log("Hello");
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-3xl text-gray-800">Starting Page</h1>

        <button onClick={handleClick}>clica</button>
      </div>
    </>
  );
}
