import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useGetUsersQuery, useDeleteUserMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { FaTimes, FaPen, FaTrash, FaEdit, FaCheck  } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserListScreen = () => {
   const { data: users, isLoading, error } = useGetUsersQuery();

    const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

    

    function refetch() {
        window.location.reload();
    }



   const deleteHandler = async (id) => {
         if (window.confirm("Are you sure?")) {
               try {
                   await deleteUser(id);
                   refetch();
                   toast.success("User deleted");
               }
                catch (err) {
                     toast.error(err?.data?.message || err.message);
            }
        }
    };






    return (
        <>
            <h1>Users</h1>
            {loadingDelete && <Loader />}
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>

                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {users?.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>

                                <td>
                                    <a href={`mailto:${user.email}`}>
                                        {user.email}
                                    </a>
                                </td>
                                <td>
                                    {!user.isAdmin ? (
                                        <FaTimes style={{ color: "red" }} />
                                    ) : (
                                        <FaCheck style={{ color: "green" }} />
                                    )}
                                </td>

                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button

                                            className="btn-sm"
                                            variant="light"
                                        >
                                            <FaPen style={{ color: "green" }} />
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant="light"
                                        className="btn-sm"
                                        onClick={() => deleteHandler(user._id)}
                                    >
                                        <FaTrash style={{ color: "red" }} />
                                    </Button>
                                </td>
                            </tr>
                        ))}

                    </tbody>


                </Table>
            )}
        </>
    );
};

export default UserListScreen;
