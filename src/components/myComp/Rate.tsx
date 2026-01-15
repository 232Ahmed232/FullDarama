import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"


import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { RatingSchema } from "@/schemas/ratingSchema";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function Rate() {
    const [isSubmitting, setIsSubmitting] = useState(false)


    const form = useForm<z.infer<typeof RatingSchema>>({
        resolver: zodResolver(RatingSchema),
        defaultValues: {
            stars: 1,
            comment: ""
        }
    })

    const onSubmit = async (data: z.infer<typeof RatingSchema>) => {
        setIsSubmitting(true)
        try {
            console.log(data)
            // await api call
        } finally {
            setIsSubmitting(false)
        }

    }

    return (
        <Dialog>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <DialogTrigger asChild>
                        <Button variant="outline">Rate Now</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Rate The Drama</DialogTitle>
                            <DialogDescription>
                                Your Rating help us to understand what is better content
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">

                                <FormField
                                    name="stars"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>stars</FormLabel>
                                            <Input type="number" {...field} name="stars" onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-3">
                                <FormField
                                    name="comment"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>comment</FormLabel>
                                            <Input  {...field} name="comment" />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Please wait
                                        </>
                                    ) : (
                                        "Rate"
                                    )}
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Form>
        </Dialog>
    )
}
