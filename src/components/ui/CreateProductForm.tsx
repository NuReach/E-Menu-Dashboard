'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { any, z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './form';
import { Input } from './input';
import { Button } from './button';
import RichTextEditor from './RichTextEditor';
import { draftToMarkdown } from 'markdown-draft-js';
import { createProductAction, uploadImage } from '@/app/dashboard/products/create/action';
import { Label } from './label';
import { toast } from './use-toast';
import { put } from '@vercel/blob';
const formSchema = z.object({
    name: z.string().min(3),
    description: z.string().nullable(),
    cost : z.string().min(0),
    discount : z.string().min(0),
    price : z.string().min(0),
    sku: z.string().min(3),
    status: z.boolean().default(true),
    tag: z.string().nullable(),
    image:z.string(),
    category: z.string().min(3),
  })


export default function CreateProductForm() {

    const [imageUrl, setImageUrl] = useState("");

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          description: "",
          price: "0",
          cost: "0",
          status: true,
          tag: "",
          discount: "0",
          sku: "",
          image: "",
          category: "",
        },
      });

    const { watch, setValue } = form;
    
    const watchCost = watch("cost");
    const watchDiscount = watch("discount");

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      console.log(file?.name);
      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        try{
            setImageUrl("loading");
            const url = await uploadImage(formData);
            setImageUrl(url);
            setValue('image',url);
        }catch( error ){
            alert(error);
        }
      }
    };

    useEffect(() => {
        const calculatePrice = () => {
        const cost = watchCost;
        const discount = watchDiscount;
        const price = parseFloat(cost) - (parseFloat(cost) * (parseFloat(discount) / 100));
        setValue("price", price.toString() );
        };
        calculatePrice();
    }, [watchCost, watchDiscount, setValue]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            if (typeof value === 'number' || typeof value === 'boolean') {
                formData.append(key, value.toString());
            } else if (value) {
                formData.append(key, value);
            }
        });
        try {
            await createProductAction(formData);
            form.reset();
            toast({
                title: "Succesfully❤✨",
                description: "Product is created.",
              })
        } catch (error) {
            console.log(error);
        }     
    }
  return (
    <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                        <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="cost"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Cost</FormLabel>
                        <FormControl>
                        <Input type='text' placeholder="Cost" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="discount"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Discount</FormLabel>
                        <FormControl>
                        <Input type='text'  placeholder="Discount" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                        <Input type='text' placeholder="Price" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tag"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tag</FormLabel>
                        <FormControl>
                        <Input placeholder="Tag" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Sku</FormLabel>
                        <FormControl>
                        <Input placeholder="Sku" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                        <Input placeholder="Category" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <div className="grid w-full  gap-1.5">
                <Label htmlFor="picture">Image</Label>
                <Input id="image" name='image' type="file" className='w-full' 
                accept="image/*"
                onChange={handleImageChange}
                />
                </div>
                {
                    imageUrl == "loading"
                    &&
                    <p>Uploading image...</p>
                }
                {  imageUrl !== "" && imageUrl !== "loading" && (
                    <div>
                        <h2>Preview:</h2>
                        <img src={imageUrl} alt="Preview" className='w-48 my-6'  />
                    </div>
                )}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <RichTextEditor onChange={(draft)=> field.onChange(draftToMarkdown(draft))}
                                ref={field.ref}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    </div>
  )
}
