import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';


export default function QuestionDetail() {
  const localhost=`http://localhost:3001`;
  //const serverURL=`https://ihm-server-f8b0fc8658d8.herokuapp.com`;
  const serverURL=`https://ihm-server.fly.dev`;
  const url= localhost;    
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState({
    id: id,
    code: "",
    text: "",
    solution: "",
    answer: "",
    grade:0,
    isMultiAnswer: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...question });
  // Giả lập fetch, thay bằng API thực tế nếu có
  useEffect(() => {
    if (id === '0' || id === 0) {
      const empty = {
        id: 0,
        code: '',
        text: '',
        solution: '',
        answer: '',
        grade: 0,
        isMultiAnswer: 1,
      };
      setQuestion(empty);
      setEditData(empty);
    } else {
      axios.get(`${url}/api/question-by-id/${id}`)
        .then(res => {
          // Nếu server trả về mảng, lấy phần tử đầu tiên
          const data = Array.isArray(res.data) ? res.data[0] : res.data;
          setQuestion(data);
          setEditData(data);
        })
        .catch(() => {
          alert('Không tìm thấy câu hỏi!');
        });
    }
  }, [id]);

  const handleChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      // Gọi API lưu câu hỏi
      await axios.post(`${url}/api/save-question`, editData);
      setQuestion(editData);
      setIsEditing(false);
    } catch (error) {
      alert('Lưu câu hỏi thất bại!');
      console.error(error);
    }
  };

  const handleCancel = () => {
    setEditData(question);
    setIsEditing(false);
  };

  return (
    <div style={{ maxWidth: 800, margin: "40px auto" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: 16, padding: "6px 18px", borderRadius: 6, border: "1px solid #ccc", background: "#f5f5f5", cursor: "pointer" }}>
        ← Back
      </button>
      <h2>Chi tiết câu hỏi</h2>
      <div style={{ marginBottom: 16 }}>
        <label><b>Mã câu hỏi:</b></label>
        <div>{isEditing ? <input type="text" value={editData.code} onChange={e => handleChange("code", e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }} /> : <div>{question.code}</div>}</div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label><b>Nội dung câu hỏi:</b></label>
        {isEditing ? (
          <input
            type="text"
            value={editData.text}
            onChange={e => handleChange("text", e.target.value)}
            style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
          />
        ) : (
          <div>{question.text}</div>
        )}
      </div>
      <div style={{ marginBottom: 16 }}>
        <label><b>Hướng dẫn giải:</b></label>
        {isEditing ? (
          <CKEditor
            editor={ClassicEditor}
            data={editData.solution}
            onChange={(event, editor) => handleChange("solution", editor.getData())}
          />
        ) : (
          <div style={{ border: '1px solid #ccc', borderRadius: 4, minHeight: 80, padding: 8 }}
            dangerouslySetInnerHTML={{ __html: question.solution }} />
        )}
      </div>
      <div style={{ marginBottom: 16 }}>
        <label><b>Đáp án:</b></label>
        {isEditing ? (
          <input
            type="text"
            value={editData.answer}
            onChange={e => handleChange("answer", e.target.value)}
            style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
          />
        ) : (
          <div>{question.answer}</div>
        )}
      </div>
      <div style={{ marginBottom: 16 }}>
        <label><b>Điểm:</b></label>
        {isEditing ? (
          <input
            type="text"
            value={editData.grade}
            onChange={e => handleChange("grade", e.target.value)}
            style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
          />
        ) : (
          <div>{question.grade}</div>
        )}
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>
          {isEditing ? (
            <input
              type="checkbox"
              checked={editData.isMultiAnswer === 2}
              onChange={e => handleChange("isMultiAnswer", e.target.checked ? 2 : 1)}
            />
          ) : (
            <input type="checkbox" checked={question.isMultiAnswer === 2} readOnly />
          )}
          &nbsp;Dạng câu hỏi nhiều đáp án
        </label>
      </div>
      <div>
        {isEditing ? (
          <>
            <button onClick={handleSave} style={{ marginRight: 8, padding: "6px 18px", borderRadius: 6, border: "1px solid #27ae60", background: "#2ecc40", color: "#fff", cursor: "pointer" }}>Lưu</button>
            <button onClick={handleCancel} style={{ padding: "6px 18px", borderRadius: 6, border: "1px solid #ccc", background: "#f5f5f5", cursor: "pointer" }}>Hủy</button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} style={{ padding: "6px 18px", borderRadius: 6, border: "1px solid #2980b9", background: "#3498db", color: "#fff", cursor: "pointer" }}>Edit</button>
        )}
      </div>
    </div>
  );
} 