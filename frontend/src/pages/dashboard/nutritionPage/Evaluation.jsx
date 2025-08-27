import React from 'react';

const Evaluation = ({ data }) => {
  if (!data || !data.overallRecommendation) {
    return null;
  }

  const {
    overallRecommendation,
    foodItemRecommendations,
  } = data;

  return (
    <div className="card evaluation">
      <h3>Meal Plan Evaluation</h3>
      <p>Overall Recommendation: <strong>{overallRecommendation}</strong></p>
      <h4>Food Item Breakdown:</h4>
      <ul>
        {foodItemRecommendations.map(item => (
          <li key={item.foodItemID}>
            <strong>{item.foodItem}:</strong> {item.recommendation}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Evaluation;