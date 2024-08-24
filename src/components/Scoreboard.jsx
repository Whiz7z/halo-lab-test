
import PropTypes from 'prop-types'

const Scoreboard = ({ scoreboard }) => {
  return (
    <>
      {scoreboard.length > 0 && (
        <div className="scoreboard-container">
          <h1>Scoreboard</h1>
          <table className="scoreboard-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Score</th>
                <th>Complexity</th>
              </tr>
            </thead>
            <tbody>
              {scoreboard
                .sort((a, b) => b.score - a.score)
                .map((score, index) => (
                  <tr key={index}>
                    <td>{score.name}</td>
                    <td>{Math.floor(score.score)}</td>
                    <td>{Number(score.complexity)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

Scoreboard.propTypes = {
  scoreboard: PropTypes.array.isRequired
}

export default Scoreboard
