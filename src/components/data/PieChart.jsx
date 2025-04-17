import { PieChart } from '@mui/x-charts/';
import { Paper } from '@mui/material';
import { useState, useEffect } from "react"

const MyPieChart = ({expenses})=>{
    const [data, setData] = useState(expenses)
    const [total, setTotal] = useState()
    const [smallScreen, setSmallScreen] = useState(window.innerWidth < 660)

    const getTotal = (expenses) =>{
        return expenses.reduce((accumulator, current)=>{
            return accumulator+=current.value
        }, 0)
    }
    const transformDataByType = (data) =>{
        let reduced = Object.entries(data.reduce((accumulator, current)=>{
            const type = current.type
            if (type in accumulator){
                accumulator[type] += current.expense
            }else{

                accumulator[type] = current.expense
            }
            return accumulator
        }, {})).map(([label, value])=>({label, value}))
        return reduced
    }

    useEffect(()=>{
        setData(transformDataByType(expenses))
        
        const handleResize = () =>{
            setSmallScreen(window.innerWidth < 660)
        }
        window.addEventListener('resize', handleResize)
        
    }, [])
    useEffect(()=>{
        setTotal(getTotal(data))
    }, [data])
    return (
        <>
        <h3>Your insights</h3>
        <div id='pie-chart'>
            {data && total &&
            <Paper elevation={4}
            sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
                <h3 className='headerData'>My Expenses By Type</h3>
                {expenses &&
                <>
                    <PieChart
                    colors={[
                        "#8e94f2",
                        "#757bc8",
                        "#4e148c",
                        "#548fee",
                        "#dab6fc", 
                        "#bb4efd",
                        "#c77dff",
                        "#bb4efd"
                    ]}
                    series={[
                    {
                        data: data,
                        paddingAngle: 3,
                        cornerRadius: 5,
                        innerRadius: 50,
                        highlightScope: { fade: 'global', highlight: 'item' },
                        valueFormatter: (v) => `${(v.value).toFixed(2)} - ${(100*v.value/total).toFixed(2)}%`,
                    },
                    ]}
                    legend = {{hidden: smallScreen}}
                    width={600}
                    height={250}
                />
                </>
                }
                </Paper>
            }
            </div>
        </>
    )
}

export default MyPieChart