import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import './fonts/font.css';
import ScreenHeader from './ScreenHeader';
import ScreenFooter from './ScreenFooter';
import { Container, Row, Col } from 'react-bootstrap';
import {Spinner} from 'react-bootstrap';

function Question() {
  const redStar=`image redStarImg`;
  const greenStar=`image greenStarImg`;
  
  const [questionId, setQuestionId] = useState('');
  const [questionInfo, setQuestionInfo] = useState(null);
  const [questionCode, setQuestionCode] = useState(null);
  const [score, setScore] = useState(null);
  const [starImg, setStarImg] = useState(null);
  const[fields, setFields]= useState(null);
  
  const [isClick, setIsClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnswerLoading, setIsAnswerLoading] = useState(false);
  // const navigate= useNavigate();
  const localhost=`http://localhost:3001`;
  //const serverURL=`https://ihm-server-f8b0fc8658d8.herokuapp.com`;
  const serverURL=`https://ihm-server.fly.dev`;
  const url= serverURL;    
  const fetchQuestionInfo = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Bắt đầu tải
    setIsClick(true);
   
    try {

      const response = await axios.get(`${url}/api/question/${questionId}`);
      console.log(response.data);
      setQuestionInfo(response.data);
      const inputs = response.data[0].question_type;
      //Array.from({length:response.data[0].Count},(_,i)=>i);
      console.log(inputs);
      setFields(inputs);
      console.log(fields);
      setQuestionCode(response.data[0].question_code);
      setStarImg(null);
      setScore(null);

    } catch (error) {
      console.error('Có lỗi xảy ra khi tìm kiếm câu hỏi:', error);
      setQuestionInfo(null); // Xử lý trường hợp lỗi hoặc không tìm thấy câu hỏi
    } finally {
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
  for(let i=0; i<fields; i++){
    const inputID= `answer-${i}`;
    if(i===fields-1){
      answers+= document.getElementById(inputID).value;
    }else{
      answers+= document.getElementById(inputID).value+'_';
    }    
  }
  
  console.log(answers);
  try {
    const response = await axios.post(`${url}/api/answers`, {
      questionCode,      
      answers
    });
    console.log(response.data); // Xử lý dữ liệu trả về từ server
    if(response.data!='Answer incorrect'){
      setScore(response.data);
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
        
        <Col>
        <div className='mainSection'>
    
    <div className='roundBorderBox searchSection'>      
      <div className='questionSearchSection'>
        <label className="whiteText headerText">Tìm kiếm <br/> và tra cứu đáp án</label>
        <form onSubmit={fetchQuestionInfo}>
        <div id='divSearchQuestion'  className='roundBorderBox'>
        
        <input id='txtSearchQuestion'
          type="text"
          value={questionId}
          onChange={(e) => setQuestionId(e.target.value)}
          placeholder="Nhập mã câu hỏi"
        />
        
      </div>
      <button type='submit' className='round greenBackground searchButton' onClick={fetchQuestionInfo}  />
        </form>
        
          
          
      </div>
      <div className='instructionSection'></div>
    </div>
    {(isLoading || isAnswerLoading)?(
      <div className='detailSection'>
      <Spinner animation="border" role="status"></Spinner>
      </div>):
      questionInfo ? (
        <div className='detailSection'>

        <div className='boardSection'>
          
          <p className='greenText'> Câu hỏi: {questionInfo[0].Code}</p>
          <div style={{float:'left'}}>
            {questionInfo[0].question_text}            
          </div>
          <div className='smallscore'>
              <img className='smallimage yellowStar'/>
              <p className='questionInfo'>{questionInfo[0].score} điểm</p>
            </div>
            <div className='smallcard'>
              <img className='smallimage greenCard'/>
              <p className='questionInfo'>{questionInfo[0].question_type} thẻ</p>
            </div>
          <div className='lineBreak'>&nbsp;</div>
          <p className='greenText'>
            {/* <img className='smallimage folderIcon'/>  */}
            Hướng dẫn giải:
          </p>          
          <p>{questionInfo[0].question_solution}</p>
          
        </div>
        <div className='roundBorderBox answerSection'>
          <p className='greenText'>
            {/* <img className='smallimage checkIcon'/>  */}
            Kiểm tra đáp án</p>
          <form onSubmit={handleAnswerSubmit}>
            {
              Array.from({length:fields}).map((_, index)=>(
                <input type="text" id={`answer-${index}`} key={index} placeholder='Nhập đáp án để kiểm tra'/>
              ))
            }
            <button type='submit' className='greenButton greenText'>Kiểm Tra</button>
            <div className={starImg}><p className={score==0?'score redText':'score greenText'}>{score}</p></div>
          </form>
          
        </div>
        </div>
      ):isClick?(
        <div className='detailSection'>
        <p>Không tìm thấy thông tin câu hỏi.</p>        
      </div>
    ):(<div className='detailSection'>
        
      </div>)}
    </div>
        </Col>
        
      </Row>
      <Row>
        <Col><ScreenFooter/></Col>
      </Row>
    </Container>
    
  );
}

export default Question;