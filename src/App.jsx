import { useState } from "react";
import { useRef } from "react";
import jsPDF from "jspdf";



function App() {

  const Course = () => {
    return (
      <>
            <input className="ml-3 h-8 mt-2  w-1/2 pl-2" type="text" name="course" id="course" onBlur={getCourses} placeholder="Course name"/>
            <input className="ml-3 h-8 mt-2  w-1/3 pl-2" type="text" name="courseCertificate" id="course" onBlur={getCourses} placeholder="Course certificate link"/>
          </>
    )
  };

  const reportTemplateRef = useRef(null);
  const [data, setData] = useState()
  const [courses, setCourses] = useState([<Course/>])
  const [allCourses, setAllCourses] = useState([])

    if(reportTemplateRef?.current){
      for(let i=0; i< reportTemplateRef.current.children.length; i++){
      if(reportTemplateRef.current.children[i].offsetTop + reportTemplateRef.current.children[i].offsetHeight > 650 && reportTemplateRef.current.children[i].offsetTop + reportTemplateRef.current.children[i].offsetHeight < 710){
        reportTemplateRef.current.children[i].style.marginTop = `${ reportTemplateRef.current.children[i].offsetHeight + 30}px`

        if(reportTemplateRef.current.children[i+1])
         reportTemplateRef.current.children[i+1].style.marginTop = `0px`
    }
      }
    }

    let newData = {}
    function getCourses(e){
      newData[e.currentTarget.name] = e.currentTarget.value
      setAllCourses(prevData => [...prevData, newData])
    }

    function addSection(){
      setCourses(prevData =>  [...prevData, <Course/>])
    }
  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      format: "a4",
      unit: "px"
    });
  
    // Adding the fonts.
    doc.setFont("Inter-Regular", "normal");
  
    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        await doc.save("document");
      }
    });
  };
  
  function changeHandle(e){
    const newData = {}
      newData[e.currentTarget.name] = e.currentTarget.value
    setData((prevData) => {return {...prevData, ...newData}})
  }
  return (

    <div className="parent w-full	 flex flex-col sm:flex-row">
      <div className='data bg-[#BA274A] w-full sm:w-1/2 overflow-y-auto max-h-[100vh]'>
        <div className="personal-info mt-3">
          <h2 className="mb-3 border-b border-white pl-3 text-2xl italic text-white">Personal Info</h2>
          <div className="inputs flex  flex-wrap">
        <input className="ml-3 h-8 mt-2 w-1/2 pl-2" type="text" name="name" onChange={changeHandle} placeholder="Write your name"/>
        <input className="ml-3 h-8 mt-2  w-1/3 pl-2" type="text" name="address" onChange={changeHandle} placeholder="Write your city"/>
        <input className="ml-3 h-8 mt-2  w-1/2 pl-2" type="text" name="phone" onChange={changeHandle} placeholder="Write your phone"/>
        <input className="ml-3 h-8 mt-2  w-1/3 pl-2" type="text" name="email" onChange={changeHandle} placeholder="Write your email"/>
          </div>
        </div>
        <div className="career-info flex flex-col mt-3">   
        <h2 className="mb-3 border-b border-white pl-3 text-2xl italic text-white">Career Info</h2>       
        <input className="ml-3 w-1/2 h-8 pl-2" type="text" name="job" onChange={changeHandle} placeholder="Write your Job title"/>
        <textarea style = {{resize: "none"}}className="mx-3 mt-2 p-2 w-1/2 h-28" name="summary" id="summary" onChange={changeHandle} placeholder="Write Brief about you"></textarea>
          </div>
          <div className="education-info mt-3">
          <h2 className="mb-3 border-b border-white pl-3 text-2xl italic text-white">Education Info</h2>
          <input className="ml-3 h-8 mt-2  w-1/2 pl-2" type="text" name="faculty" id="faculty" onChange={changeHandle} placeholder="Write your faculty"/>
          <input className="ml-3 h-8 mt-2  w-1/3 pl-2" type="text" name="department" id="department" onChange={changeHandle} placeholder="Write your department"/>
          <input className="ml-3 h-8 mt-2  w-1/2 pl-2" type="text" name="degree" id="degree" onChange={changeHandle} placeholder="Write your degree"/>
          <input className="ml-3 h-8 mt-2  w-1/3 pl-2" type="text" name="graduationDate" id="graduationDate" onChange={changeHandle} placeholder="Write your graduation date"/>
          <input className="ml-3 h-8 mt-2  w-1/2 pl-2" type="text" name="college" id="college" onChange={changeHandle} placeholder="Write your college"/>
          </div>
          <div className="skills-info mt-3">
          <h2 className="mb-3 border-b border-white pl-3 text-2xl italic text-white">Skills Info</h2>
          <input className="ml-3 h-8 mt-2  w-1/2 pl-2" type="text" name="skills" onChange={changeHandle} placeholder="EX: word-excel"/>
          </div>
          <div className="experience-info mt-3">
          <h2 className="mb-3 border-b border-white pl-3 text-2xl italic text-white">Experience Info</h2>
          <input className="ml-3 h-8 mt-2  w-1/2 pl-2" type="text" name="company" id="company" onChange={changeHandle} placeholder="Write company name"/>
          <input className="ml-3 h-8 mt-2  w-1/3 pl-2" type="text" name="period" id="period" onChange={changeHandle} placeholder="Write work period"/>
          <input className="ml-3 h-8 mt-2  w-1/2 pl-2" type="text" name="certificate" id="certificate" onChange={changeHandle} placeholder="Certificate link"/>
        <textarea style = {{resize: "none"}}className="ml-3 mt-2 p-2 w-1/2  h-28" name="responsibilities" id="responsibilities" onChange={changeHandle} placeholder="Write your responsibilities in it"></textarea>
          </div>
          <div className="languages-info mt-3">
          <h2 className="mb-3 border-b border-white pl-3 text-2xl italic text-white">Languages Info</h2>
          <input className="ml-3 h-8 mt-2  w-1/2 pl-2" type="text" name="languages" id="languages" onChange={changeHandle} placeholder="EX: English-Arabic"/>
          </div>
          <div className="courses-info mt-3">
          <h2 className="mb-3 border-b border-white pl-3 text-2xl italic text-white">Courses Info</h2>
          {courses.map(el => (
            el
          ))}
          <button onClick={addSection}><i class="fa-solid fa-plus"></i></button>
          </div>
        <button className="my-5 relative px-3 left-[50%] rounded translate-x-[-50%] text-white h-10 bg-[#29335C] active:text-[#BA274A]" onClick={handleGeneratePdf}>Download CV</button>
      </div>
        <div className='result w-full sm:w-1/2 h-screen p-10 bg-[#2191FB] flex justify-center'>
        <div ref={reportTemplateRef} className="cv w-[450px] overflow-y-auto p-5 bg-white h-full">
          
          <div className="details text-center">
          <h1 className="text-1xl text-center font-bold	">{data?.name}</h1>
          {data?.address &&(
            <>            
            <span className="text-sm">{data.address} </span>
            <span>| </span>
            </>
          )}
          {data?.phone &&(
            <>            
            <span className="text-sm">{data.phone} </span>
            <span>| </span>
            </>
          )}
          {data?.email &&(
            <span className="text-sm">{data.email} </span>
          )}
          </div>
          <div className="summary mt-2 border-t	border-black	">
            <h2 className="text-center m-0 text-1xl font-bold">{data?.job}</h2>
            <p className="text-xs text-center break-words">{data?.summary}</p>
          </div>
          <div className="education">
          <h3 className="text-center pb-2 mt-2 border-b	border-black text-1xl font-bold">Education</h3>
          <div className="mt-2 education-header flex justify-between items-center">
                  <h4 className=" font-bold	text-sm	">{data?.faculty}</h4>
                  <div>
                  <p className="text-xs font-bold">{data?.college}</p>
                  <p className="text-xs italic">{data?.graduationDate}</p>
                  </div>
                  </div>
          <p className="text-xs	mt-2">{data?.department}</p>
          {data?.degree &&(
          <p className="text-xs	">Degree | {data?.degree}</p>
          )}
          </div>
          <div className="skills ">
            <h3 className="text-center pb-2 mt-2 border-b	border-black text-1xl font-bold">Skills</h3>
            <div className="skill mt-2 flex flex-wrap	">
              {data?.skills?.split("-").map((el) => (
            <p className="min-w-[33%]">&#x2022; {el}</p>
              ))}
            </div>
          </div>
          <div className={`experience`}>
            <h3 className="text-center pb-2 mt-2 border-b	border-black text-1xl font-bold">Experience</h3>
                <div className="training">
                  <div className="mt-2 training-header flex justify-between items-center">
                  <h4 className=" font-bold	text-sm	">{data?.company}</h4>
                  <span className="text-xs">{data?.period}</span>
                  </div>
                  {data?.responsibilities &&(
                    <>                    
                    <h5 className="ml-3 mt-3 text-xs font-bold">responsibilities:</h5>
                    {data?.responsibilities?.split("\n").map(el => (
                    <p className="ml-5 text-xs font-bold">&#x2022; {el}</p>
                    ))}
                    </>
                  )}
                  {data?.certificate &&(
                  <p className="mt-2 text-xs break-words font-bold">Certificate :- <span className="font-normal	">{data?.certificate}</span></p>
                  )}
                </div>
          </div>

          <div className="languages">
          <h3 className="text-center pb-2 mt-2 border-b	border-black text-1xl font-bold">Languages</h3>
          <div className="flex flex-wrap">
          {data?.languages?.split("-").map((el) => (
            <p className="min-w-[33%]">&#x2022; {el}</p>
              ))}
          </div>
          </div>
          <div className="courses">
          <h3 className="text-center pb-2 mt-2 border-b	border-black text-1xl font-bold">Courses</h3>
          {Array.from( new Set(allCourses))?.map(el => (
          <p className="mt-2 text-xs break-words font-bold">{el.course} :- <span  className="font-normal	">{el.courseCertificate}</span></p>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
