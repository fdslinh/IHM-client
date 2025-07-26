import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const mockQuestions = [
  { id: 1, text: "What is 2 + 2?", difficulty: "Easy" },
  { id: 2, text: "Solve the equation x^2 - 4 = 0", difficulty: "Medium" },
  { id: 3, text: "Prove Fermat's Last Theorem", difficulty: "Hard" },
];

export default function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Replace this with an actual API call
    setQuestions(mockQuestions);
  }, []);

  const handleEdit = (id) => {
    navigate(`/question-detail/${id}`);
  };

  const handleDelete = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleCreateNew = () => {
    navigate("/question-detail/0");
  };

  return (
    <div style={{ maxWidth: 800, margin: "40px auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <button onClick={() => navigate("/")} style={{ padding: "6px 18px", borderRadius: 6, border: "1px solid #ccc", background: "#f5f5f5", cursor: "pointer" }}>
          ← Back
        </button>
        <button onClick={handleCreateNew} style={{ padding: "8px 20px", borderRadius: 6, border: "1px solid #3a7ca5", background: "#3a7ca5", color: "#fff", fontWeight: 600, cursor: "pointer" }}>
          + Tạo mới câu hỏi
        </button>
      </div>
      <h2>Danh sách câu hỏi</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Câu hỏi</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Độ khó</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q.id}>
              <td style={{ border: "1px solid #ccc", padding: 8 }}>{q.text}</td>
              <td style={{ border: "1px solid #ccc", padding: 8 }}>{q.difficulty}</td>
              <td style={{ border: "1px solid #ccc", padding: 8 }}>
                <button onClick={() => handleEdit(q.id)} style={{ marginRight: 8 }}>Sửa</button>
                <button onClick={() => handleDelete(q.id)} style={{ color: "#fff", background: "#e74c3c", border: "none", padding: "4px 12px", borderRadius: 4 }}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 