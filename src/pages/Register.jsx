import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchLocations, signUp } from "../api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [locationId, setLocationId] = useState("");
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getLocations = async () => {
      const locationsData = await fetchLocations();
      setLocations(locationsData);
    };
    getLocations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const sanitizedEmail = email.trim();
    const sanitizedPassword = password.trim();
    const sanitizedConfirmPassword = confirmPassword.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      name.trim() === "" ||
      sanitizedEmail === "" ||
      sanitizedPassword === "" ||
      sanitizedConfirmPassword === "" ||
      locationId === ""
    ) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    if (!emailRegex.test(sanitizedEmail)) {
      setError("Invalid email address");
      setIsLoading(false);
      return;
    }

    if (sanitizedPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    if (sanitizedPassword !== sanitizedConfirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      await signUp({
        name,
        email: sanitizedEmail,
        password: sanitizedPassword,
        locationId,
        role: "admin",
      });

      setIsLoading(false);
      navigate("/login");
      toast.success(
        "User Registered Successfully !! <br /> Login to Conintue",
        {
          autoClose: 2500,
          hideProgressBar: false,
          pauseOnHover: true,
        }
      );
    } catch (err) {
      setError("Registration failed : " + err.message);
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
      <div className="w-full rounded-lg border bg-card text-card-foreground shadow mx-auto max-w-md">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="font-semibold tracking-tight text-2xl mb-2.5">
            Register
          </div>
          <div className="text-sm text-muted-foreground">
            Enter your credentials below to register your account
          </div>
        </div>

        <div className="px-6 pb-6">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label
                  className="text-sm pl-0.5 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  id="name"
                  name="name"
                  placeholder="Enter your Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <label
                  className="text-sm pl-0.5 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <label
                  className="text-sm pl-0.5 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="location"
                >
                  Location
                </label>
                <select
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  id="location"
                  name="location"
                  value={locationId}
                  onChange={(e) => setLocationId(e.target.value)}
                >
                  <option value="">Select your location</option>
                  {locations.map((location) => (
                    <option
                      key={location.locationId}
                      value={location.locationId}
                    >
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>

              <p className="my-1 text-xs pb-0">
                Already Have An Account ?{" "}
                <Link to="/login" className="hover:underline">
                  Login Here
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
                {isLoading ? "Registering...." : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
