import React, {useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import Chart from "react-apexcharts";
import {Box} from "@material-ui/core";
import LoadingMoney from "../../Assets/Animations/LoadingMoney/LoadingMoney";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {chartData} from "./FakeData";
import {timeSpans} from "../../Utils/timeSpansEnum";
import {GetCrypto} from "../../Services/CryptoService";
import { UserStore } from "../../Stores/UserStore";

export const CryptoGraph = (props) => {

    const [finalData, setFinalData] = useState(null);
    const [period, setPeriod] = useState(timeSpans.DAILY);
    const userStore = UserStore.useState();

    const options = {
        chart: {
            type: 'candlestick',
            height: 350
        },
        title: {
            text: props.cryptoName,
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

    const formatData = async () => {
        let response = await GetCrypto(props.cryptoName, period, userStore.token);
        let data = [];
        let myDate = new Date();

        if (response) {
            response.forEach(s => {
                myDate = new Date(s.time * 1000);
                let p = {
                    x: new Date(myDate),
                    y: [ s.open, s.high, s.low, s.close]
                }
                data.push(p);
            })

            let series = [{name: "series-1", data: data}]
            setFinalData(series);
        }
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
                                <Button disabled={period === timeSpans.DAILY} onClick={() => setPeriod(timeSpans.DAILY)}>Daily</Button>
                                <Button disabled={period === timeSpans.HOURLY} onClick={() => setPeriod(timeSpans.HOURLY)}>Hourly</Button>
                                <Button disabled={period === timeSpans.MINUTE} onClick={() => setPeriod(timeSpans.MINUTE)}>Minute</Button>
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

export default CryptoGraph;