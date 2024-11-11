import { number } from 'prop-types';
import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  // create a state object for inputs
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    // this runs when things we are watching change
    // used for when clickign on products to edit so the forms is pre populated.
    setInputs(initial);
  }, [initialValues]);

  // set whole thing as an object
  // }

  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      [value] = e.target.files;
    }
    // set the whole thing to be an object
    setInputs({
      // copy existing state
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }

  // return what we want to surface from the custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
