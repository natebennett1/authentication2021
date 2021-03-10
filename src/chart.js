import React, { useState, useEffect } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Toolbar,
  Radio,
  Typography,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { db } from "./firebase";
import { Line } from "react-chartjs-2";
import moment from "moment";

export default function Survey(props){
    const [surveys, setSurveys] = useState([])
    const [labels, setLabels] = useState([])
    const [dataSets, setDataSets] = useState([])

    useEffect(() => {
        const unsub = db.collection('users').doc(props.user.uid).collection('surveys').onSnapshot((snapshot) => {
            const surveys = snapshot.docs.map((doc) => {
                const survey = {
                    sleep: parseInt(doc.data().sleep),
                    happiness: doc.data().happiness,
                    date: new Date(doc.data().date.seconds*1000),
                    id:doc.id
                }
                return survey
            })
            
            const sorted = surveys.sort((a,b) => {
                if(a.date > b.date) {
                    return 1
                } else {
                    return -1
                }
            })

            setSurveys(surveys)
        })
        return unsub;
    },[])

    useEffect(() => {
        //get and display labels
        const lbls = surveys.map((survey) => {
            return moment(survey.data).format("M/D/YY")
        })
        setLabels(lbls)

        //creating holder array for dataSets
        const sets = []

        //creating the sleep object
        const sleep = {
            label:"Hours of sleep",
            data:surveys.map(s => s.sleep),
            borderColor:'red',
            borderWidth:1
        }
        sets.push(sleep)

        //creating happiness objects
        const happiness = {
            label:"Happiness",
            data:surveys.map(s => s.happiness),
            borderColor:'blue',
            borderWidth:1
        }
        sets.push(happiness) 

        //set teh state variable
        setDataSets(sets)       

    },[surveys])

    return(
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Paper style={{padding: 12, marginTop: 30, width:'100%', maxWidth: 400}}>
                <Typography variant="h4">Chart</Typography>
                <Line
                data={{
                    labels:labels,
                    datasets:dataSets
                }}
                />
            </Paper>
        </div>
    )
}