
import './App.css';
import React from 'react';
class App extends React.Component {
  my_value = '';
  state = {
    value: [{
      id: 1,
      title: 'stupid',
      time: '3:08pm',
      time_day: '5/2/2019',
      done: true,
    }]
  }
  handleChange = (event) => {
    this.my_value = event.target.value
  }
  handleSubmit = (event) => {
    let today = new Date()
    let my_time = today.getHours() + ":" + today.getMinutes()
    let my_date = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear()
    let my_value = this.my_value
    let my_length = this.state.value.length
    let added = this.state.value.concat({id: my_length + 1, title: my_value, time: my_time, time_day: my_date});
    console.log(added)
    this.setState({
      value: added,
    });
    event.preventDefault()
  }
  handleDone = (itemId) => {
    const nextItem = this.state.value.map((item) => {
      if (item.id === itemId) {
        return Object.assign({}, item, {
          done: true,
        });
      } else {
        return item;
      }
    });
    this.setState({
      value: nextItem,
    });
  }
  handleDiscard = (itemId) => {
    const nextItem = this.state.value.filter((item) => {
      return item.id !== itemId
    });
    this.setState({
      value: nextItem,
    });
  }
  render(){
    const my_list = this.state.value.map((value) => {
      return <Item 
                id={value.id}
                title={value.title}
                time={value.time}
                date={value.time_day}
                done={value.done}
                onDone={this.handleDone}
                onDiscard={this.handleDiscard}
      />
    })
    return (
      <div className="App">
        <header className="App-header">
        <div>My Todo App</div>
        </header>
        <div className="main ui text container">
          <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleChange}></input>
            <button type="submit">Add</button>
          </form>
          <div className="items">
            {my_list}
          </div>
        </div>
      </div>
    );
  }
}

class Item extends React.Component {
  handleDiscard = () => {
    this.props.onDiscard(this.props.id)
  }
  handleDone = () => {
    this.props.onDone(this.props.id)
  }
  render() {
    return (
      <div className={this.props.done ? "item done" : "item"}>
        <div className="bold">{this.props.title}</div>
        <div className="extra">
          Created: {this.props.time}, {this.props.date}
        </div>
        {!this.props.done && (<button className="ui primary button" onClick={this.handleDone}>Done</button>)}
        <button className="ui button" onClick={this.handleDiscard}>Discard</button>
      </div>
    );
  }
}

export default App;
