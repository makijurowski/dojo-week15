class SimpleList extends React.Component {
   constructor(props) {
      super(props);

      // Connect this component to the back-end view model.
      this.vm = dotnetify.react.connect("SimpleList", this);
      
      // Set up function to dispatch state to the back-end with optimistic update.
      this.dispatch = state => this.vm.$dispatch(state);
      this.dispatchState = state => {
         this.setState(state);
         this.vm.$dispatch(state);
      }
      this.state = {};
   }
   componentWillUnmount() {
      this.vm.$destroy();
   }
   render() {
      const handleUpdate = (value) => {
         var update = this.state.Employees.map(employee => employee.Id == value.Id ? Object.assign(employee, value) : employee);
         this.setState({ Employee: update });
         this.dispatch({ Update: value });
      }
      return (
        <div>
            <AddNameBox onAdd={value => this.dispatch({ Add: value })} />
            <EmployeeTable data={this.state.Employees}
                            onUpdate={handleUpdate}
                            onRemove={id => this.dispatch({ Remove: id })} />
            <Snackbar open={this.state.ShowNotification} message="Changes saved" autoHideDuration={1000}
                        onRequestClose={() => this.setState({ ShowNotification: false })} />
        </div>
            );
   }
}

class EmployeeTable extends React.Component {
   render() {
      const lastColWidth = { width: "10em" }
      const iconDelete = <IconDelete style={{ width: 20, height: 20 }} color='#8B8C8D' />
      
      const employees = this.props.data.map(employee =>
         <TableRow key={employee.Id}>
            <TableRowColumn>
               <InlineEdit text={employee.FirstName} onChange={value => this.props.onUpdate({ Id: employee.Id, FirstName:value })} />
            </TableRowColumn>
            <TableRowColumn>
               <InlineEdit text={employee.LastName} onChange={value => this.props.onUpdate({ Id: employee.Id, LastName: value })} />
            </TableRowColumn>
            <TableRowColumn style={lastColWidth}>
               <FlatButton label="Remove" labelStyle={{fontSize: "8pt"}} icon={iconDelete} onClick={() => this.props.onRemove(employee.Id)} />
            </TableRowColumn>
         </TableRow>
      );
      return (
         <div>
            <Table selectable={false}>
               <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                     <TableHeaderColumn>First Name</TableHeaderColumn>
                     <TableHeaderColumn>Last Name</TableHeaderColumn>
                     <TableHeaderColumn style={lastColWidth}></TableHeaderColumn>
                  </TableRow>
               </TableHeader>
               <TableBody displayRowCheckbox={false} showRowHover={true}>
                  {employees}
               </TableBody>
            </Table>
         </div>
      );
   }
}

class AddNameBox extends React.Component {
   constructor() {
      super();
      this.state = { fullName: "" };
   }
   render() {
      const handleAdd = () => {
         if (this.state.fullName) {
            this.props.onAdd(this.state.fullName);
            this.setState({ fullName: "" });
         }
      };
      return (
         <div>
            <TextField id="FullName" floatingLabelText="Full name"
                       value={this.state.fullName}
                       onChange={event => this.setState({ fullName: event.target.value })} />
            <RaisedButton style={{ marginLeft: "1em" }} label="Add" primary={true} onClick={handleAdd } />
         </div>
      );
   }
}

class InlineEdit extends React.Component {
   constructor() {
      super();
      this.state = {
         edit: false,
         value: this.props.text
      };
   }
   render() {
      const handleClick = event => {
         event.stopPropagation();
         if (!this.state.edit) {
            this.setState({ value: this.props.text });
            this.setState({ edit: true });
         }
      };
      const handleBlur = event => {
         this.setState({ edit: false });
         if (this.state.value.length > 0 && this.state.value != this.props.text)
            this.props.onChange(this.state.value);
         else
            this.setState({ value: this.props.text });
      }
      const setFocus = input => { if (input) input.focus(); }
      var elem;
      if (!this.state.edit)
         elem = <div onClick={handleClick }>{this.props.text}</div>
      else
         elem = <TextField id="EditField" ref={input => setFocus(input)}
                           value={this.state.value}
                           onClick={handleClick}
                           onBlur={handleBlur}
                           onChange={event => this.setState({ value: event.target.value })} />
      return (
         <div>{elem}</div>
      );
   }
}

 ReactDOM.render(
   <SimpleList/>,
   document.getElementById('Content')
 );