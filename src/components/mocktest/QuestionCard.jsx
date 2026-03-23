export default function QuestionCard({ question, index, total, answer, onAnswer, showResult }) {
  const letters = ['A', 'B', 'C', 'D']

  const getOptionClass = (i) => {
    if (!showResult) {
      return answer === i ? 'option-item selected' : 'option-item'
    }
    if (i === question.correct) return 'option-item correct disabled'
    if (i === answer && answer !== question.correct) return 'option-item wrong disabled'
    return 'option-item disabled'
  }

  return (
    <div className="question-card">
      <div className="question-num">Question {index + 1} of {total}</div>
      <div className="question-text">{question.question}</div>

      {question.code && (
        <div className="question-code">{question.code}</div>
      )}

      <div className="options-list">
        {question.options.map((opt, i) => (
          <div
            key={i}
            className={getOptionClass(i)}
            onClick={() => !showResult && onAnswer(i)}
          >
            <span className="option-letter">{letters[i]}</span>
            {opt}
          </div>
        ))}
      </div>

      {showResult && question.explanation && (
        <div className="explanation-box">
          <strong>Explanation: </strong>{question.explanation}
        </div>
      )}
    </div>
  )
}