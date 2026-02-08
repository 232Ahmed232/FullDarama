import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CardImage({img,name,username,role}:any) {
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
        <Button className="w-full">Vote</Button>
      </CardFooter>
    </Card>
  )
}
