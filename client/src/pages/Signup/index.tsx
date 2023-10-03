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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signUpUserFn } from "@/api/authApi";
import { useToast } from "@/components/ui/use-toast";

const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  avatarUrl: z.string().url(),
});

export default function Signup() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      avatarUrl: "http://placekitten.com/g/200/300",
    },
  });

  const { mutate } = useMutation(signUpUserFn, {
    onSuccess: () => {
      toast({
        title: "Login Success",
        description: "You have successfully registered. Please login.",
      });

      navigate("/login");
    },
    onError: (error) => {
      toast({
        title: "Error",
        // @ts-ignore
        description: error.response.data.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof signupSchema>) => {
    mutate(data);
  };

  const getRandomAvatar = () => {
    const randomAvatar = Math.floor(Math.random() * 101) + 200;
    const avatarUrl = `http://placekitten.com/g/200/${randomAvatar}`;

    form.setValue("avatarUrl", avatarUrl);
  };

  return (
    <div className=" flex items-center justify-center flex-1">
      <Card className="bg-transparent font-sans w-96">
        <CardHeader className="flex">
          <Button
            className="w-12  text-white"
            onClick={() => {
              navigate("/login");
            }}
          >
            <ArrowLeftIcon />
          </Button>
          <CardTitle className="text-center text-4xl font-bold text-white flex-1">
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="max-w-sm items-center text-white font-sans ">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="name"
                        placeholder="Username"
                        className="mt-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
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

              <FormField
                control={form.control}
                name="avatarUrl"
                render={({ field }) => (
                  <FormItem className="max-w-sm items-center text-white font-sans ">
                    <FormLabel>Avatar</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-x-4 md:space-x-0 items-center justify-center">
                        <div>
                          <img
                            src={form.watch("avatarUrl")}
                            alt="avatar"
                            className="w-20 h-20 rounded-full"
                          />
                        </div>
                        <div className="flex flex-col space-y-4 w-full">
                          <Input
                            type="url"
                            id="avatarUrl"
                            placeholder="You Can Add Avatar or Get Random Avatar"
                            className="mt-2 text-xs w-full text-center"
                            {...field}
                          />
                          <Button
                            type="button"
                            onClick={() => getRandomAvatar()}
                          >
                            Get Rand Avatar
                          </Button>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                onClick={form.handleSubmit(onSubmit)}
                name="signup"
                type="submit"
                className="flex-1 bg-purple-600 w-full"
              >
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
