import React from "react";
import { Link } from "react-router-dom";
import "./FrontPage.css";

export default function FrontPage() {
  return (
    <div className="frontpage-container">
      <header className="frontpage-header">
        <img src="/logo.png" alt="I Hate Math Logo" className="frontpage-logo" />
        <h1>
          I <span className="hate-quote">"Hate"</span> <span className="math-text">MATH</span>
        </h1>
        {/* You can add background math icons here if desired */}
      </header>
      <main className="frontpage-main">
        <Link to="/question" className="frontpage-btn green">Tra cứu câu hỏi</Link>
        <Link to="/register" className="frontpage-btn red">Đăng ký "Kỳ Thi Trạng số"</Link>
        <Link to="/leaderboard" className="frontpage-btn orange">Bảng vàng "Kỳ Thi Trạng số"</Link>
        <Link to="/manage" className="frontpage-btn purple">Đóng góp câu hỏi</Link>
        <Link to="/about" className="frontpage-btn blue">Về I "Hate" MATH</Link>
      </main>
      <footer className="frontpage-footer">
        <div className="frontpage-socials">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            {/* Facebook SVG */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M17 2.1v3.2c0 .3.2.7.7.7h2.1v3.2h-2.8v9.6h-3.2v-9.6h-2.1V6h2.1V4.2C12.8 2.7 14.1 1.5 15.7 1.5h1.3v.6z" fill="#1877F3"/><path d="M17 2.1v3.2c0 .3.2.7.7.7h2.1v3.2h-2.8v9.6h-3.2v-9.6h-2.1V6h2.1V4.2C12.8 2.7 14.1 1.5 15.7 1.5h1.3v.6z" fill="#1877F3"/><path d="M15.7 1.5c-1.6 0-2.9 1.2-2.9 2.7V6h-2.1v3.2h2.1v9.6h3.2v-9.6h2.8V6h-2.1c-.5 0-.7-.4-.7-.7V2.1h-1.3z" fill="#fff"/></svg>
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            {/* TikTok SVG */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#000"/><path d="M17.5 9.5c-.7 0-1.3-.2-1.9-.5v4.2c0 2-1.6 3.6-3.6 3.6s-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6c.2 0 .4 0 .6.1v1.7c-.2-.1-.4-.1-.6-.1-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2V5.5h1.5c.1 1.1.9 2 2 2v2z" fill="#fff"/></svg>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            {/* YouTube SVG */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#FF0000"/><path d="M16.5 12l-6 3.5v-7L16.5 12z" fill="#fff"/></svg>
          </a>
        </div>
        <div className="frontpage-company">
          <p>Sản phẩm sáng tạo & phát hành bởi<br /><b>Công ty CP Hexagon-G Studio</b></p>
          <img src="/public/images/hexagon-logo.png" alt="Hexagon G Studio" />
        </div>
        <div className="frontpage-copyright">
          © 2025 Hexagon G. All rights reserved.
        </div>
      </footer>
    </div>
  );
} 