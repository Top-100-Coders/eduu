// Progress.jsx
import React, { useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { useStateContext } from '../../context/StateContext';

ChartJS.register(ArcElement, Tooltip, Legend);
let gradeArray = [0, 0, 0, 0, 0];



function ProgressChart() {

    let id = useParams()
    let MyId = id.id.toUpperCase()
    const [weakestTopic, setWeakestTopic] = React.useState('')
    const [className, setClassname] = React.useState('')
    const {students} = useStateContext() // Initializing counts for grades A, B, C, D, E

useEffect(() => {
  console.log("students", students);
  let stud

  students.forEach((student) => {
    const test1Points = student.points[id.id];
    stud = student;

    // Implement your grading logic here
    let grade;
    if(student.type ==2)
    {
      if (test1Points >= 8) {
        grade = "A";
        gradeArray[0]++;
      } else if (test1Points >= 7) {
        grade = "B";
        gradeArray[1]++;
      } else if (test1Points >= 6) {
        grade = "C";
        gradeArray[2]++;
      } else if (test1Points >= 4) {
        grade = "D";
        gradeArray[3]++;
      } else {
        grade = "E";
        gradeArray[4]++;
      }
      console.log(`${student.name}'s grade for test1: ${grade}`);
    }

    // Log the grade for each student
  });

  // Log the grade distribution
  console.log("Grade distribution:", gradeArray);
}, [students]);
    console.log("gradearray",gradeArray)
    // console.log("students",students)
    React.useEffect(() => {
      const fetchClassName = async () => {
        const response = await axios.get(`http://localhost:3000/api/question/${id.id}`);
        setClassname(response.data.className)
      }
      fetchClassName()
    }, [])
    const handleWeakest = async() => {
      try {
        const res = await axios.get(`http://localhost:3000/api/weakesttopic/${className}/${id.id}`)
        if(res){
          setWeakestTopic(res.data.weakestTopic)
        }
      } catch (error) {
        console.log(error)
      }
    }
    const data = {
      labels: ['10-9', '9-8', '8-7', '6-5','Fail'],
      datasets: [
        {
          label: '# of Votes',
          data: [gradeArray[0], gradeArray[1], gradeArray[2], gradeArray[3], gradeArray[4]],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    // console.log("first",id)
  return (
    <div className='p-10 flex justify-center items-center flex-col'>
     <h1 className='text-3xl font-bold pb-10'> Test: {MyId}</h1>
      <Pie data={data} className=''/>
      <div className='pt-8 text-semibold text-xl border-2 bg-gray-100 p-5 mt-7 rounded-xl'>
        <div>
            <h1 className='font-bold py-3'> Weakest area of students</h1>
            <h2 className='text-teal-500 font-semibold'> {weakestTopic}</h2>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center mt-6 gap-5 w-full'>    
        <button onClick={handleWeakest} className='bg-teal-500 rounded-lg text-white p-3 w-full '>
            <h1 className='font-bold py-3 '>View all Students data</h1>
        </button>
        <button className='bg-teal-500 rounded-lg text-white p-3 w-full'>
            <h1 className='font-bold py-3'>Send resources </h1>
        </button>
      </div>
    </div>
  );
}

export default ProgressChart;
