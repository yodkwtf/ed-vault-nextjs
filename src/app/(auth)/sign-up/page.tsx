'use client';

import { Icons } from '@/components/Icons';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AuthSchema,
  TAuthSchema,
} from '@/lib/validators/account-credentials-validator';
import { trpc } from '@/trpc/client';
import { toast } from 'sonner';
import { ZodError } from 'zod';
import { useRouter } from 'next/navigation';

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthSchema>({
    resolver: zodResolver(AuthSchema),
  });

  const router = useRouter();

  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
    onError: (error) => {
      if (error.data?.code === 'CONFLICT') {
        toast.error('This email is already in use. Sign in instead?');
        return;
      }

      if (error instanceof ZodError) {
        toast.error(error.issues[0].message);
        return;
      }

      toast.error('Something went wrong. Please try again later.');
    },
    onSuccess: ({ sentToEmail }) => {
      toast.success(
        `An email has been sent to ${sentToEmail}. Please verify your email to continue.`
      );
      router.push(`verify-email?to=${sentToEmail}`);
    },
  });

  const onSubmit = async ({ email, password }: TAuthSchema) => {
    mutate({ email, password });
  };

  return (
    <>
      <div className="container relative pt-20 flex flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />

            <h1 className="text-2xl font-bold">Create an account</h1>
            <Link
              href="sign-in"
              className={buttonVariants({
                variant: 'link',
                className: 'gap-1.5 text-muted-foreground',
              })}
            >
              Already have an account? Sign in
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register('email')}
                    className={cn('mt-2', {
                      'focus-visible:ring-red-500': errors.email,
                    })}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register('password')}
                    className={cn('mt-2', {
                      'focus-visible:ring-red-500': errors.password,
                    })}
                    type="password"
                    placeholder="supersecret123"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button>Sign up</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
