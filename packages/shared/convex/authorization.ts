import { Id } from "./_generated/dataModel";
import { QueryCtx } from "./_generated/server";

export const isTeamMember = async (
  ctx: QueryCtx,
  userId: Id<"users">,
  teamId: Id<"teams">
) => {
  const membership = await ctx.db
    .query("teamMembers")
    .withIndex("by_team_and_member")
    .filter((q) =>
      q.and(q.eq(q.field("teamId"), teamId), q.eq(q.field("userId"), userId))
    )
    .first();
  return !!membership;
};
