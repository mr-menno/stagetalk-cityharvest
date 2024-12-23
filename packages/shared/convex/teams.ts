import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getTeams = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    let memberships = await ctx.db
      .query("teamMembers")
      .withIndex("by_team_member")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();
    let teams = await Promise.all(
      memberships.map(async (membership) => {
        return await ctx.db.get(membership.teamId);
      })
    );
    console.log("teams", teams);
    return teams;
  },
});

export const getTeam = query({
  args: {
    teamId: v.id("teams"),
  },
  handler: async (ctx, { teamId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const membership = await ctx.db
      .query("teamMembers")
      .withIndex("by_team_and_member")
      .filter((q) =>
        q.and(q.eq(q.field("teamId"), teamId), q.eq(q.field("userId"), userId))
      )
      .first();
    if (!membership) return null;

    const team = await ctx.db.get(teamId);
    return team;
  },
});

export const getTeamMembers = query({
  args: {
    teamId: v.id("teams"),
  },
  handler: async (ctx, { teamId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const membership = await ctx.db
      .query("teamMembers")
      .withIndex("by_team_and_member")
      .filter((q) =>
        q.and(q.eq(q.field("teamId"), teamId), q.eq(q.field("userId"), userId))
      )
      .first();
    if (!membership) return null;

    let memberships = await ctx.db
      .query("teamMembers")
      .withIndex("by_team_member")
      .filter((q) => q.eq(q.field("teamId"), teamId))
      .collect();
    let members = await Promise.all(
      memberships.map(async (membership) => {
        return await ctx.db.get(membership.userId);
      })
    );
    return members;
  },
});

export const createTeam = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, { name }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("NOT_AUTHENTICATED");

    //create 6 letter invite code using only easily distinguishable characters
    const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ"; // Exclude confusing letters like I, O, and Q
    let inviteCode = "";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      inviteCode += letters[randomIndex];
    }

    const team = await ctx.db.insert("teams", {
      name: name,
      inviteCode: inviteCode,
    });
    const teamMember = await ctx.db.insert("teamMembers", {
      teamId: team,
      userId: userId,
    });
    if (!teamMember) throw new ConvexError("FAILED_TO_JOIN_TEAM");

    return team;
  },
});

export const joinTeam = mutation({
  args: {
    inviteCode: v.string(),
  },
  handler: async (ctx, { inviteCode }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("NOT_AUTHENTICATED");

    const team = await ctx.db
      .query("teams")
      .withIndex("by_invite_code")
      .filter((q) => q.eq(q.field("inviteCode"), inviteCode))
      .first();
    if (!team) throw new ConvexError("TEAM_NOT_FOUND");

    const teamMember = await ctx.db.insert("teamMembers", {
      teamId: team._id,
      userId: userId,
    });
    if (!teamMember) throw new ConvexError("FAILED_TO_JOIN_TEAM");

    return team;
  },
});

export const getTeamByInvite = query({
  args: {
    inviteCode: v.string(),
  },
  handler: async (ctx, { inviteCode }) => {
    const team = await ctx.db
      .query("teams")
      .withIndex("by_invite_code")
      .filter((q) => q.eq(q.field("inviteCode"), inviteCode))
      .first();
    return team;
  },
})