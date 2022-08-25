import "./App.css";
import { PropsWithChildren, useState } from "react";
import { User, users } from "./Users";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface PostProps {
  loading: boolean;
}

function Post({ loading }: PostProps) {
  return (
    <div className="post">
      <div className="left-col">
        <div className="avatar">
          {loading && (
            <Skeleton
              circle
              height="100%"
              containerClassName="avatar-skeleton"
            />
          )}
          <img
            src="smiley.svg"
            alt="A user Avatar"
            style={{ display: loading ? "none" : undefined }}
          />
        </div>
        <div className="user-name">
          {loading ? <Skeleton width={70} /> : "John Doe"}
        </div>
      </div>
      <div className="right-col">
        <h3>{loading ? <Skeleton /> : "Use React Loading Skeleton"}</h3>
        <p className="mb-0">
          {loading ? (
            <Skeleton count={3} />
          ) : (
            <>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              vel suscipit quidem magnam repellat iste pariatur voluptas fuga
              maxime necessitatibus doloremque accusamus harum, eligendi
              laudantium sit non! Unde, doloremque eius!
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  function renderLoadingControl(i: number) {
    return (
      <div className="form-check mb-4">
        <input
          className="form-check-input"
          type="checkbox"
          id={`loadingCheckbox${i}`}
          checked={loading}
          onChange={() => setLoading((b) => !b)}
        />
        <label className="form-check-label" htmlFor={`loadingCheckbox${i}`}>
          Loading
        </label>
      </div>
    );
  }

  interface TableRowProps {
    loading: boolean;
    user: User;
  }

  function TableRow({ loading, user }: TableRowProps) {
    const status = user.active ? "Active" : "Inactive";

    return (
      <tr>
        <td>{loading ? <Skeleton /> : user.id}</td>
        <td>{loading ? <Skeleton /> : user.name}</td>
        <td>{loading ? <Skeleton /> : user.role}</td>
        <td>{loading ? <Skeleton /> : status}</td>
      </tr>
    );
  }

  return (
    <div className="App">
      <h1 className="mb-4">React Loading Skeleton</h1>
      {renderLoadingControl(0)}

      <div className="mb-4">
        <h2>A Blog Post</h2>
        <Post loading={loading} />
      </div>

      <div className="mb-4">
        <h2>A Table with Theming</h2>
        <SkeletonTheme
          baseColor="#5294e0"
          highlightColor="#96c7ff"
          borderRadius="0.5rem"
          duration={4}
        >
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <TableRow key={u.id} user={u} loading={loading} />
              ))}
            </tbody>
          </table>
        </SkeletonTheme>
      </div>
    </div>
  );
}
