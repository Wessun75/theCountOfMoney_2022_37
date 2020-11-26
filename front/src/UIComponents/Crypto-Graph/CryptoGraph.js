import React, {useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import Chart from "react-apexcharts";
import {Box} from "@material-ui/core";
import LoadingMoney from "../../Assets/Animations/LoadingMoney/LoadingMoney";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {chartData} from "./FakeData";

export default function CryptoGraph() {

    const [finalData, setFinalData] = useState(null);
    const [period, setPeriod] = useState('Daily');

    const options = {
        chart: {
            type: 'candlestick',
            height: 350
        },
        title: {
            text: 'Bitcoin',
            align: 'left'
        },
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            tooltip: {
                enabled: true
            }
        }
    }

    const same = async (str, callback) => {

        const delay = ms => new Promise(res => setTimeout(res, ms))
        await delay(1500)

    }


    const formatData = async () => {
        await same();
        let data = [];
        let myDate = new Date();

        chartData.data.forEach(s => {
            myDate.setDate(myDate.getDate() + 1);
            let p = {
                x: new Date(myDate),
                y: [ s.open, s.high, s.low, s.close]
            }
            data.push(p);
        })

        let series = [{name: "series-1", data: data}]
        setFinalData(series);
    }

    useEffect(() => {
        setFinalData(null)
        formatData()
    }, [period])

    return (
        <div>
            <Container maxWidth="xs">
                <Box>
                    {finalData ?
                        <div>
                            <Chart
                                options={options}
                                series={finalData}
                                type={"candlestick"}
                                width={340}/>
                            <ButtonGroup color="primary" aria-label="outlined primary button group">
                                <Button disabled={period === 'Daily'} onClick={() => setPeriod('Daily')}>Daily</Button>
                                <Button disabled={period === 'Hourly'} onClick={() => setPeriod('Hourly')}>Hourly</Button>
                                <Button disabled={period === 'Minute'} onClick={() => setPeriod('Minute')}>Minute</Button>
                            </ButtonGroup>
                        </div>
                    :
                        <LoadingMoney/>
                    }
                </Box>
            </Container>

        </div>

    )
}