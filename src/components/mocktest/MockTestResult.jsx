export default function MockTestResult({ questions, answers, timeUsed, onRetry, onHome }) {
  const correct = answers.filter((a, i) => a === questions[i]?.correct).length
  const total = questions.length
  const pct = Math.round(correct / total * 100)
  const mins = Math.floor(timeUsed / 60)
  const secs = timeUsed % 60

  const grade = pct >= 90 ? { label: 'Excellent! 🏆', color: 'var(--green)' }
    : pct >= 70 ? { label: 'Good Job! 👍', color: 'var(--cyan)' }
    : pct >= 50 ? { label: 'Keep Going! 💪', color: 'var(--yellow)' }
    : { label: 'Need Practice 📚', color: 'var(--red)' }

  return (
    <div>
      <div className="result-hero">
        <div className="result-score" style={{ color: grade.color }}>{pct}%</div>
        <div className="result-label" style={{ color: grade.color }}>{grade.label}</div>
        <div className="result-stats-row">
          <div className="result-stat">
            <div className="result-stat-val" style={{ color: 'var(--green)' }}>{correct}</div>
            <div className="result-stat-lbl">Correct</div>
          </div>
          <div className="result-stat">
            <div className="result-stat-val" style={{ color: 'var(--red)' }}>{total - correct}</div>
            <div className="result-stat-lbl">Wrong</div>
          </div>
          <div className="result-stat">
            <div className="result-stat-val">{total}</div>
            <div className="result-stat-lbl">Total</div>
          </div>
          <div className="result-stat">
            <div className="result-stat-val">{mins}:{String(secs).padStart(2,'0')}</div>
            <div className="result-stat-lbl">Time</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
        <button className="mock-nav-btn primary" style={{ flex: 1 }} onClick={onRetry}>
          ↻ Try Again
        </button>
        <button className="mock-nav-btn secondary" style={{ flex: 1 }} onClick={onHome}>
          ← New Test
        </button>
      </div>

      <div className="result-review">
        <div className="result-review-title">Review Answers</div>
        {questions.map((q, i) => {
          const userAns = answers[i]
          const isCorrect = userAns === q.correct
          return (
            <div key={i} className={`review-item ${isCorrect ? 'correct' : 'wrong'}`}>
              <div className="review-q">{i + 1}. {q.question}</div>
              <div className="review-a">
                {!isCorrect && userAns !== undefined && (
                  <div>
                    <span className="wrong-label">Your answer: </span>
                    {q.options[userAns]}
                  </div>
                )}
                {userAns === undefined && (
                  <div><span className="wrong-label">Skipped</span></div>
                )}
                <div>
                  <span className="correct-label">Correct: </span>
                  {q.options[q.correct]}
                </div>
                {q.explanation && (
                  <div style={{ marginTop: 6, color: 'var(--text3)', fontSize: 12 }}>
                    {q.explanation}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}