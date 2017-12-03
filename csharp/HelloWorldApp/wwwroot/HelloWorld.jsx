 class HelloWorld extends React.Component {
    constructor(props) {
       super(props);
       dotnetify.react.connect("HelloWorld", this);
       this.state = { Greetings: "", firstName: "", lastName: "" };
    }
    render() {
      const handleFirstName = e => this.setState({firstName: e.target.value});
      const handleLastName = e => this.setState({lastName: e.target.value});
      const handleSubmit = () => this.vm.$dispatch({Submit: {FirstName: this.state.firstName, LastName: this.state.lastName}});
        return 
          <div>
            <div>{this.state.Greetings}</div>
            <input type="text" value={this.state.firstName} onChange={handleFirstName} />
            <input type="text" value={this.state.lastName} onChange={handleLastName} />
            <button onClick={handleSubmit}>Submit</button>
          </div>;
    }
 }
 
 ReactDOM.render(
   <HelloWorld />,
   document.getElementById('Content')
 );