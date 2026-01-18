import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"

import {
    Form,
    FormControl,
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
import { Textarea } from "@/components/ui/textarea" // Consider using Textarea for comments
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios"
import { ApiResponse } from '@/types/ApiResponse'
import { toast } from "sonner"

// Define the form type from the schema
type RatingFormValues = z.infer<typeof RatingSchema>

export function Rate({ dramaId }: { dramaId: any }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    // Initialize react-hook-form with zod validation
    const form = useForm<RatingFormValues>({
        resolver: zodResolver(RatingSchema),
        defaultValues: {
            dramaId: dramaId || "",
            stars: 0,
            comment: ""
        }
    })

    const handleSubmit = async (values: RatingFormValues) => {
        setIsSubmitting(true)
        try {
            console.log("Submitting rating:", values)
            
            
            const response = await axios.post<ApiResponse>("/api/rating", values)
            
            if (response.data.success) {
                toast.success(response.data.message || "Rating submitted successfully!")
                console.log(response.data.message);
                
                setIsDialogOpen(false)
                form.reset()
            } else {
                toast.error(response.data.message || "Failed to submit rating")
            }
            
            
            
            
        } catch (error) {
            console.error("Rating submission error:", error)
            
            const axiosError = error as AxiosError<ApiResponse>
            toast.error(
                axiosError.response?.data.message || 
                "Something went wrong. Please try again."
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Rate Now</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Rate This Drama</DialogTitle>
                    <DialogDescription>
                        Share your thoughts and rate this drama. Your review helps others decide what to watch.
                    </DialogDescription>
                </DialogHeader>
                
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="stars"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rating (1-5 stars)</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="number" 
                                            min="1" 
                                            max="5" 
                                            {...field}
                                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <FormField
                            control={form.control}
                            name="comment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Review</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="Share your thoughts about this drama..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        {/* Hidden field for dramaId */}
                        <FormField
                            control={form.control}
                            name="dramaId"
                            render={({ field }) => (
                                <Input type="hidden" {...field} value={dramaId} />
                            )}
                        />
                        
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button 
                                    type="button" 
                                    variant="outline"
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit Rating"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}