
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type AuthFormProps = {
  isRegister: boolean;
  form: { email: string; password: string; first_name: string; last_name: string };
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void> | void;
  userType: "founder" | "provider";
};

const AuthForm = ({
  isRegister,
  form,
  handleInput,
  loading,
  handleSubmit,
  userType,
}: AuthFormProps) => {
  // Map from first_name/last_name to firstName/lastName if needed
  const handleInputMapping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Create a mapped event with the correct property names
    const mappedEvent = {
      ...e,
      target: {
        ...e.target,
        name: name === 'first_name' ? 'firstName' : 
              name === 'last_name' ? 'lastName' : name,
        value
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    handleInput(mappedEvent);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {isRegister && (
        <div className="grid grid-cols-2 gap-4">
          <Input
            name="first_name"
            placeholder="First name"
            value={form.first_name}
            onChange={handleInputMapping}
            required
            className="border-[#2D82B7]/50 focus-visible:ring-[#2D82B7]"
          />
          <Input
            name="last_name"
            placeholder="Last name"
            value={form.last_name}
            onChange={handleInputMapping}
            required
            className="border-[#2D82B7]/50 focus-visible:ring-[#2D82B7]"
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
          className="border-[#2D82B7]/50 focus-visible:ring-[#2D82B7]"
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
          className="border-[#2D82B7]/50 focus-visible:ring-[#2D82B7]"
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-[#2D82B7] hover:bg-[#3D9AD1] text-white transition-colors" 
        disabled={loading}
      >
        {loading 
          ? (isRegister ? "Signing up..." : "Signing in...") 
          : (isRegister 
              ? `Sign Up as ${userType === 'founder' ? 'Founder' : 'Provider'}` 
              : "Sign In")}
      </Button>
    </form>
  );
};

export default AuthForm;
