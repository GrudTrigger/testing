import { Route, Routes, useLocation } from "react-router-dom";
import { UserTable } from "./components/UserTable";
import { DeleteUserModal } from "./components/modals/DeleteUserModal";
import { EditUserModal } from "./components/modals/EditUserModal";
import { ViewUserModel } from "./components/modals/ViewUserModal";
import { CreateUserModal } from "./components/modals/CreateUserModal";

function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<UserTable />} />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/users/new" element={<CreateUserModal />} />
          <Route path="/users/:id" element={<ViewUserModel />} />
          <Route path="/users/:id/edit" element={<EditUserModal />} />
          <Route path="/users/:id/delete" element={<DeleteUserModal />} />
        </Routes>
      )}
    </>
  );
}

export default App;
