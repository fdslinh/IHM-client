import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import './fonts/font.css';
import { useNavigate } from 'react-router-dom';
import ScreenHeader from './ScreenHeader';
function Question() {
  const [questionId, setQuestionId] = useState('');
  const [questionInfo, setQuestionInfo] = useState(null);
  const[fields, setFields]= useState(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const navigate= useNavigate();
  const fetchQuestionInfo = async () => {
    setIsLoading(true); // Bắt đầu tải
    try {
        
      const response = await axios.get(`https://ihm-server-bfbad1b97e15.herokuapp.com/api/question/${questionId}`);
      console.log(response.data);
      setQuestionInfo(response.data);
      const inputs= Array.from({length:response.data[0].Count},(_,i)=>i);
      console.log(inputs);
      setFields(inputs);
      console.log(fields);
      
    } catch (error) {
      console.error('Có lỗi xảy ra khi tìm kiếm câu hỏi:', error);
      setQuestionInfo(null); // Xử lý trường hợp lỗi hoặc không tìm thấy câu hỏi
    }finally{
        setIsLoading(false);
    }
  };
 const clearQuestionInfo=()=>{
    setQuestionId('');
    setQuestionInfo(null);

 }
 const goBack=()=>{
    navigate('/');
 }
 const handleAnswerSubmit=()=>{
  const answers=[];
  for(let i=0; i<fields.length; i++){
    
  }
 }
  return (
    <div>
    <ScreenHeader/>
    <div className='roundBorderBox searchSection'>
      <label className="whiteText">Tìm kiếm và tra cứu đáp án</label>
      <input
        type="text"
        value={questionId}
        onChange={(e) => setQuestionId(e.target.value)}
        placeholder="Nhập mã câu hỏi"
      />
      <input type='button' className='button green' onClick={fetchQuestionInfo} value='Tìm kiếm'/>
    </div>
    {isLoading?(<p>Loading...</p>):
      questionInfo ? (
        <div>

        <div className='boardSection'>
          <p className='greenText'>Câu hỏi: {questionInfo[0].Code}</p>
          <p>{questionInfo[0].Content}</p>
          <div className='lineBreak'>&nbsp;</div>
          <p className='greenText'>Hướng dẫn giải:</p>          
          <p>{questionInfo[0].Solution}</p>
          <h3>Đáp án: {questionInfo[0].Answer}</h3>
        </div>
        <div className='answerSection roundBorderBox'>
          <p className='greenText'>Kiểm tra đáp án</p>
          <form onSubmit={handleAnswerSubmit}>
            {
              fields.map((_, index)=>(
                <input type="text" id={`answer-${index}`} key={index} placeholder='Nhập đáp án để kiểm tra'/>
              ))
            }
            <button type='submit' className='greenButton greenText'>Kiểm Tra</button>
          </form>
          
        </div>
        </div>
      ):(
      <p>Không tìm thấy thông tin câu hỏi.</p>
    )}
      <div className='buttonSection'>
        <input type='button' className='button yellow' onClick={clearQuestionInfo} value='Clear'/>
        <input type='button' className='button orange' onClick={goBack} value='Back'/>
      </div>
      
      
    </div>
  );
}

export default Question;