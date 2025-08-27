import React from 'react';

const Suggestion = ({ data }) => {
  if (!data || !data.foodItems) {
    return null;
  }

  return (
    <div className="card suggestion">
      <h3>Recommended Foods</h3>
      <p>Based on your selections, here are some recommended food items:</p>
      <ul>
        {data.foodItems.map(item => (
          <li key={item.foodItemID}>{item.foodItem}</li>
        ))}
      </ul>
    </div>
  );
};

export default Suggestion;