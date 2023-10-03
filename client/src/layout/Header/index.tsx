import { getMeFn } from "@/api/authApi";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import { useQuery } from "@tanstack/react-query";

interface GETME {
  user: {
    id: string;
    email: string;
    username: string;
    avatarUrl: string;
  };
}

export default function Header() {
  const { isLoading, data } = useQuery<GETME>({
    queryKey: ["me"],
    queryFn: getMeFn,
  });

  const handleSignout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    window.location.reload();
  };

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : data ? (
        <div className="flex md:flex-row flex-col-reverse pt-2 justify-end items-center md:pt-4 space-y-4 md:space-y-0 md:space-x-2">
          <div className="flex flex-col space-y-4">
            <h2>
              {data.user.username} ({data.user.email})
            </h2>
            <Button onClick={() => handleSignout()}>Sign Out</Button>
          </div>
          <img
            src={data.user.avatarUrl}
            alt="avatar"
            className="w-20 h-20 rounded-full"
          />
        </div>
      ) : (
        <h1>No Data Found</h1>
      )}
    </div>
  );
}
