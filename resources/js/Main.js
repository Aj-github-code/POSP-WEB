import React from 'react';
import ReactDOM from 'react-dom';
import Routerss from './Routerss/Routerss';
// import Router from '../Router/Router';

function Main() {
    return (
        <div>
          {/* hello   */}
        <Routerss/>
        </div>
    );
}

export default Main;

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
// ReactDOM.createRoot(document.getElementById('Main')).render(
//     <BrowserRouter>
//         <Main />
//     </BrowserRouter>
// )