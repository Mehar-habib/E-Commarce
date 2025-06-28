import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface LoginProps {
  isLoginOpen: boolean;
  setIsLoginOpen: (isOpen: boolean) => void;
}
interface LoginFormDataProps {
  email: string;
  password: string;
}
interface SignupFormDataProps {
  name: string;
  email: string;
  password: string;
  agreeTerms: boolean;
}
interface ForgotPasswordFormDataProps {
  email: string;
}
export default function AuthPage({ isLoginOpen, setIsLoginOpen }: LoginProps) {
  const [currentTab, setCurrentTab] = useState<"login" | "signup" | "forgot">(
    "login"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginError },
  } = useForm<LoginFormDataProps>();
  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: signupError },
  } = useForm<SignupFormDataProps>();
  const {
    register: registerForgotPassword,
    handleSubmit: handleSubmitForgotPassword,
    formState: { errors: forgotPasswordError },
  } = useForm<ForgotPasswordFormDataProps>();
  return (
    <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle>Welcome to book Kart</DialogTitle>
          <Tabs
            value={currentTab}
            onValueChange={(value) =>
              setCurrentTab(value as "login" | "signup" | "forgot")
            }
          >
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="forgot">Forgot </TabsTrigger>
            </TabsList>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Login */}
                <TabsContent value="login" className="space-y-4">
                  <form className="space-y-4">
                    <div className="relative">
                      <Input
                        {...registerLogin("email", {
                          required: "Email is required",
                        })}
                        placeholder="Email"
                        type="email"
                        className="pl-10"
                      />
                      <Mail
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        size={20}
                      />
                    </div>
                    {loginError.email && (
                      <p className="text-red-500 text-sm">
                        {loginError.email.message}
                      </p>
                    )}

                    {/*  */}
                    <div className="relative">
                      <Input
                        {...registerLogin("password", {
                          required: "Password is required",
                        })}
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        className="pl-10"
                      />
                      <Lock
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        size={20}
                      />
                      {showPassword ? (
                        <EyeOff
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                          size={20}
                          onClick={() => setShowPassword(false)}
                        />
                      ) : (
                        <Eye
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                          size={20}
                          onClick={() => setShowPassword(true)}
                        />
                      )}
                    </div>
                    {loginError.password && (
                      <p className="text-red-500 text-sm">
                        {loginError.password.message}
                      </p>
                    )}

                    <Button
                      type="submit"
                      className="w-full font-bold cursor-pointer"
                    >
                      {loginLoading ? (
                        <Loader2 className="mr-2 animate-spin" size={20} />
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </form>
                  <div className="flex items-center my-4">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <p className="mx-2 text-gray-500 text-sm">or</p>
                    <div className="flex-1 h-px bg-gray-300"></div>
                  </div>
                  <Button className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 cursor-pointer">
                    {googleLoading ? (
                      <>
                        <Loader2 className="mr-2 animate-spin" size={20} />
                        Login with Google...
                      </>
                    ) : (
                      <>
                        <Image
                          src="/icons/google.svg"
                          alt="Google"
                          width={20}
                          height={20}
                        />
                        Login with Google
                      </>
                    )}
                  </Button>
                </TabsContent>

                {/* signup */}
                <TabsContent value="signup" className="space-y-4">
                  <form className="space-y-4">
                    <div className="relative">
                      <Input
                        {...registerSignup("name", {
                          required: "Name is required",
                        })}
                        placeholder="Name"
                        type="text"
                        className="pl-10"
                      />
                      <User
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        size={20}
                      />
                    </div>
                    {signupError.name && (
                      <p className="text-red-500 text-sm">
                        {signupError.name.message}
                      </p>
                    )}

                    <div className="relative">
                      <Input
                        {...registerSignup("email", {
                          required: "Email is required",
                        })}
                        placeholder="Email"
                        type="email"
                        className="pl-10"
                      />
                      <Mail
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        size={20}
                      />
                    </div>
                    {signupError.email && (
                      <p className="text-red-500 text-sm">
                        {signupError.email.message}
                      </p>
                    )}

                    <div className="relative">
                      <Input
                        {...registerSignup("password", {
                          required: "Password is required",
                        })}
                        placeholder="Password"
                        type="password"
                        className="pl-10"
                      />
                      <Lock
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        size={20}
                      />
                    </div>
                    {signupError.password && (
                      <p className="text-red-500 text-sm">
                        {signupError.password.message}
                      </p>
                    )}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        {...registerSignup("agreeTerms", {
                          required:
                            "You must agree to the terms and conditions",
                        })}
                        className="mr-2"
                      />
                      <label className="text-sm text-gray-700">
                        I agree to the Terms and Conditions
                      </label>
                    </div>

                    {signupError.agreeTerms && (
                      <p className="text-red-500 text-sm">
                        {signupError.agreeTerms.message}
                      </p>
                    )}
                    <Button
                      type="submit"
                      className="w-full font-bold cursor-pointer"
                    >
                      {signupLoading ? (
                        <Loader2 className="mr-2 animate-spin" size={20} />
                      ) : (
                        "Signup"
                      )}
                    </Button>
                  </form>
                  <Button className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 cursor-pointer">
                    <Image
                      src="/icons/google.svg"
                      alt="Google"
                      width={20}
                      height={20}
                    />
                    Login with Google
                  </Button>
                </TabsContent>

                {/* forget password */}
                <TabsContent value="forgot" className="space-y-4">
                  {!forgotPasswordSuccess ? (
                    <form className="space-y-4">
                      <div className="relative">
                        <Input
                          {...registerForgotPassword("email", {
                            required: "Email is required",
                          })}
                          placeholder="Email"
                          type="email"
                          className="pl-10"
                        />
                        <Mail
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          size={20}
                        />
                      </div>
                      {forgotPasswordError.email && (
                        <p className="text-red-500 text-sm">
                          {forgotPasswordError.email.message}
                        </p>
                      )}

                      <Button
                        type="submit"
                        className="w-full font-bold cursor-pointer"
                      >
                        {forgotPasswordLoading ? (
                          <Loader2 className="mr-2 animate-spin" size={20} />
                        ) : (
                          "Send Reset Link"
                        )}
                      </Button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center space-y-4"
                    >
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                      <h3 className="text-xl font-semibold text-gray-700">
                        Reset Link Send
                      </h3>
                      <p className="text-gray-500">
                        We&apos;ve sent a password reset link to your email.
                        Please check your inbox and follow the instructions to
                        reset your password.
                      </p>
                      <Button
                        onClick={() => setForgotPasswordSuccess(false)}
                        className="w-full"
                      >
                        Send Another Link To Email
                      </Button>
                    </motion.div>
                  )}
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
          <p className="text-sm text-center mt-2 to-gray-600">
            By clicking &quot;agree&quot;, you agree to our{" "}
            <Link
              className="text-blue-600 hover:underline"
              href={"/terms-of-use"}
            >
              Term ofUse
            </Link>
            ,{" "}
            <Link
              href="/privacy-policy"
              className="text-blue-600 hover:underline"
            >
              Privacy Policy
            </Link>
          </p>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
