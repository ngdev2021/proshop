import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaTimes,
  FaPen,
  FaTrash,
  FaCheck,
  FaPlus,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import {
  useCreateUsersMutation,
  // useUpdateUserMutation,
} from "../../slices/usersApiSlice";
import {PaginateUsers} from "../../components/Paginate";

const UserListScreen = () => {
  const { pageNumber = 1 } = useParams();

  const { data, isLoading, error, refetch } = useGetUsersQuery({ pageNumber });

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const [createUser, { isLoading: loadingCreate }] = useCreateUsersMutation();

  // const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(id);
        refetch();
        toast.success("User deleted");
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    }
  };

  // const createHandler = async () => {
  //   try {
  //     await createUser();
  //     refetch();
  //     toast.success("User created");
  //   } catch (err) {
  //     toast.error(err?.data?.message || err.message);
  //   }
  // };

  // const updateHandler = async (id) => {
  //     try {
  //         await updateUser(id);
  //         refetch();
  //         toast.success("User updated");
  //     } catch (err) {
  //         toast.error(err?.data?.message || err.message);
  //     }
  // };

  return (
    <>
      <h1>Users</h1>
      <div className="d-flex justify-content-end">
        <LinkContainer to={`/admin/createuser`}>
          <Button className="my-3" >
            <FaPlus /> Create User
          </Button>
        </LinkContainer>
      </div>
      {loadingDelete && <Loader />}
      {loadingCreate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message}</Message>
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
            {data.users?.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>

                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {!user.isAdmin ? (
                    <FaTimes style={{ color: "red" }} />
                  ) : (
                    <FaCheck style={{ color: "green" }} />
                  )}
                </td>

                <td>
                  <LinkContainer to={`/admin/user/${user._id}/updateuser`}>
                    <Button
                      className="btn-sm"
                      variant="light"
                      // onClick={() => updateHandler(user._id)}
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
      <PaginateUsers pages={data?.pages} page={data?.page} isAdmin={true} />
    </>
  );
};

export default UserListScreen;
