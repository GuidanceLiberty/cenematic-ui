/* eslint-disable no-unused-vars */


import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';

import QuizScreen from './QuizScreen'; 
import QuizResultsScreen from './QuizResultsScreen'; 
import { quizQuestions } from "../lib/QuizData"; 


// --- MAIN QUIZ FLOW COMPONENT ---
const QuizFlow = ({ onClose }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 
    const [answers, setAnswers] = useState({}); 

    const totalQuestions = quizQuestions.length; 
    const currentQuestion = quizQuestions[currentQuestionIndex];

    // --- SCORING LOGIC (MOCK) ---
  
    const calculateFinalScores = (userAnswers) => {
        const results = [
            { gift: 'VISIONARY', score: 21 },
            { gift: 'ILLUMINATOR', score: 7 },
            { gift: 'AVANT_GARDE', score: 27 }, 
            { gift: 'EXPLORER', score: 19 },
        ];

        const scores = results.reduce((acc, item) => {
            acc[item.gift] = { percentage: item.score };
            return acc;
        }, {});

        const primaryResultKey = results.reduce((maxKey, item) => 
            (item.score > results.find(r => r.gift === maxKey).score ? item.gift : maxKey), 
            results[0].gift 
        );

        return { scores, primaryResultKey };
    };


    // Calculate scores only when the quiz is finished
    const { scores, primaryResultKey } = useMemo(() => {
        if (currentQuestionIndex >= totalQuestions) {
            return calculateFinalScores(answers); 
        }
        return { scores: null, primaryResultKey: null };
    }, [currentQuestionIndex, totalQuestions, answers]);
    
    if (totalQuestions === 0) return null; 

    const handleAnswer = (questionId, answer) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));

        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setCurrentQuestionIndex(totalQuestions); 
        }
    };
    
    const isFinished = currentQuestionIndex >= totalQuestions;

    return (
        <div className="fixed inset-0 bg-black/90 flex flex-col justify-start items-center z-50 overflow-y-auto">
            {/* Simple Close Button */}
            <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-3 rounded-full border border-green-700/50 bg-black/50 text-green-400 transition-all hover:border-green-400 hover:text-green-200 z-60"
            >
                Close
            </button>
            
            <AnimatePresence mode="wait">
                {/* RENDER QUIZ RESULTS SCREEN */}
                {isFinished && scores && primaryResultKey ? (
                    <QuizResultsScreen 
                        key="results" 
                        onClose={onClose} 
                        scores={scores} 
                        primaryResultKey={primaryResultKey}
                    />
                ) : (
                    // RENDER QUIZ SCREEN
                    currentQuestion && (
                        <QuizScreen
                            key={currentQuestion.id}
                            questionData={currentQuestion} 
                            questionNumber={currentQuestionIndex + 1}
                            totalQuestions={totalQuestions}
                            onClose={onClose} 
                            onAnswer={handleAnswer} 
                        />
                    )
                )}
            </AnimatePresence>
        </div>
    );
};

export default QuizFlow;