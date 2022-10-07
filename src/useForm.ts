import { ReactElement, useState } from 'react';

export function useForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const next = () => {
    setCurrentStepIndex(i => {
      if (i >= steps.length - 1) return i
      return i + 1
    })
  }
  const back = () => {
    setCurrentStepIndex(i => {
      if (i <= 0) return i
      return i - 1
    })
  }
  const goTo = (i: number) => setCurrentStepIndex(i)
  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    next,
    back,
    goTo,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1
  }
}