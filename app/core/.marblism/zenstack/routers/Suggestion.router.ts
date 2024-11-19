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

        createMany: procedure.input($Schema.SuggestionInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).suggestion.createMany(input as any))),

        create: procedure.input($Schema.SuggestionInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).suggestion.create(input as any))),

        deleteMany: procedure.input($Schema.SuggestionInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).suggestion.deleteMany(input as any))),

        delete: procedure.input($Schema.SuggestionInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).suggestion.delete(input as any))),

        findFirst: procedure.input($Schema.SuggestionInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).suggestion.findFirst(input as any))),

        findMany: procedure.input($Schema.SuggestionInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).suggestion.findMany(input as any))),

        findUnique: procedure.input($Schema.SuggestionInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).suggestion.findUnique(input as any))),

        updateMany: procedure.input($Schema.SuggestionInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).suggestion.updateMany(input as any))),

        update: procedure.input($Schema.SuggestionInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).suggestion.update(input as any))),

        count: procedure.input($Schema.SuggestionInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).suggestion.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.SuggestionCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SuggestionCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SuggestionCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SuggestionCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.SuggestionCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SuggestionCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SuggestionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SuggestionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SuggestionCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SuggestionCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SuggestionGetPayload<T>, Context>) => Promise<Prisma.SuggestionGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.SuggestionDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SuggestionDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SuggestionDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SuggestionDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.SuggestionDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SuggestionDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SuggestionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SuggestionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SuggestionDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SuggestionDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SuggestionGetPayload<T>, Context>) => Promise<Prisma.SuggestionGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.SuggestionFindFirstArgs, TData = Prisma.SuggestionGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.SuggestionFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.SuggestionGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SuggestionFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.SuggestionFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.SuggestionGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.SuggestionGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.SuggestionFindManyArgs, TData = Array<Prisma.SuggestionGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.SuggestionFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.SuggestionGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SuggestionFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.SuggestionFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.SuggestionGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.SuggestionGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.SuggestionFindUniqueArgs, TData = Prisma.SuggestionGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.SuggestionFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.SuggestionGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SuggestionFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.SuggestionFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.SuggestionGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.SuggestionGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.SuggestionUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SuggestionUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SuggestionUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SuggestionUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.SuggestionUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SuggestionUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SuggestionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SuggestionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SuggestionUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SuggestionUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SuggestionGetPayload<T>, Context>) => Promise<Prisma.SuggestionGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.SuggestionCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.SuggestionCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.SuggestionCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.SuggestionCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.SuggestionCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.SuggestionCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.SuggestionCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.SuggestionCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
