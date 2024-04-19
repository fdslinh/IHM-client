import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import './fonts/font.css';
import { useNavigate } from 'react-router-dom';
function Question() {
  const [questionId, setQuestionId] = useState('');
  const [questionInfo, setQuestionInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate= useNavigate();
  const fetchQuestionInfo = async () => {
    setIsLoading(true); // Bắt đầu tải
    try {
        console.log(questionId);
      const response = await axios.get(`https://ihm-server-bfbad1b97e15.herokuapp.com/api/question/${questionId}`);
      
      setQuestionInfo(response.data);
      
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
  return (
    <div className='CenterDiv'>
    <h1>Tra cứu câu hỏi I hate Math</h1>
      <input
        type="text"
        value={questionId}
        onChange={(e) => setQuestionId(e.target.value)}
        placeholder="Nhập mã câu hỏi"
      />
      <input type='button' className='button green' onClick={fetchQuestionInfo} value='Tìm kiếm'/>
      <input type='button' className='button yellow' onClick={clearQuestionInfo} value='Clear'/>
      <input type='button' className='button orange' onClick={goBack} value='Back'/>
      {isLoading?(<p>Loading...</p>):
      questionInfo ? (
        <div className='boardSection'>
          <h2>Nội dung câu hỏi: {questionInfo[0].Content}</h2>
          <h3>Lời giải: {questionInfo[0].Solution}</h3>
          <h3>Đáp án: {questionInfo[0].Answer}</h3>
        </div>
      ):(
      <p>Không tìm thấy thông tin câu hỏi.</p>
    )}
    </div>
  );
}

export default Question;