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

        createMany: procedure.input($Schema.VisitorLogInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).visitorLog.createMany(input as any))),

        create: procedure.input($Schema.VisitorLogInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).visitorLog.create(input as any))),

        deleteMany: procedure.input($Schema.VisitorLogInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).visitorLog.deleteMany(input as any))),

        delete: procedure.input($Schema.VisitorLogInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).visitorLog.delete(input as any))),

        findFirst: procedure.input($Schema.VisitorLogInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).visitorLog.findFirst(input as any))),

        findMany: procedure.input($Schema.VisitorLogInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).visitorLog.findMany(input as any))),

        findUnique: procedure.input($Schema.VisitorLogInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).visitorLog.findUnique(input as any))),

        updateMany: procedure.input($Schema.VisitorLogInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).visitorLog.updateMany(input as any))),

        update: procedure.input($Schema.VisitorLogInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).visitorLog.update(input as any))),

        count: procedure.input($Schema.VisitorLogInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).visitorLog.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.VisitorLogCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.VisitorLogCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.VisitorLogCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.VisitorLogCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.VisitorLogCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.VisitorLogCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.VisitorLogGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.VisitorLogGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.VisitorLogCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.VisitorLogCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.VisitorLogGetPayload<T>, Context>) => Promise<Prisma.VisitorLogGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.VisitorLogDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.VisitorLogDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.VisitorLogDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.VisitorLogDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.VisitorLogDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.VisitorLogDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.VisitorLogGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.VisitorLogGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.VisitorLogDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.VisitorLogDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.VisitorLogGetPayload<T>, Context>) => Promise<Prisma.VisitorLogGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.VisitorLogFindFirstArgs, TData = Prisma.VisitorLogGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.VisitorLogFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.VisitorLogGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.VisitorLogFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.VisitorLogFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.VisitorLogGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.VisitorLogGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.VisitorLogFindManyArgs, TData = Array<Prisma.VisitorLogGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.VisitorLogFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.VisitorLogGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.VisitorLogFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.VisitorLogFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.VisitorLogGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.VisitorLogGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.VisitorLogFindUniqueArgs, TData = Prisma.VisitorLogGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.VisitorLogFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.VisitorLogGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.VisitorLogFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.VisitorLogFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.VisitorLogGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.VisitorLogGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.VisitorLogUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.VisitorLogUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.VisitorLogUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.VisitorLogUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.VisitorLogUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.VisitorLogUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.VisitorLogGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.VisitorLogGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.VisitorLogUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.VisitorLogUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.VisitorLogGetPayload<T>, Context>) => Promise<Prisma.VisitorLogGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.VisitorLogCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.VisitorLogCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.VisitorLogCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.VisitorLogCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.VisitorLogCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.VisitorLogCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.VisitorLogCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.VisitorLogCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
