import Course from "./course";
import CourseSkill from "./courseskill";
import Integration from "./integration";
import Skill from "./skill";
import Token from "./token";
import User from "./user";
import Visitor from "./visitor";

// Define the associations between the models
Course.belongsToMany(Skill, {
  through: CourseSkill,
  foreignKey: "courseId",
  otherKey: "skillId",
  as: "skills",
});

Skill.belongsToMany(Course, {
  through: CourseSkill,
  foreignKey: "skillId",
  otherKey: "courseId",
  as: "courses",
});

Token.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

User.hasMany(Token, {
  foreignKey: "userId",
  as: "tokens",
});

// Use the following Model to utilize the associations
export { Course, Skill, CourseSkill, Token, User, Visitor, Integration };