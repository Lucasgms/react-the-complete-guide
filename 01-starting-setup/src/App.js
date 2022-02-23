import Expenses from "./components/Expenses";

function App() {
  const expenses = [
    { id: 'e1', title: 'Toilet paper', amount: 94.12, date: new Date(2022, 2, 28) },
    { id: 'e2', title: 'New TV', amount: 799.49, date: new Date(2022, 2, 28) },
    { id: 'e3', title: 'Car insurance', amount: 294.67, date: new Date(2022, 2, 28) },
    { id: 'e4', title: 'Car insurance', amount: 294.67, date: new Date(2022, 2, 28) },
  ];

  return (
    <div>
      <h2>Let's get started!</h2>
      <Expenses expenses={expenses} />
    </div>
  );
}

export default App;
