import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { isTeamMember } from "./authorization";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getMessages = query({
  args: {
    teamId: v.id("teams"),
  },
  handler: async (ctx, { teamId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("NOT_AUTHENTICATED");

    const membership = await isTeamMember(ctx, userId, teamId);
    if (!membership) throw new ConvexError("NOT_AUTHORIZED");

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_team")
      .filter((q) => q.eq(q.field("teamId"), teamId))
      .collect();

    return messages;
  },
});

export const sendMessage = mutation({
  args: {
    teamId: v.id("teams"),
    message: v.string(),
  },
  handler: async (ctx, { teamId, message }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("NOT_AUTHENTICATED");

    const membership = await isTeamMember(ctx, userId, teamId);
    if (!membership) throw new ConvexError("NOT_AUTHORIZED");

    const newMessage = await ctx.db.insert("messages", {
      teamId,
      userId,
      message,
    });

    return newMessage;
  },
});
