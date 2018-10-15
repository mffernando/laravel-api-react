import React from 'react'
import ReactDom from 'react-dom'

export default class User extends React.Component{
    constructor(){
        super();
        this.state = {
            data: []
        }
    }

    componentWillMount(){
        let $this = this;

        axios.get('/api/users').then(response => {
            $this.setState({
                data: response.data
            })
        }).catch(error => {
            console.log(error)
        })
    }

    deleteUser(user){
        console.log(user)

        var $this = this
        axios.delete('/api/users/'+user.id).then(response => {
            console.log(response)

        const newState = $this.state.data.slice();
        newState.splice(newState.indexOf(user), 1)
        $this.setState({
            data: newState
        })

        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <div>
                <h2>Users Listing</h2>
                <a href="/users/create" className="btn btn-primary">Add New User</a>
                <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {this.state.data.map((user, i) => (
                    <tr key={i}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td><a href="" className="btn btn-primary">Edit</a>
                            <a href="javascript:;" className="btn btn-danger" onClick={this.deleteUser.bind(this, user)}>Delete</a>
                        </td>
                    </tr>
                    ))}

                </tbody>
                </table>
            </div>
        )
    }
}

if(document.getElementById('app')) {
    ReactDom.render(<User/>, document.getElementById('app'))
}
