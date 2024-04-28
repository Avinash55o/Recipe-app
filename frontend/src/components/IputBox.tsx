import Button from "./button_signup";
import { useState } from "react";

const inputBox = ({ kaam }: { kaam: string }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <div>
        {kaam === "signup" ? (
          <>
            <div className="pr-52 mt-3">Email</div>
            <input
              className="border border-b py-1 px-2 rounded-lg"
              placeholder="Email"
              value={userName}
              onChange={(event: any) => setUserName(event.target.value)}
            />

            <div className="pr-48 mt-3">FirstName</div>
            <input
              className="border border-b py-1 px-2 rounded-lg"
              placeholder="avinash"
              value={firstName}
              onChange={(event: any) => setFirstName(event.target.value)}
            />

            <div className="pr-48 mt-3">LastName</div>
            <input
              className="border border-b py-1 px-2 rounded-lg"
              placeholder="boruah"
              value={lastName}
              onChange={(event: any) => setLastName(event.target.value)}
            />

            <div className="pr-48 mt-3">Password</div>
            <input
              className="border border-b py-1 px-2 rounded-lg"
              placeholder="123"
              value={password}
              onChange={(event: any) => setPassword(event.target.value)}
            />
          </>
        ) : (
          <>
            <div className="pr-52">Email</div>
            <input
            type="email"
              className="border border-b py-1 px-2 rounded-lg"
              placeholder="Email"
              value={userName}
              onChange={(event: any) => setUserName(event.target.value)}
              required
            />

            <div className="pr-48 mt-3">Password</div>
            <input
              className="border border-b py-1 px-2 border-slate-300 rounded-lg"
              placeholder="123"
              value={password}
              onChange={(event: any) => setPassword(event.target.value)}
              required
            />
          </>
        )}
      </div>

      <Button
        email={userName}
        firstName={firstName}
        lastName={lastName}
        password={password}
        kaam={kaam}
      />
    </div>
  );
};
export default inputBox;
