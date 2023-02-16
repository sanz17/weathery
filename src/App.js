import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import {Banner } from './components/Banner';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Banner/>
      <p style={{'color': '#595959',
                        'fontFamily': 'sans-serif',
                        'borderTop':'2px solid rgba(0, 0, 0, 0.05)'}}>
                Made with &#128149; by {' '}
                <a
                    style={{'textDecoration':'none','color': '#595959','fontWeight':'bolder'}}
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/sanz17">
                    Sanz
                </a>
                . Made with {' '}
                <a
                    style={{'textDecoration':'none','color': '#595959','fontWeight':'bolder'}}
                    target="_blank"
                    rel="noreferrer"
                    href="https://reactjs.org">
                    ReactJS 2023
                </a>
            </p>
    </div>
  );
}

export default App;
