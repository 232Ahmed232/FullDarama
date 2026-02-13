import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import axios, { AxiosError } from "axios"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "sonner"
import { ApiResponse } from "@/types/ApiResponse"

export function CardImage({ img, name, username, role, actId }: any) {


  const voted = async () => {
    console.log(actId);
    try {
      const response = await axios.post<ApiResponse>("/api/voteActor", { actId })
      if (response.data.success) {
        toast.success(response.data.message || "Voting submitted successfully!")
        console.log(response.data.message);


      } else {
        toast.error(response.data.message || "Failed to Vote")
      }
    } catch (error) {
      console.error("Rating submission error:", error)

      const axiosError = error as AxiosError<ApiResponse>
      toast.error(
        axiosError.response?.data.message ||
        "Something went wrong. Please try again."
      )
    }

  }
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={img}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{username}</Badge>
        </CardAction>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {role}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button onClick={voted} className="w-full">Vote</Button>
      </CardFooter>
    </Card>
  )
}
