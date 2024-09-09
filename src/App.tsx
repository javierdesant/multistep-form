import Form from "./components/form/Form";

function App() {
  return (
    <>
      <div className="flex h-screen w-screen grow flex-col items-center md:justify-center">
        <Form />

        <div className="attribution m-5">
          Challenge by{" "}
          <a
            href="https://www.frontendmentor.io?ref=challenge"
            target="_blank"
            className="hover:underline"
          >
            Frontend Mentor
          </a>
          . Coded by{" "}
          <a
            href="https://github.com/javierdesant"
            target="_blank"
            className="hover:underline"
          >
            JavierDeSant
          </a>
          .
        </div>
      </div>
    </>
  );
}

export default App;
