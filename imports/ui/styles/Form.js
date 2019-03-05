import styled from 'styled-components';

const Form = styled.form`
  background: rgba(0, 0, 0, 0.05);
  border: 5px solid white;
  padding: 20px;
  font-size: 1.75rem;
  line-height: 1.5;
  font-weight: 600;
  label {
    display: block;
    margin-bottom: 1rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1.25rem;
    border: 1px solid ${props => props.theme.black};
    &:focus {
      outline: 0;
      border-color: ${props => props.theme.blue};
    }
  }
  button,
  input[type='submit'] {
    width: auto;
    background: ${props => props.theme.blue};
    color: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
  }
  fieldset {
    border: 0;
    padding: 0;
    &[disabled] {
      opacity: 0.5;
    }
  }
`;

export default Form;
