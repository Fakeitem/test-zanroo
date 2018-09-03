import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '../css/App.css';
import Loading from './Loading';
import SweetAlert from 'react-bootstrap-sweetalert';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      adding: false,
      showAdd: false,
      showDelete: false,
      showEdit: false,
      showError: false,
      targetDelete: null,
      targetEdit: null,
      user_data: [],
      age_number: [],
      name: '',
      age: '',
      nickname: '',
      nameValid: true,
      ageValid: true,
      nicknameValid: true,
      nameEdit: '',
      ageEdit: '',
      nicknameEdit: '',
      nameEditValid: true,
      ageEditValid: true,
      nicknameEditValid: true
    }
  }
  componentDidMount() {
    if (typeof(Storage) !== "undefined") {
      setTimeout(() => {
        var age_number = []
        for(var i = 10; i <= 90; i++)
        {
          age_number.push(i)
        }
        var user_data = JSON.parse(localStorage.getItem('user_data'))
        this.setState({
          loaded: true,
          user_data: user_data ? user_data : [],
          age_number: age_number,
        })
      }, 3000)
    } else {
      alert('ขออภัย Web Browser ไม่สนับสนุนการใช้')
    }
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.name + 'Valid']: e.target.value ? true : false
    })
  }
  handleSubmit() {
    if(this.state.name && this.state.age && this.state.nickname)
    {
      var parsed = JSON.parse(localStorage.getItem('user_data'))
      var data
      if(parsed !== null)
      {
        data = {
          name: this.state.name,
          age: this.state.age,
          nickname: this.state.nickname
        }
        parsed.push(data)
        localStorage.setItem('user_data', JSON.stringify(parsed))
        this.setState({
          showAdd: true,
          name: '',
          age: '',
          nickname: '',
          user_data: parsed
        })
      }
      else
      {
        data = [{
          name: this.state.name,
          age: this.state.age,
          nickname: this.state.nickname
        }]
        localStorage.setItem('user_data', JSON.stringify(data))
        this.setState({
          showAdd: true,
          name: '',
          age: '',
          nickname: '',
          user_data: data
        })
      }
    }
    else
    {
      this.setState({
        showError: true,
        nameValid: this.state.name ? true : false,
        ageValid: this.state.age ? true : false,
        nicknameValid: this.state.nickname ? true : false
      })
    }
  }
  handleRemove() {
    var parsed = JSON.parse(localStorage.getItem('user_data'))
    if(parsed !== null)
    {
      parsed.splice(this.state.targetDelete, 1)
      localStorage.setItem('user_data', JSON.stringify(parsed))
      this.setState({
        showDelete: false,
        targetDelete: null,
        targetEdit: null,
        nameEdit: '',
        ageEdit: '',
        nicknameEdit: '',
        nameEditValid: true,
        ageEditValid: true,
        nicknameEditValid: true,
        user_data: parsed
      })
    }
  }
  handleEdit() {
    var parsed = JSON.parse(localStorage.getItem('user_data'))
    if(parsed !== null)
    {
      if(parsed.length + 1 >= this.state.targetEdit)
      {
        if(this.state.nameEdit && this.state.ageEdit && this.state.nicknameEdit)
        {
          parsed[this.state.targetEdit] = {
            name: this.state.nameEdit,
            age: this.state.ageEdit,
            nickname: this.state.nicknameEdit,
          }
          localStorage.setItem('user_data', JSON.stringify(parsed))
          this.setState({
            showEdit: true,
            targetEdit: null,
            nameEdit: '',
            ageEdit: '',
            nicknameEdit: '',
            nameEditValid: true,
            ageEditValid: true,
            nicknameEditValid: true,
            user_data: parsed
          })
        }
      }
    }
  }
  render() {
    if(!this.state.loaded) {
      return <Loading />
    }
    const age = this.state.age_number.map((data, i) => {
      return (
        <option key={i} value={data}>{data}</option>
      )
    })
    const item = this.state.user_data.map((data, i) => {
      return (
        <tr key={i}>
          <td>
          {this.state.targetEdit === i ? (
            <div>
              <input type="text" className="form-control" value={this.state.nameEdit} name="nameEdit" onChange={(e) => this.handleChange(e)} />
              <div className="help-block">{this.state.nameEditValid ? '' : 'Please fill your name.'}</div>
            </div>
          ) : (
            data.name
          )}
          </td>
          <td style={{ textAlign: 'center' }}>
          {this.state.targetEdit === i ? (
            <div>
              <select className="form-control" value={this.state.ageEdit} name="ageEdit" onChange={(e) => this.handleChange(e)}>
                <option value="">Select Age</option>
                {age}
              </select>
              <div className="help-block">{this.state.ageEditValid ? '' : 'Please select your age.'}</div>
            </div>
          ) : (
            data.age
          )}
          </td>
          <td>
          {this.state.targetEdit === i ? (
            <div>
              <input type="text" className="form-control" value={this.state.nicknameEdit} name="nicknameEdit" onChange={(e) => this.handleChange(e)} />
              <div className="help-block">{this.state.nicknameEditValid ? '' : 'Please fill your nickname.'}</div>
            </div>
          ) : (
            data.nickname
          )}
          </td>
          <td style={{ textAlign: 'center' }}>
            {this.state.targetEdit === i ? (
              <button className="btn btn-success" style={{ minWidth: 100, marginRight: 10 }} onClick={() => this.handleEdit()}>OK</button>
            ) : (
              null
            )}
            <button className="btn btn-warning" style={{ minWidth: 100, marginRight: 10 }} onClick={() => this.setState({ nameEdit: data.name, ageEdit: data.age, nicknameEdit: data.nickname, targetEdit: this.state.targetEdit === i ? null : i })}>{this.state.targetEdit === i ? 'Cancel' : 'Edit'}</button>
            <button className="btn btn-danger" style={{ minWidth: 100 }} onClick={() => this.setState({ showDelete: true, targetDelete: i })}>Delete</button>
          </td>
        </tr>
      )
    })
    return (
      <div className="container" style={{ padding: 15, backgroundColor: '#eee', height: '100%' }}>
        <div className="row">
          <div className="col-xs-12">
            <div className="table-responsive" style={{ maxHeight: 500 }}>
              <table className="table table-bordered table-hover table-condensed" style={{ backgroundColor: '#fff' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'center' }}>Name</th>
                    <th style={{ textAlign: 'center' }}>Age</th>
                    <th style={{ textAlign: 'center' }}>Nickname</th>
                    <th style={{ textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                {this.state.user_data.length === 0 ? (
                  <tbody>
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center' }}>ไม่พบข้อมูล</td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>{item}</tbody>
                )}
              </table>
            </div>
          </div>
        </div>
        {this.state.adding ? (
          <div className="row" style={{ marginBottom: 20 }}>
            <div className="col-xs-12">
              <div className="form-inline">
                <div className="form-group for-res" style={{ verticalAlign: 'top', marginRight: 15 }}>
                  <input type="text" className="form-control" style={{ minWidth: 200 }} name="name" value={this.state.name} onChange={(e) => this.handleChange(e)} placeholder="Name" />
                  <div className="help-block">{this.state.nameValid ? '' : 'Please fill your name.'}</div>
                </div>
                <div className="form-group for-res" style={{ verticalAlign: 'top', marginRight: 15 }}>
                  <select className="form-control" style={{ minWidth: 200 }} name="age" value={this.state.age} onChange={(e) => this.handleChange(e)}>
                    <option value="">Select Age</option>
                    {age}
                  </select>
                  <div className="help-block">{this.state.ageValid ? '' : 'Please select your age.'}</div>
                </div>
                <div className="form-group for-res" style={{ verticalAlign: 'top', marginRight: 15 }}>
                  <input type="text" className="form-control" style={{ minWidth: 200 }} name="nickname" value={this.state.nickname} onChange={(e) => this.handleChange(e)} placeholder="Nickname" />
                  <div className="help-block">{this.state.nicknameValid ? '' : 'Please fill your nickname.'}</div>
                </div>
                <button className="btn btn-success" style={{ minWidth: 100, marginRight: 10 }} onClick={() => this.handleSubmit()}>Save</button>
                <button className="btn btn-default" style={{ minWidth: 100 }} onClick={() => this.setState({ name: '', age: '', nickname: '' })}>Cancel</button>
              </div>
            </div>
          </div>
        ) : (
          null
        )}
        <div className="row">
          <div className="col-xs-12">
            <button className="btn btn-primary" style={{ minWidth: 100 }} onClick={() => this.setState({ adding: !this.state.adding })}>Add</button>
          </div>
        </div>
        <SweetAlert
          show={this.state.showAdd}
          type={'success'}
          title={'Add data success.'}
	        onConfirm={() => this.setState({ showAdd: false })}
          confirmBtnBsStyle={'success'}
        />
        <SweetAlert
          show={this.state.showEdit}
          type={'success'}
          title={'Edit data success.'}
	        onConfirm={() => this.setState({ showEdit: false })}
          confirmBtnBsStyle={'success'}
        />
        <SweetAlert
          show={this.state.showDelete}
          type={'warning'}
          title={'Do you want to delete data?'}
          onConfirm={() => this.handleRemove()}
	        onCancel={() => this.setState({ showDelete: false })}
          showCancel
          confirmBtnBsStyle={'danger'}
          cancelBtnBsStyle={'default'}
        />
        <SweetAlert
          show={this.state.showError}
          type={'error'}
          title={'Please fill your profile.'}
	        onConfirm={() => this.setState({ showError: false })}
          confirmBtnBsStyle={'danger'}
        />
      </div>
    );
  }
}

export default App;
