import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import './fonts/font.css';
import ScreenHeader from './ScreenHeader';
import ScreenFooter from './ScreenFooter';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

function Question() {
  const redStar=`image redStarImg`;
  const greenStar=`image greenStarImg`;
  
  const [questionId, setQuestionId] = useState('');
  const [questionInfo, setQuestionInfo] = useState(null);
  const [questionCode, setQuestionCode] = useState(null);
  const [score, setScore] = useState(null);
  const [starImg, setStarImg] = useState(null);
  const[fields, setFields]= useState(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isAnswerLoading, setIsAnswerLoading] = useState(false);
  // const navigate= useNavigate();
  const localhost=`http://localhost:3001/`;
  const serverURL=`https://ihm-server-bfbad1b97e15.herokuapp.com/`;
  const fetchQuestionInfo = async () => {
    setIsLoading(true); // Bắt đầu tải
    try {
        
      const response = await axios.get(serverURL+`api/question/${questionId}`);
      console.log(response.data);
      setQuestionInfo(response.data);
      const inputs= Array.from({length:response.data[0].Count},(_,i)=>i);
      console.log(inputs);
      setFields(inputs);
      console.log(fields);
      setQuestionCode(response.data[0].Code);
      
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
    // navigate('/');
 }
 const handleAnswerSubmit=async(e)=>{
  e.preventDefault();
  let answers='';
  for(let i=0; i<fields.length; i++){
    const inputID= `answer-${i}`;
    if(i==fields.length-1){
      answers+= document.getElementById(inputID).value;
    }else{
      answers+= document.getElementById(inputID).value+'_';
    }
    
  }
  try {
    const response = await axios.post(serverURL+'api/answers', {
      questionCode,      
      answers
    });
    console.log(response.data); // Xử lý dữ liệu trả về từ server
    if(response.data!='Answer incorrect'){
      setScore(response.data[0].Grade);
      setStarImg(greenStar);
    }else{
      setScore(0);
      setStarImg(redStar);
    }
    setIsAnswerLoading(true);
  } catch (error) {
    console.error('Có lỗi xảy ra:', error);
  }finally{
    setIsAnswerLoading(false);
  }
 }
  return (
    <Container fluid>
      <Row>
        <Col>
          <ScreenHeader/>
        </Col>
      </Row>
      <Row>
        <Col>&nbsp;</Col>
        <Col>
        <div className='mainSection'>
    
    <div className='roundBorderBox searchSection'>      
      <div className='questionSearchSection'>
        <label className="whiteText headerText">Tìm kiếm <br/> và tra cứu đáp án</label>
        <div id='divSearchQuestion' className='roundBorderBox'>
          <input id='txtSearchQuestion'
            type="text"
            value={questionId}
            onChange={(e) => setQuestionId(e.target.value)}
            placeholder="Nhập mã câu hỏi"
          />
          <input type='button' className='round greenBackground searchButton' onClick={fetchQuestionInfo}  />
        </div>
          
          
      </div>
      <div className='instructionSection'></div>
    </div>
    {isLoading || isAnswerLoading?(<Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>):
      questionInfo ? (
        <div className='detailSection'>

        <div className='boardSection'>
          
          <p className='greenText'><img className='smallimage questionMark'/> Câu hỏi: {questionInfo[0].Code}</p>
          <div style={{float:'left'}}>
            {questionInfo[0].Content}            
          </div>
          <div className='smallscore'>
              <img className='smallimage yellowStar'/>
              {questionInfo[0].Grade} điểm
            </div>
            <div className='smallcard'>
              <img className='smallimage greenCard'/>
              {questionInfo[0].Count} thẻ
            </div>
          <div className='lineBreak'>&nbsp;</div>
          <p className='greenText'><img className='smallimage folderIcon'/> Hướng dẫn giải:</p>          
          <p>{questionInfo[0].Solution}</p>
          
        </div>
        <div className='roundBorderBox answerSection'>
          <p className='greenText'><img className='smallimage checkIcon'/> Kiểm tra đáp án</p>
          <form onSubmit={handleAnswerSubmit}>
            {
              fields.map((_, index)=>(
                <input type="text" id={`answer-${index}`} key={index} placeholder='Nhập đáp án để kiểm tra'/>
              ))
            }
            <button type='submit' className='greenButton greenText'>Kiểm Tra</button>
            <div className={starImg}><p className={score==0?'score redText':'score greenText'}>{score}</p></div>
          </form>
          
        </div>
        </div>
      ):(
        <div className='detailSection'>

        <p>Không tìm thấy thông tin câu hỏi.</p>
      </div>
    )}
    </div>
        </Col>
        <Col>&nbsp;</Col>
      </Row>
      <Row>
        <Col><ScreenFooter/></Col>
      </Row>
    </Container>
    
  );
}

export default Question;