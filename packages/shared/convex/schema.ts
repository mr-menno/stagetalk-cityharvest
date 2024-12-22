import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  teams: defineTable({
    name: v.string(),
    inviteCode: v.optional(v.string()),
  }).index("by_invite_code", ["inviteCode"]),
  teamMembers: defineTable({
    teamId: v.id("teams"),
    userId: v.id("users"),
  })
    .index("by_team_member", ["userId"])
    .index("by_team_and_member", ["teamId", "userId"]),
  messages: defineTable({
    teamId: v.id("teams"),
    userId: v.id("users"),
    message: v.string(),
  }).index("by_team", ["teamId"]),
});

export default schema;
