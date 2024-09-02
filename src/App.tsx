import Form from "./components/Form"

function App() {

  return (
    <>
      <h1 className=" text-6xl font-ubuntu">App</h1>

      <Form
        steps={[
          { id: "step-1", name: "Your info" },
          { id: "step-2", name: "Select plan" },
          { id: "step-3", name: "Add-ons" },
          { id: "step-4", name: "Summary" },
        ]}
      />

      <div className="attribution m-5">
          Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" className="hover:underline">Frontend Mentor</a>. 
          Coded by <a href="https://github.com/javierdesant" target="_blank" className="hover:underline">JavierDeSant</a>.
      </div>
    </>
  )
}

export default App
