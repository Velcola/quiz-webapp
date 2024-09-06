'use client'

import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { data } from "../data.js";

const page = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const type = searchParams.get('type');

    const [quizData, setQuizData] = useState(null);
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [checked, setChecked] = useState(false);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    })

    useEffect(() => {
        const quiz = data.find(obj => obj[type]);
        if(quiz) {
            setQuizData(quiz[type])
        }
    }, [type]);

    if(!quizData) {
        const handleRedirect = () => {
            router.push('/');
        };

        return (
            <div>
                <h1>Ingen quiz funnet for type: {type}!</h1>
                <button className="underline" onClick={handleRedirect}>Returner til forsiden</button>
            </div>
        );
    }

    const questions = quizData.questions;
    const {question, answers, correctAnswer} = questions[activeQuestion];

    const onAnswerSelected = (answer, idx) => {
        setChecked(true);
        setSelectedAnswerIndex(idx);

        if(answer === correctAnswer) {
            setSelectedAnswer(true);
            console.log('set selected answer state to true');
            
        } else {
            setSelectedAnswer(false);
            console.log('set selected answer state to false');
        }
    }

    const runNextQuestion = () => {
        setSelectedAnswerIndex(null);
        setResult((prev) => 
            selectedAnswer ? {
                ...prev,
                score: prev.score + 5,
                correctAnswers: prev.correctAnswers + 1
            } : {
                ...prev,
                wrongAnswers: prev.wrongAnswers + 1
            }
        )

        if(activeQuestion !== questions.length - 1) {
            setActiveQuestion((prev) => prev + 1);
        } else {
            setActiveQuestion(0);
            setShowResult(true);
        }

        setSelectedAnswer(false);
        setChecked(false);
    }

    console.log(questions.length);
    

    return (
        <main className="bg h-screen flex flex-col gap-4 justify-center items-center">
            <button onClick={() => {
                router.push('/');
            }} className="primary text-white rounded-lg shadow-sm p-2">Tilbake</button>
            <div className="w-full max-w-2xl flex flex-col justify-center items-center text-center px-4">
                <div className="w-full primary text-white shadow-md rounded-lg">
                <div className="m-3 flex flex-col gap-2">
                    {!showResult ? (
                        <div>
                            <h1 className="text-3xl roboto-bold">Spørsmål {activeQuestion + 1}/{questions.length}</h1>
                            <h2 className="text-2xl">{questions[activeQuestion].question}</h2>
                        </div>
                    ) : (
                        <div>
                            <h1 className="text-3xl roboto-bold">Resultater</h1>
                            <h2 className="text-2xl roboto-bold">Totalt: {Math.round((result.score / (questions.length * 5)) * 100)}%</h2>
                        </div>
                    )}
                </div>
                </div>
            </div>
            <div className="w-full max-w-2xl flex flex-col justify-center items-center text-center px-4">
                <div className="w-full primary text-white shadow-md rounded-lg">
                    {!showResult ? (
                        <div className="m-3 flex flex-col gap-2" id="answers">
                            {answers.map((answer, idx) => (
                                <button onClick={() => onAnswerSelected(answer, idx)} key={idx} className={selectedAnswerIndex === idx ? "selected secondary rounded-lg shadow-sm p-2" : "secondary rounded-lg shadow-sm p-2"}>
                                    {answer}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="m-3">
                            <p className="text-lg flex justify-start">Antall spørsmål: {questions.length}</p>
                            <p className="text-lg flex justify-start">Score (5 per spørsmål): {result.score}</p>
                            <p className="text-lg flex justify-start">Riktige svar: {result.correctAnswers}</p>
                            <p className="text-lg flex justify-start">Feil svar: {result.wrongAnswers}</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full max-w-2xl flex flex-col justify-center items-center text-center px-4">
                <div className="w-full primary text-white shadow-md rounded-lg">
                    <div className="m-3 flex flex-col gap-2" id="answers">
                        {showResult ? (
                            <button onClick={() => window.location.reload()} className="secondary rounded-lg shadow-sm p-2">
                                Prøv igjen
                            </button>
                        ) : (
                            <div className="flex flex-col">
                                {checked ? (
                                    <button onClick={runNextQuestion} className="secondary rounded-lg shadow-sm p-2">
                                        {activeQuestion === questions.length - 1 ? (<span>Avslutt</span>) : (<span>Neste</span>)}
                                    </button>
                                ) : (
                                    <button onClick={runNextQuestion} className="secondary rounded-lg shadow-sm p-2" disabled>
                                        {activeQuestion === questions.length - 1 ? (<span>Avslutt</span>) : (<span>Neste</span>)}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default page;
