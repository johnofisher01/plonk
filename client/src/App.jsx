import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import GlobalHeader from "./components/GlobalHeader";
import Dashboard from "./pages/Dashboard";

function App() {
    return (
        <Router>
            <div className="App">
                <GlobalHeader/>
                <main className="container mx-auto px-4 py-6">
                    <Routes>
                        <Route path="/"
                            element={<Dashboard/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
