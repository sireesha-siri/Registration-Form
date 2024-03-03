import {Component} from 'react'
import './index.css'

class RegistrationForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    isSubmitted: false,
    firstNameError: false,
    lastNameError: false,
  }

  changeFirstName = event => {
    this.setState({firstName: event.target.value})
  }

  changeLastName = event => {
    this.setState({lastName: event.target.value})
  }

  getInputFieldContainer = () => {
    const {firstName, lastName, firstNameError, lastNameError} = this.state

    // eslint-disable-next-line prefer-const
    let firstNameInputClass = firstNameError ? 'error-container' : ''

    // eslint-disable-next-line prefer-const
    let lastNameInputClass = lastNameError ? 'error-container' : ''

    return (
      <>
        <form className="form-container" onSubmit={this.submitTheForm}>
          <div className="input-container">
            <label htmlFor="first name">FIRST NAME</label>
            <input
              type="text"
              placeholder="First Name"
              id="first name"
              value={firstName}
              onChange={this.changeFirstName}
              onBlur={this.blurredFirstName}
              className={firstNameInputClass}
            />
            {firstNameError && <p>Required</p>}
          </div>

          <div className="input-container">
            <label htmlFor="last name">LAST NAME</label>
            <input
              type="text"
              placeholder="Last Name"
              id="last name"
              value={lastName}
              onChange={this.changeLastName}
              onBlur={this.blurredLastName}
              className={lastNameInputClass}
            />
            {lastNameError && <p>Required</p>}
          </div>

          <div className="submit-button-container">
            <button type="submit">Submit</button>
          </div>
        </form>
      </>
    )
  }

  blurredFirstName = () => {
    // eslint-disable-next-line prefer-const
    let isValidate = this.getFirstNameValidation()
    this.setState({firstNameError: !isValidate})
  }

  blurredLastName = () => {
    // eslint-disable-next-line prefer-const
    let isValidate = this.getLastNameValidation()
    this.setState({lastNameError: !isValidate})
  }

  getFirstNameValidation = () => {
    const {firstName} = this.state

    return firstName !== ''
  }

  getLastNameValidation = () => {
    const {lastName} = this.state

    return lastName !== ''
  }

  submitTheForm = event => {
    event.preventDefault()
    const validateFirstName = this.getFirstNameValidation()
    const validateLastName = this.getLastNameValidation()

    if (validateFirstName && validateLastName) {
      this.setState({isSubmitted: true})
    } else {
      this.setState({
        isSubmitted: false,
        firstNameError: !validateFirstName,
        lastNameError: !validateLastName,
      })
    }
  }

  previousForm = () => {
    this.setState({
      firstName: '',
      lastName: '',
      isSubmitted: false,
      firstNameError: false,
      lastNameError: false,
    })
  }

  getSubmitFormResponse = () => (
    <div className="submission-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
      />
      <p className="submission-response">Submitted Successfully</p>
      <button type="button" onClick={this.previousForm}>
        Submit Another Response
      </button>
    </div>
  )

  render() {
    const {isSubmitted} = this.state

    return (
      <div className="app-container">
        <h1>Registration</h1>
        {isSubmitted
          ? this.getSubmitFormResponse()
          : this.getInputFieldContainer()}
      </div>
    )
  }
}

export default RegistrationForm
