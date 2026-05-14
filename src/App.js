import React from 'react'
import './App.css'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      students: [
        {
          id: 1,
          name: 'Alis Jonson',
          subject: 'Mathematics',
          grade: 92,
          passed: true,
        },
        {
          id: 2,
          name: 'John Leo',
          subject: 'Chemistry',
          grade: 65,
          passed: true,
        },
        {
          id: 3,
          name: 'David Markend',
          subject: 'Biology',
          grade: 45,
          passed: false,
        },
      ],
      newStudent: [
        {
          name: '',
          subject: '',
          grade: '',
        },
      ],
    }
  }

  handleInputChange = (event) => {
    const { name, value } = event.target
    this.setState({
      newStudent: {
        ...this.state.newStudent,
        [name]: value,
      },
    })
  }

  handleOnSubmit = (event) => {
    event.preventDefault()

    const { name, subject, grade } = this.state.newStudent
    if (!name || !subject || !grade) {
      alert('Please fill in all details')
      return
    }

    const gradeNumber = parseInt(grade, 10)
    if (isNaN(gradeNumber) || gradeNumber < 0 || gradeNumber > 100) {
      alert('Please enter the valid grade between 0 to 100')
      return
    }

    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      subject: subject,
      grade: gradeNumber,
      passed: gradeNumber >= 60,
    }

    this.setState({
      students: [...this.state.students, newStudent],
      newStudent: {
        name: '',
        subject: '',
        grade: '',
      },
    })
  }

  renderStudentList() {
    console.log(this.state.students)

    if (this.state.students.length === 0) {
      return (
        <div className='noStudents'>
          <p>No students added yet. Add your first student below!</p>
        </div>
      )
    }

    return this.state.students.map((student) => (
      <div
        key={student.id}
        className={`studentCard ${student.passed ? 'passed' : 'failed'}`}
      >
        <div className='studentInfo'>
          <div className='studentInfoHeader'>
            <h3>{student.name}</h3>
          </div>
          <p style={{ textTransform: 'capitalize' }}>
            <strong>Subject: </strong>
            {student.subject}
          </p>
          <p>
            <strong>Grade: </strong>
            {student.grade}%
          </p>
        </div>
        <div className='studentStatus'>
          <span
            className={`status ${student.passed ? 'statusPassed' : 'statusFailed'}`}
          >
            {student.passed ? 'PASSED' : 'FAILED'}
          </span>
        </div>
      </div>
    ))
  }

  render() {
    return (
      <div className='App'>
        <header className='appHeader'>
          <h1>Student Grade Tracker</h1>
          <p>Class compoent design</p>
        </header>

        <div className='appMain'>
          <section className='studentSection'>
            <h2 className='studentList'>
              Student List ({this.state.students.length})
            </h2>
            <div className='studentsGrid'>{this.renderStudentList()}</div>
          </section>

          <section className='addStudentSection'>
            <h2>Add New Student</h2>
            <form
              action=''
              onSubmit={this.handleOnSubmit}
              className='addStudentForm'
            >
              <div className='formGroup'>
                <label htmlFor='studentName'>Student Name:</label>
                <input
                  type='text'
                  placeholder='Add student name'
                  value={this.state.newStudent.name}
                  onChange={this.handleInputChange}
                  id='studentName'
                  name='name'
                />
              </div>

              <div className='formGroup'>
                <label htmlFor='studentSubject'>Student Subject</label>
                <select
                  name='subject'
                  id='studentSubject'
                  value={this.state.newStudent.student}
                  onChange={this.handleInputChange}
                >
                  <option value=''>Slect a Subject</option>
                  <option value='mathematics'>Mathematics</option>
                  <option value='physics'>Physics</option>
                  <option value='chemistry'>Chemistry</option>
                  <option value='biology'>Biology</option>
                  <option value='history'>History</option>
                  <option value='english'>English</option>
                </select>
              </div>

              <div className='formGroup'>
                <label htmlFor='grade'>Grade (0 - 100)</label>
                <input
                  type='number'
                  min='0'
                  max='100'
                  name='grade'
                  placeholder='Enter student grade'
                  value={this.state.newStudent.grade}
                  onChange={this.handleInputChange}
                />
              </div>

              <button type='submit' className='submitBtn'>
                Submit
              </button>
            </form>
          </section>
        </div>
      </div>
    )
  }
}

export default App
