import React, { useState } from 'react';
import { Notification, Statistics, FeedbackOptions, Feedback } from '.';

export const App = () => {
  const [review, setReview] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const onLeaveFeedback = evt => {
    const name = evt.target.name;

    setReview(prevState => ({
      ...prevState,
      [name]: prevState[name] + 1,
    }));
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = review;
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    if (countTotalFeedback() > 0) {
      return Math.round((review.good / countTotalFeedback()) * 100);
    }
    return 0;
  };

  const { good, neutral, bad } = review;
  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <Feedback>
      <FeedbackOptions
        options={['good', 'neutral', 'bad']}
        onLeaveFeedback={onLeaveFeedback}
      />
      {total < 1 ? (
        <Notification message={'There is no feedback'} />
      ) : (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          positivePercentage={positivePercentage}
        />
      )}
    </Feedback>
  );
};
