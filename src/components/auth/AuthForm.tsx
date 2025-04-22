
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type AuthFormProps = {
  isRegister: boolean;
  form: { email: string; password: string; first_name: string; last_name: string };
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void> | void;
  toggleAuth: () => void;
};

const AuthForm = ({
  isRegister,
  form,
  handleInput,
  loading,
  handleSubmit,
  toggleAuth,
}: AuthFormProps) => (
  <form className="space-y-4" onSubmit={handleSubmit}>
    {isRegister && (
      <div className="grid grid-cols-2 gap-4">
        <Input
          name="first_name"
          placeholder="First name"
          value={form.first_name}
          onChange={handleInput}
          required
        />
        <Input
          name="last_name"
          placeholder="Last name"
          value={form.last_name}
          onChange={handleInput}
          required
        />
      </div>
    )}
    <div>
      <Input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleInput}
        required
      />
    </div>
    <div>
      <Input
        name="password"
        type="password"
        placeholder="Password"
        autoComplete="new-password"
        value={form.password}
        onChange={handleInput}
        required
      />
    </div>
    <Button type="submit" className="w-full" disabled={loading}>
      {loading ? (isRegister ? "Signing up..." : "Signing in...") : isRegister ? "Sign Up" : "Sign In"}
    </Button>
    <div className="mt-4 text-center">
      {isRegister ? (
        <span>
          Already have an account?{" "}
          <button className="text-primary hover:underline" onClick={toggleAuth} type="button">
            Sign In
          </button>
        </span>
      ) : (
        <span>
          Need an account?{" "}
          <button className="text-primary hover:underline" onClick={toggleAuth} type="button">
            Sign Up
          </button>
        </span>
      )}
    </div>
  </form>
);

export default AuthForm;
