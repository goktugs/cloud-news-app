import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { loginUserFn } from "@/api/authApi";
import { useToast } from "@/components/ui/use-toast";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate } = useMutation(loginUserFn, {
    onSuccess: (data) => {
      toast({
        title: "Login Success",
        description: "You have successfully logged in.",
        variant: "default",
      });
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.accessToken);
      localStorage.setItem("userId", data.id);
      navigate("/news");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.response.data.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    mutate(data);
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className=" flex items-center justify-center flex-1">
      <Card className="bg-transparent font-sans w-96">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-white">
            Sign In
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <>
                    <FormItem className="max-w-sm items-center text-white font-sans ">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          id="email"
                          placeholder="Email"
                          className="mt-2"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="max-w-sm items-center text-white font-sans ">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        id="password"
                        placeholder="Password"
                        className="mt-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex space-x-8">
                <Button
                  name="signUp"
                  onClick={handleSignUp}
                  type="button"
                  className="flex-1 bg-purple-600"
                >
                  Sign Up
                </Button>
                <Button
                  name="signIn"
                  onClick={form.handleSubmit(onSubmit)}
                  type="submit"
                  className="flex-1 bg-purple-600"
                >
                  Sign In
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
