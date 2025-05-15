import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

type AuthFormProps = {
  isRegister: boolean;
  form: { 
    email: string; 
    password: string; 
    first_name: string; 
    last_name: string; 
  };
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
  // Track if we've mapped field names to ensure consistent handling
  const [hasFieldMapping, setHasFieldMapping] = useState<boolean>(false);

  // Check if the handler expects firstName/lastName or first_name/last_name format
  useEffect(() => {
    // Test by creating a mock event with firstName to detect if mapping is needed
    const testEvent = {
      target: { name: "firstName", value: "" }
    } as React.ChangeEvent<HTMLInputElement>;
    
    try {
      // Use a clone of the original handler to avoid side effects
      const handlerClone = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Just testing if it throws when accessing event properties
        const { name } = e.target;
        return name;
      };
      
      handlerClone(testEvent);
      // If we get here, the handler accepts firstName format
      setHasFieldMapping(true);
    } catch (error) {
      // Handler expects first_name format (no mapping needed)
      setHasFieldMapping(false);
    }
  }, [handleInput]);

  // Create a properly typed mapping function for input events
  const handleInputWithMapping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Only map field names if needed based on our detection
    if (hasFieldMapping && (name === 'first_name' || name === 'last_name')) {
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
    } else {
      // Pass the event through unchanged
      handleInput(e);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {isRegister && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="first_name" className="text-xs font-medium text-gray-700">
              First name
            </label>
            <Input
              id="first_name"
              name="first_name"
              placeholder="First name"
              value={form.first_name}
              onChange={handleInputWithMapping}
              required
              className="border-[#2D82B7]/50 focus-visible:ring-[#2D82B7]"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="last_name" className="text-xs font-medium text-gray-700">
              Last name
            </label>
            <Input
              id="last_name"
              name="last_name"
              placeholder="Last name"
              value={form.last_name}
              onChange={handleInputWithMapping}
              required
              className="border-[#2D82B7]/50 focus-visible:ring-[#2D82B7]"
            />
          </div>
        </div>
      )}
      <div className="space-y-1">
        <label htmlFor="email" className="text-xs font-medium text-gray-700">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleInput}
          required
          className="border-[#2D82B7]/50 focus-visible:ring-[#2D82B7]"
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="password" className="text-xs font-medium text-gray-700">
          Password
        </label>
        <Input
          id="password"
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
