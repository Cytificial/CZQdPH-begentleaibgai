/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";
import createUserRouter from "./User.router";
import createSubscriptionPlanRouter from "./SubscriptionPlan.router";
import createSubscriptionRouter from "./Subscription.router";
import createPromptRouter from "./Prompt.router";
import createVisitorLogRouter from "./VisitorLog.router";
import createSupportMessageRouter from "./SupportMessage.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as SubscriptionPlanClientType } from "./SubscriptionPlan.router";
import { ClientType as SubscriptionClientType } from "./Subscription.router";
import { ClientType as PromptClientType } from "./Prompt.router";
import { ClientType as VisitorLogClientType } from "./VisitorLog.router";
import { ClientType as SupportMessageClientType } from "./SupportMessage.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        user: createUserRouter(router, procedure),
        subscriptionPlan: createSubscriptionPlanRouter(router, procedure),
        subscription: createSubscriptionRouter(router, procedure),
        prompt: createPromptRouter(router, procedure),
        visitorLog: createVisitorLogRouter(router, procedure),
        supportMessage: createSupportMessageRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    user: UserClientType<AppRouter>;
    subscriptionPlan: SubscriptionPlanClientType<AppRouter>;
    subscription: SubscriptionClientType<AppRouter>;
    prompt: PromptClientType<AppRouter>;
    visitorLog: VisitorLogClientType<AppRouter>;
    supportMessage: SupportMessageClientType<AppRouter>;
}
