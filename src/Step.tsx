// Step.tsx
import React from 'react';

interface StepProps {
  title: string;
  children: React.ReactNode;
}

const Step: React.FC<StepProps> = ({ title, children }) => {
  return (
    <div>
      <h3>{title}</h3>
      {children}
    </div>
  );
};

export default Step;
