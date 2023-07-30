import React from 'react'
import Styles from "./component.module.css";
import {useState,useEffect} from 'react'
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js'
  import { Chart } from 'react-chartjs-2'
import Buttons from './Buttons';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )
const HistoricalChart = () => {
    let buttons =[
        {label:'24 Hours',
    days:1},
        {label:'30 Days',days:30},{label:'3 Months',
    days:90},{label:'1 Year',days:365}
]
    const[days,setdays] =useState(1)
    const[historicaldata,setHistoricalData] =useState([])
    
    let { id } = useParams();
    useEffect(() => {
        fetchhistoricaldata();
        
      }, [id,days]);
const fetchhistoricaldata =async()=>{
    let url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=USD&days=${days}`;
    let res = await axios.get(url)
     res = await res.data;
    setHistoricalData(res.prices)
      }
      console.log(historicaldata)
  return (
    <div className={Styles.chart}>{
        !historicaldata?(<CircularProgress style={{color:"gold"}} size={250} thickness={1}></CircularProgress>):( <>
            <Line color='gold'
              data={{
                labels: historicaldata.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [{ data: historicaldata.map((coin) => coin[1]) ,
                    label:`Price (Past ${days} Days)`,
            borderColor:"#EEBC1D"
              }],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
          </>)
        }
        <div className={Styles.coinpagebtn}>
           {
            buttons.map((button)=>{
               return <Buttons button={button} days={days} setdays={setdays}/>
            })
           }
        </div>
        </div>
  )
}

export default HistoricalChart