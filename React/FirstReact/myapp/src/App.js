// import logo from './logo.svg';
// import './App.css';
import FuctionalComp from './Components/FunctionalComp';
import { ClassComp, ClassComp1 } from './Components/ClassComp';
import Click from './Components/Click';
import Counter from './Components/Counter';
import ParentComp from './Components/ParentComp';

function App() {
  return (
    <div>
      <h1>Hello! Welcone to Badu9</h1>
      <h1>This video is about Components</h1>
      <FuctionalComp />
      <ClassComp />
      <ClassComp1 />
      <Click />
      <Counter />
      <ParentComp />
    </div>
  );
}

export default App;
