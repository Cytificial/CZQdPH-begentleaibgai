/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.PromptInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).prompt.createMany(input as any))),

        create: procedure.input($Schema.PromptInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).prompt.create(input as any))),

        deleteMany: procedure.input($Schema.PromptInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).prompt.deleteMany(input as any))),

        delete: procedure.input($Schema.PromptInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).prompt.delete(input as any))),

        findFirst: procedure.input($Schema.PromptInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).prompt.findFirst(input as any))),

        findMany: procedure.input($Schema.PromptInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).prompt.findMany(input as any))),

        findUnique: procedure.input($Schema.PromptInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).prompt.findUnique(input as any))),

        updateMany: procedure.input($Schema.PromptInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).prompt.updateMany(input as any))),

        update: procedure.input($Schema.PromptInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).prompt.update(input as any))),

        count: procedure.input($Schema.PromptInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).prompt.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.PromptCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PromptCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PromptCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PromptCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.PromptCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PromptCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PromptGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PromptGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PromptCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PromptCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PromptGetPayload<T>, Context>) => Promise<Prisma.PromptGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.PromptDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PromptDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PromptDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PromptDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.PromptDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PromptDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PromptGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PromptGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PromptDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PromptDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PromptGetPayload<T>, Context>) => Promise<Prisma.PromptGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.PromptFindFirstArgs, TData = Prisma.PromptGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.PromptFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.PromptGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PromptFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.PromptFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.PromptGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.PromptGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.PromptFindManyArgs, TData = Array<Prisma.PromptGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.PromptFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.PromptGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PromptFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.PromptFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.PromptGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.PromptGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.PromptFindUniqueArgs, TData = Prisma.PromptGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.PromptFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.PromptGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PromptFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.PromptFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.PromptGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.PromptGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.PromptUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PromptUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PromptUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PromptUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.PromptUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PromptUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PromptGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PromptGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PromptUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PromptUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PromptGetPayload<T>, Context>) => Promise<Prisma.PromptGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.PromptCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.PromptCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.PromptCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.PromptCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.PromptCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.PromptCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.PromptCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.PromptCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
