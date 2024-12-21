
function App() {

  return (
    <>
      <div className="font-semibold text-2xl">
        stagetalk
      </div>
      <pre>
      {JSON.stringify(import.meta, null, 2)}
      </pre>
    </>
  )
}

export default App
