import React from "react";
import './App.css';
function SearchSection(){
    const [questionId, setQuestionId] = useState('');
    return(
    <div className="roundBorderBox">
        
        <input
            type="text"
            value={questionId}
            onChange={(e) => setQuestionId(e.target.value)}
            placeholder="Nhập mã câu hỏi trên thẻ bài để tra cứu"
          />
    </div>
    )    
}


export default SearchSection;