'use client';

import { Icons } from '@/components/Icons';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import {
  AuthSchema,
  TAuthSchema,
} from '@/lib/validators/account-credentials-validator';
import { trpc } from '@/trpc/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isSeller = searchParams.get('as') === 'seller';
  const origin = searchParams.get('origin');

  const continueAsSeller = () => {
    router.push(`?as=seller`);
  };

  const continueAsCustomer = () => {
    router.replace('/sign-in', undefined);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthSchema>({
    resolver: zodResolver(AuthSchema),
  });

  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    onSuccess: () => {
      toast.success('Sign in successful!');

      if (origin) {
        router.push(origin);
        router.refresh();
        return;
      }

      if (isSeller) {
        router.push('/sell');
        router.refresh();
        return;
      }

      router.push('/');
      router.refresh();
    },
    onError: (error) => {
      if (error.data?.code === 'UNAUTHORIZED') {
        toast.error('Invalid email or password. Please try again.');
        return;
      }

      toast.error('Something went wrong. Please try again later.');
    },
  });

  const onSubmit = async ({ email, password }: TAuthSchema) => {
    signIn({ email, password });
  };

  return (
    <>
      <div className="container relative pt-20 flex flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />

            <h1 className="text-2xl font-bold">
              Sign in to your {isSeller && 'seller'} account
            </h1>
            <Link
              href="/sign-up"
              className={buttonVariants({
                variant: 'link',
                className: 'gap-1.5 text-muted-foreground',
              })}
            >
              Don&apos;t have an account? Sign up
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

                <Button>Sign in</Button>
              </div>
            </form>

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center"
              >
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-background text-muted-foreground">
                  or
                </span>
              </div>
            </div>

            {isSeller ? (
              <Button
                onClick={continueAsCustomer}
                variant="secondary"
                disabled={isLoading}
              >
                Continue as customer
              </Button>
            ) : (
              <Button
                onClick={continueAsSeller}
                variant="secondary"
                disabled={isLoading}
              >
                Continue as seller
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
