import React, { useState } from 'react';
import axios from 'axios';
function ManageQuestions() {
  const [question, setQuestion] = useState('');
  const [solution, setSolution] = useState('');
  const [difficulty, setDifficulty] = useState('1');
  const [answer, setAnswer] = useState('');
  const [code, setCode] = useState('');
  // Hàm để xử lý khi form được submit
  const handleSubmit = async(e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form

    // Logic để gửi dữ liệu câu hỏi mới đến server hoặc xử lý dữ liệu ở đây...
    console.log({ question, solution, difficulty, answer });
    try {
      const response = await axios.post('https://ihm-server-bfbad1b97e15.herokuapp.com/', {
        code,
        question,
        solution,
        difficulty,
        answer
      });
      console.log(response.data); // Xử lý dữ liệu trả về từ server
    } catch (error) {
      console.error('Có lỗi xảy ra:', error);
    }
    // Reset form (tuỳ chọn)
    setCode('');
    setQuestion('');
    setSolution('');
    setDifficulty('1');
    setAnswer('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
      <label>Mã câu hỏi:</label>
      <input type='text' value={code} onChange={(e)=>setCode(e.target.value)}/>
        <label>Nội dung câu hỏi:</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      <div>
        <label>Lời giải:</label>
        <textarea
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
        />
      </div>
      <div>
        <label>Độ khó:</label>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="1">Dễ</option>
          <option value="2">Trung Bình</option>
          <option value="3">Khó</option>
        </select>
      </div>
      <div>
        <label>Đáp án:</label>
        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)}/>
          
        
      </div>
      <button type="submit">Tạo Câu Hỏi</button>
    </form>
  );
}

export default ManageQuestions;
