import React, { useState, useMemo } from 'react';
import matter from 'gray-matter';
import { CheckIcon, CloseIcon, RefreshIcon } from './Icons';
import { useI18n } from '../context/I18nContext';

// --- Type Definitions ---
interface Question {
    text: string;
    choices: string[];
    answer: string;
}

interface QuizProps {
    content: string;
}

// --- Main Component ---
const Quiz: React.FC<QuizProps> = ({ content }) => {
    const { t } = useI18n();
    const { questions } = useMemo(() => {
        try {
            const { data } = matter(content);
            // Basic validation
            if (Array.isArray(data.questions)) {
                return { questions: data.questions as Question[] };
            }
            return { questions: [] };
        } catch (e) {
            console.error("Error parsing quiz YAML:", e);
            return { questions: [] };
        }
    }, [content]);
    
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
    const [showResults, setShowResults] = useState(false);

    const handleAnswerSelect = (choice: string) => {
        setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: choice }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };
    
    const handleSubmit = () => {
        setShowResults(true);
    };
    
    const handleTryAgain = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setShowResults(false);
    };

    if (questions.length === 0) {
        return (
            <div className="my-6 p-4 border-l-4 rounded-r-lg bg-red-50 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200">
                <p className="font-bold">{t('quizError')}</p>
                <p>{t('quizErrorDetails')}</p>
            </div>
        );
    }
    
    // --- Render Logic ---
    if (showResults) {
        const score = questions.reduce((acc, question, index) => {
            return acc + (selectedAnswers[index] === question.answer ? 1 : 0);
        }, 0);
        
        return (
            <div className="my-8 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">{t('quizResults')}</h3>
                <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-6">
                    {t('youScored', score, questions.length)}
                </p>
                <div className="space-y-6">
                    {questions.map((q, index) => {
                        const userAnswer = selectedAnswers[index];
                        const isCorrect = userAnswer === q.answer;
                        return (
                            <div key={index} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                                <p className="font-semibold text-gray-800 dark:text-gray-200 mb-3">{index + 1}. {q.text}</p>
                                <div className="space-y-2 text-sm">
                                    {q.choices.map(choice => {
                                        const isUserChoice = userAnswer === choice;
                                        const isCorrectChoice = q.answer === choice;
                                        
                                        let stateClasses = 'border-gray-300 dark:border-gray-600';
                                        if (isCorrectChoice) stateClasses = 'border-green-500 bg-green-50 dark:bg-green-900/30';
                                        if (isUserChoice && !isCorrect) stateClasses = 'border-red-500 bg-red-50 dark:bg-red-900/30';
                                        
                                        return (
                                            <div key={choice} className={`flex items-center p-3 border rounded-md ${stateClasses}`}>
                                                {isCorrectChoice && <CheckIcon className="w-5 h-5" />}
                                                {isUserChoice && !isCorrect && <div className="text-red-500"><CloseIcon className="w-5 h-5" /></div>}
                                                <span className={`ml-3 ${isUserChoice ? 'font-bold' : ''}`}>{choice}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
                 <div className="mt-8 flex justify-center">
                    <button onClick={handleTryAgain} className="inline-flex items-center px-6 py-2.5 text-sm font-semibold rounded-lg shadow-sm transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500">
                       <RefreshIcon className="w-5 h-5" />
                       <span className="ml-2">{t('tryAgain')}</span>
                    </button>
                </div>
            </div>
        );
    }
    
    const currentQuestion = questions[currentQuestionIndex];
    const selectedChoice = selectedAnswers[currentQuestionIndex];

    return (
        <div className="my-8 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
            <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-2">
                {t('questionOf', currentQuestionIndex + 1, questions.length)}
            </p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{currentQuestion.text}</h3>
            
            <fieldset className="space-y-4">
                <legend className="sr-only">Opciones para: {currentQuestion.text}</legend>
                {currentQuestion.choices.map(choice => (
                    <label key={choice} htmlFor={choice} className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${selectedChoice === choice ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/50' : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'}`}>
                        <input
                            type="radio"
                            id={choice}
                            name={`question-${currentQuestionIndex}`}
                            value={choice}
                            checked={selectedChoice === choice}
                            onChange={() => handleAnswerSelect(choice)}
                            className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                        />
                        <span className="ml-4 text-base font-medium text-gray-800 dark:text-gray-200">{choice}</span>
                    </label>
                ))}
            </fieldset>

            <div className="mt-8 flex justify-between items-center">
                <button onClick={handlePrev} disabled={currentQuestionIndex === 0} className="px-4 py-2 text-sm font-semibold rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
                    {t('previousPage')}
                </button>
                {currentQuestionIndex === questions.length - 1 ? (
                    <button onClick={handleSubmit} disabled={!selectedChoice} className="px-6 py-2.5 font-semibold rounded-lg shadow-sm bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed">
                        {t('submitForGrading')}
                    </button>
                ) : (
                     <button onClick={handleNext} disabled={!selectedChoice} className="px-6 py-2.5 font-semibold rounded-lg shadow-sm bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed">
                        {t('nextPage')}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Quiz;
