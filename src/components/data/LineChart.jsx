import { LineChart } from '@mui/x-charts/';
import { Paper, CircularProgress, Box, InputLabel, MenuItem, FormControl, Select} from '@mui/material';
import { useState, useEffect } from "react"


const MyLineChart = ({expenses}) =>{
    const [dateRange, setDateRange] = useState()
    // const [sortedData, setSortedDate] = useState()
    const [allDates, setAllDates] = useState()
    const [allSums, setAllSums] = useState()
    const [option, setOption] = useState()
    const options = ["All Time", 5, 10, 15, 30]
    const sortExpensesByDate = (data) =>{
        let dataSorted = data.sort((a, b)=>new Date(a.date) - new Date(b.date))
        let reduced = Object.entries(dataSorted.reduce((accumulator, current)=>{
            let date = new Date(current.date)
            date = date.toDateString()
            console.log(date)
            if (date in accumulator){
                accumulator[date] += current.expense
            }else{
                accumulator[date] = current.expense
            }
            return accumulator
        }, {}))
        setAllDates(reduced.map(([date]) => date))
        setAllSums(reduced.map(([, value]) => value))

    }
  
    const getDateRange=(numDays)=>{
        const d = new Date()
        const startDate = new Date()
        startDate.setDate(d.getDate()-numDays)
        let current = new Date(startDate)
        let dateArray = []
        while (current < d){
            let toFormat = new Date(current)
            dateArray.push(toFormat.toDateString())
            current.setDate(current.getDate() + 1)
        }
        setDateRange(dateArray)
    }
   
    useEffect(()=>{
        getDateRange(3)
        sortExpensesByDate(expenses)
    }, [])
    

    return (
        <>
            <Paper elevation={4}
                sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
                <h3 className='headerData'>My Expenses By Date</h3>
                {dateRange?
                <div className="paperData">
                    <LineChart
                        xAxis={[{ scaleType: 'band', data: allDates }]}
                        series={[{data: allSums}]}
                        width={500}
                        height={300}
                    />
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">TimeFrame</InputLabel>
                            <Select
                            defaultValue={options[0]}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={option}
                            label="TimeFrame"
                            onChange={(e)=>setOption(e.target.value)}
                            >
                            {
                                options.map((option, idx)=>(
                                    <MenuItem value={option}>{option}</MenuItem>
                                ))
                            }
                        
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                :
                    <CircularProgress/>
                }
            </Paper>
        </>
    )
}

export default MyLineChart