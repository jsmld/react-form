import { FormEvent } from 'react';
import { AccountForm } from './AccountForm';
import { AddressForm } from './AddressForm';
import { useForm } from './useForm';
import { UserForm } from './UserForm';
import { useState } from 'react';

type FormData = {
  firstName: string;
  lastName: string;
  age: string;
  street: string;
  city: string;
  state: string;
  postcode: string;
  email: string;
  password: string;
}

const INITIAL_DATA: FormData = {
  firstName: '',
  lastName: '',
  age: '',
  street: '',
  city: '',
  state: '',
  postcode: '',
  email: '',
  password: '',
}

function App() {
  const [data, setData] = useState(INITIAL_DATA)
  function updateFields(fields: Partial<FormData>){
    setData(prev => {
      return { ...prev, ...fields}
    })
  }
  const { step, steps, currentStepIndex, isFirstStep, isLastStep, back, next } = useForm([<UserForm {...data} updateFields={updateFields}/>, <AddressForm {...data} updateFields={updateFields}/>, <AccountForm {...data} updateFields={updateFields}/>]);
  function onSubmitHandler (e: FormEvent) {
    e.preventDefault()
    !isLastStep ? next() : alert('Successfully finished form')
  }
  return (
    <div style={{ position: 'relative', background: 'white', border: '1px solid black', padding: '2rem', margin: '1rem', borderRadius: '.5rem', fontFamily: 'Arial', maxWidth: 'max-content' }}>
      <form onSubmit={onSubmitHandler}>
        <div style={{ position: 'absolute', top: '.5rem', right: '.5rem' }}>{currentStepIndex + 1 + ' / ' + steps.length}</div>
        {step}
        <div style={{ marginTop: '1rem', display: 'flex', gap: '.5rem', justifyContent: 'flex-end' }}>
          {!isFirstStep && <button type="button" onClick={back}>Back</button>}
          <button type="submit">{isLastStep ? 'Finish' : 'Next'}</button>
        </div>
      </form>
    </div>
  )
}

export default App
