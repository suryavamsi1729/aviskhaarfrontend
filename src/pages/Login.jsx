import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signIn } from "../api";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const sanitizedEmail = email.trim();
    const sanitizedPassword = password.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (sanitizedEmail === "" || sanitizedPassword === "") {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    if (!emailRegex.test(sanitizedEmail)) {
      setError("Invalid email address");
      setIsLoading(false);
      return;
    }

    try {
      const data = await signIn({
        email: sanitizedEmail,
        password: sanitizedPassword,
      });

      console.log(data);
      if (data.role === "admin") {
        dispatch(userActions.setUser(data.user));
        localStorage.setItem(import.meta.env.VITE_APP_TOKEN, data.token);
        setIsLoading(false);
        toast.success("Login Successful!!");
        navigate("/dashboard");
      } else {
        setError("Invalid Credentials");
        toast.error("Invalid Credentials");
        setIsLoading(false);
      }
    } catch (err) {
      setError("Invalid Credentials");
      setIsLoading(false);
      return;
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center max-md:px-2">
      <div className="rounded-lg border bg-card text-card-foreground shadow mx-auto max-w-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="font-semibold tracking-tight text-2xl mb-2.5">
            Login
          </div>
          <div className="text-sm text-muted-foreground">
            Enter your credentials below to login to your account
          </div>
        </div>

        <div className="px-6 pb-6">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label
                  className="text-sm pl-0.5 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  id="email"
                  name="email"
                  placeholder="Enter your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <label
                  className="text-sm pl-0.5 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <p className="my-1 text-xs pb-0">
                Don't Have An Account ?{" "}
                <Link to="/register" className="hover:underline">
                  Register Here
                </Link>
              </p>

              {error && (
                <div className="text-red-500 text-[0.8rem] mb-[-8px] pl-0.5">
                  {error}
                </div>
              )}

              <button
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Logging in...." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
