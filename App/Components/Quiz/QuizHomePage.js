import React, {Component} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import moment from 'moment';
import database from '@react-native-firebase/database';
import QuizFacultyPage from './QuizFacultyPage';
import QuizStudentPage from './QuizStudentPage';
import perf from '@react-native-firebase/perf';
export default class QuizHomePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            type : this.props.route.params.type,
            course : this.props.route.params.course,
            user : this.props.route.params.user,
            currentQuiz : false,
            currentDuration : 0,
            quizType:"",
            questionCount : 0
        };
        this.setQuizState = this.setQuizState.bind(this);
    }

    setQuizState(){
        this.setState({
          currentQuiz : false,
        })
    }

    ifCurrentQuiz = (trace)=>{
        database()
            .ref('InternalDb/KBC/')
            .orderByChild('passCode')
            .equalTo(this.state.course.passCode)
            .on('value', snapshot => {
                if (snapshot.val()){
                    const values = Object.values(snapshot.val())[0]
                    const curr = moment(database().getServerTime())
                    const startTime = moment(values['startTime'], "DD/MM/YYYY HH:mm:ss")
                    const endTime = moment(values['endTime'], "DD/MM/YYYY HH:mm:ss")
                    const duration = Math.abs(moment(curr).diff(endTime, "seconds"))

                    if (curr >= startTime && curr <= endTime){
                        this.setState({
                            currentQuiz : true,
                            currentDuration : duration,
                            quizType: values['quizType'],
                            questionCount : values['questionCount']
                        })
                        trace.putMetric('quizDetectionGap',curr-startTime)
                        console.log('metric logged quizDetectionGap ',curr-startTime)
                    }
                    else{
                        this.setState({
                            currentQuiz : false,
                            currentDuration : 0,
                            quizType: values['quizType'],
                            questionCount : values['questionCount']
                        })
                    }
                }
            })
    }

    async componentDidMount(){
        if (this.state.currentQuiz == false){
        const trace = await perf().startTrace('quizPageTap');
        console.log("Started trace");
        // Define trace meta details
        this.ifCurrentQuiz(trace);
        trace.putAttribute('courseCode',String(this.state.course.courseCode));
        trace.putAttribute('userType',String(this.state.type));
        trace.putAttribute('currentQuiz',String(this.state.currentQuiz))
        // Stop the trace
        await trace.stop();
        }
        else{
            this.ifCurrentQuiz(null);
        }
    }

    render(){
        console.log("State of current quiz", this.state.currentQuiz)
        return(
            <SafeAreaView style={styles.safeContainer}>
                {this.state.type === "faculty" ?
                    <QuizFacultyPage
                        currentQuiz = {this.state.currentQuiz}
                        currentDuration = {this.state.currentDuration}
                        user = {this.state.user}
                        course = {this.state.course}
                        setQuizState = {this.setQuizState}
                        quizType = {this.state.quizType}
                        questionCount = {this.state.questionCount}
                    />
                :
                    <QuizStudentPage
                        currentQuiz = {this.state.currentQuiz}
                        currentDuration = {this.state.currentDuration}
                        user = {this.state.user}
                        course = {this.state.course}
                        setQuizState = {this.setQuizState}
                        quizType = {this.state.quizType}
                    />
                }
            </SafeAreaView>

        )
    }

}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignSelf: "center",
    },

})
