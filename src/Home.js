import React from "react";
import {Link} from 'react-router-dom';
import "./App.css";
import './Home.css';
function Home(){
    return(
        <div className="CenterDiv">
            <h1>I Hate Math</h1>
            <Link to='/search-questions'><input type="button" className="homeButton green" value='Tra cứu Câu Hỏi'/></Link>
            <br/>
            <Link to='/manage-questions'><input type="button" className="homeButton green" value='Quản Lý Câu Hỏi'/></Link>
        </div>
    );
}
export default Home;