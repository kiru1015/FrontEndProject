import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HrData } from './data';
import AdminDocs from './component/AdminDocs';

const root = ReactDOM.createRoot(
  document.getElementById("root") 
);
root.render(
  <React.StrictMode>
    <AdminDocs
        parent={HrData}
        onParentClick={(val) => console.log("clicked on folder", val.name)}
        onNameClick={(val) => console.log("clicked on file", val.name,val.added, val.size)}
        expandOnHover={false}
        />
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
