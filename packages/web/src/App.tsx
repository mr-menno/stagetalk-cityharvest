import AuthTest from "./AuthTest";

function App() {
  return (
    <>
      <div className="font-semibold text-2xl">stagetalk</div>
      <pre>{JSON.stringify(import.meta.env, null, 2)}</pre>
      <AuthTest />
    </>
  );
}

export default App;
