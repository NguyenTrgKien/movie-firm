import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { publicRouter } from './routes';

function App() {
    return (
        <Router>
            <div className="App">
              <Routes>
                {publicRouter.map((route, index) => {
                  
                  return (
                    <Route key={index} path={route.to} element={<route.component/>}/>
                  )
                })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
