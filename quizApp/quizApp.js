import { LightningElement } from 'lwc';

export default class QuizApp extends LightningElement {
    selected={
    } // for storing answers
    correctAnswers = 0 //to show the number of correct answer
    isSubmitted = false //use to show the result
    myQuestions=[
        {
            id: "Q1",
            question: "Which one of the following is not a template loop?",
            answers:{
                a: "for:each",
                b: "iterator",
                c: "map loop"
            },
            correctAnswer: "c"
        },
        {
            id: "Q2",
            question: "Which one of the file is invalid in LWC component folder?",
            answers:{
                a: ".svg",
                b: ".apex",
                c: ".js"
            },
            correctAnswer: "b"
        },
        {
            id: "Q3",
            question: "Which one of the following is not a directive?",
            answers:{
                a: "for:each",
                b: "if:true",
                c: "@track"
            },
            correctAnswer: "c"
        }
    ]

    //used for disabling the sumbmit button
    get allNotSelected(){
        return !(Object.keys(this.selected).length === this.myQuestions.length)
    }

    // for applying dynamic styling to the result
    get isScoredFull(){
        // how backtick(`) works? backtick is right below esc key
        //https://blog.bitsrc.io/double-quotes-vs-single-quotes-vs-backticks-in-javascript-3cab5aaea55
              //js inside string(=string interpolation),    ternary operator(?)
        return `slds-text-heading_large ${this.myQuestions.length === this.correctAnswers?
            'slds-text-color_success':'slds-text-color_error'}`
    }

    // changeHandler get's called on every click on the options
    changeHandler(event){
        //const name = event.target
        //const value = event.target --combine two lines
        const{name, value} = event.target

        //this.selected={...this.selected, [Q1]:"a"}
        this.selected={...this.selected, [name]:value}
    }

    //form submit handler  
    submitHandler(event){
        event.preventDefault()
        //this.selected = {"Q1": "a","Q2": "b","Q3": "c"}
        let correct = this.myQuestions.filter(item => this.selected[item.id] === item.correctAnswer)
        this.correctAnswers = correct.length
        this.isSubmitted = true
        console.log("this.correctAnswers",this.correctAnswers)

    }

    //form reset handler
    resetHandler(){
        this.selected = {}
        this.correctAnswers=0
        this.isSubmitted=false
    }
}